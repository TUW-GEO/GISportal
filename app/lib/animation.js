var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

var fs = require('fs-extra');
var request = require('request');
var url = require('url');
var Jimp = require('jimp');
var async = require('async');
var path = require('path');
var utils = require('./utils.js');
var sha1 = require('sha1');

var PLOT_DESTINATION = path.join(__dirname, "../../html/plots/");

var PlotStatus = Object.freeze({
   initialising: 'initialising',
   extracting: 'extracting',
   rendering: 'rendering',
   complete: 'complete',
   failed: 'failed'
});

var animation = {};

module.exports = animation;

animation.animate = function(plotRequest, next) {
   console.log('Animation called');

   var hash = sha1(JSON.stringify(plotRequest));

   updateStatus(hash, PlotStatus.initialising, null, null, null, null, function(err) {
      next(err, hash);
   });

   var maxWidth = 1024;
   var maxHeight = 1024;
   // var bbox = '-180,-90,180,90';

   var mapOptions = plotRequest.plot.baseMap;

   var bordersOptions;
   if (plotRequest.plot.countryBorders) {
      bordersOptions = plotRequest.plot.countryBorders;
   }

   var dataOptions = plotRequest.plot.data.series[0].data_source;
   var id = dataOptions.layer_id;
   var wmsUrl = dataOptions.wmsUrl;
   var params = dataOptions.wmsParams;
   var slices = dataOptions.timesSlices;

   var bbox = dataOptions.bbox;
   var bboxArr = bbox.split(',');
   var bboxWidth = bboxArr[2] - bboxArr[0];
   var bboxHeight = bboxArr[3] - bboxArr[1];

   var height;
   var width;

   if ((bboxHeight / bboxWidth) <= 1) {
      height = Math.round((bboxHeight / bboxWidth) * maxWidth);
      width = maxWidth;
   } else {
      height = maxHeight;
      width = Math.round((bboxWidth / bboxHeight) * maxHeight);
   }

   var mapUrl = url.parse(mapOptions.wmsUrl);
   mapUrl.search = undefined;
   mapUrl.query = {
      SERVICE: 'WMS',
      VERSION: mapOptions.wmsParams.VERSION,
      REQUEST: 'GetMap',
      FORMAT: 'image/jpeg',
      TRANSPARENT: false,
      LAYERS: mapOptions.wmsParams.LAYERS,
      wrapDateLine: mapOptions.wmsParams.wrapDateLine,
      SRS: mapOptions.wmsParams.SRS,
      WIDTH: width,
      HEIGHT: height,
      BBOX: bbox
   };

   var borders = false;
   var bordersUrl;
   if (bordersOptions) {
      borders = true;
      bordersUrl = url.parse(bordersOptions.wmsUrl);
      bordersUrl.search = undefined;
      bordersUrl.query = {
         SERVICE: 'WMS',
         VERSION: bordersOptions.wmsParams.VERSION,
         REQUEST: 'GetMap',
         FORMAT: 'image/png',
         TRANSPARENT: true,
         LAYERS: bordersOptions.wmsParams.LAYERS,
         STYLES: bordersOptions.wmsParams.STYLES,
         wrapDateLine: mapOptions.wmsParams.wrapDateLine,
         SRS: bordersOptions.wmsParams.SRS,
         WIDTH: width,
         HEIGHT: height,
         BBOX: bbox
      };
   }

   // var mapURL = 'https://tiles.maps.eox.at/wms/?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fjpg&LAYERS=terrain-light&SRS=EPSG%3A4326&wrapDateLine=true&WIDTH=1024&HEIGHT=512&STYLES=&BBOX=-180%2C-90%2C180%2C90';
   // var bordersURL = 'https://rsg.pml.ac.uk/geoserver/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=rsg%3Afull_10m_borders&STYLES=line-white&SRS=EPSG%3A4326&WIDTH=1024&HEIGHT=512&BBOX=-180%2C-90%2C180%2C90';

   var dataURL = url.parse(wmsUrl, true);
   dataURL.search = undefined;
   var time = new Date(params.time);

   dataURL.query = {
      SERVICE: 'WMS',
      VERSION: params.VERSION,
      REQUEST: 'GetMap',
      FORMAT: 'image/png',
      TRANSPARENT: true,
      LAYERS: params.LAYERS,
      wrapDateLine: params.wrapDateLine,
      SRS: params.SRS,
      STYLES: params.STYLES,
      NUMCOLORBANDS: params.NUMCOLORBANDS,
      TIME: time.toISOString(),
      colorscalerange: params.colorscalerange,
      logscale: params.logscale,
      WIDTH: width,
      HEIGHT: height,
      BBOX: bbox
   };

   if (params.ABOVEMAXCOLOR) {
      dataURL.query.ABOVEMAXCOLOR = params.ABOVEMAXCOLOR;
   }
   if (params.BELOWMINCOLOR) {
      dataURL.query.BELOWMINCOLOR = params.BELOWMINCOLOR;
   }

   var mapDownloaded = false;
   var bordersDownloaded = false;
   var slicesDownloaded = [];
   var slicesCount = 0;

   var q = async.queue(download, 10);

   updateStatus(hash, PlotStatus.extracting);

   q.push({
      uri: url.format(mapUrl),
      filename: '/tmp/ani/map.jpg',
      id: 'map'
   }, downloadComplete);

   if (borders) {
      q.push({
         uri: url.format(bordersUrl),
         filename: '/tmp/ani/borders.png',
         id: 'borders'
      }, downloadComplete);
   }

   for (var i = 0; i < slices.length; i++) {
      dataURL.query.TIME = slices[i];
      var filename = '/tmp/ani/' + id + '_' + slices[i] + '.png';
      q.push({
         uri: url.format(dataURL),
         filename: filename,
         id: slices[i]
      }, downloadComplete);
   }

   var retries = {};

   function downloadComplete(err, options) {
      // console.log('Download Complete: ' + options.id);
      if (err) {
         if (retries[options.id] === undefined) {
            retries[options.id] = 0;
         }
         if (retries[options.id] < 4) {
            retries[options.id]++;
            q.push({
               uri: options.uri,
               filename: options.filename,
               id: options.id
            }, downloadComplete);
         } else {
            console.error(err);
         }
      } else {
         if (options.id == 'map') {
            mapDownloaded = true;
         } else if (options.id == 'borders') {
            bordersDownloaded = true;
         } else {
            Jimp.read(options.filename, function(err, image) {
               Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function(font) {
                  image.print(font, 10, 10, options.id);
                  image.write(options.filename, function() {
                     // console.log('Adding date to ' + options.id);
                     slicesCount++;
                     slicesDownloaded.push(options.filename);
                     console.log('downloaded: ' + slicesDownloaded.length + ' of ' + slices.length);
                     if (mapDownloaded && (!borders || bordersDownloaded) && slicesDownloaded.length == slices.length) {
                        render();
                     }
                  });
               });
            });
            // console.log(id);
            // console.log('Slice:' + slicesCount);
         }
      }
   }

   function render() {
      updateStatus(hash, PlotStatus.rendering);
      console.log('Rendering');

      var videoPath = path.join(PLOT_DESTINATION, hash + '-video.mp4');

      // Do the render thing!
      try {
         if (borders) {
            ffmpeg()
               .input('/tmp/ani/map.jpg')
               .input('/tmp/ani/' + id + '_' + '*' + '.png')
               .inputOption('-pattern_type glob')
               .inputFPS(1)
               .input('/tmp/ani/borders.png')
               .complexFilter('overlay,overlay')
               .output(videoPath)
               .outputFPS(30)
               .noAudio()
               .on('end', finishedRendering)
               .run();
         } else {
            ffmpeg()
               .input('/tmp/ani/map.jpg')
               .input('/tmp/ani/' + id + '_' + '*' + '.png')
               .inputOption('-pattern_type glob')
               .inputFPS(1)
               .complexFilter('overlay')
               .output(videoPath)
               .outputFPS(30)
               .noAudio()
               .on('end', finishedRendering)
               .run();
         }
      } catch (e) {
         finishedRendering(e);
      }
   }

   function finishedRendering(err) {
      if (err) {
         updateStatus(hash, PlotStatus.failed);
         console.log('Failed rendering! ;_;');
         console.log(err);
         cleanup();
      }

      buildHtml(hash, function(err) {
         if (!err) {
            updateStatus(hash, PlotStatus.complete);
            console.log('Finished rendering! ^_^');
            cleanup();
         }
      });

      function cleanup() {
         for (var i = 0; i < slicesDownloaded.length; i++) {
            fs.remove(slicesDownloaded[i]);
         }
      }
   }
};

function buildHtml(hash, next) {
   var htmlPath = path.join(PLOT_DESTINATION, hash + '-plot.html');
   var video = '<video controls><source src="/plots/' + hash + '-video.mp4"/></video>';
   var html = '<!DOCTYPE html><html lang="en-US"><body><div id="plot">' + video + '</div></body></html>';
   fs.writeFile(htmlPath, html, 'utf8', function(err) {
      next(err);
   });
}

function download(options, next) {
   // console.log('Downloading ' + options.id);
   request(options.uri, {
         timeout: 60000
      })
      .on('error', done)
      .pipe(fs.createWriteStream(options.filename))
      .on('error', done)
      .on('close', done);

   function done(err) {
      next(err, options);
   }
}

var saveStatusQ = async.queue(saveStatus, 1);

function updateStatus(hash, state, message, percentage, minRemaining, traceback, next) {
   var statusPath = path.join(PLOT_DESTINATION, hash + '-status.json');
   var status;

   if (utils.fileExists(statusPath)) {
      fs.readFile(statusPath, 'utf8', gotStatus);
   } else {
      status = {
         job_id: hash,
         completed: false,
      };
      gotStatus();
   }

   function gotStatus(err, statusString) {
      if (!err) {
         if (statusString) {
            status = JSON.parse(statusString);
         }
         status.message = message || '';
         status.traceback = traceback || '';
         status.state = state;

         if (state == PlotStatus.complete) {
            status.completed = true;
            status.percentage = 100;
            status.minutes_remaining = 0;
         } else if (state == PlotStatus.failed) {
            status.completed = true;
            status.percentage = 100;
            status.minutes_remaining = 0;
         } else {
            status.completed = false;
            status.percentage = percentage || 0;
            status.minutes_remaining = minRemaining || -1;
         }
         saveStatusQ.push({
            statusPath: statusPath,
            status: status
         }, function(err) {
            if (err) {
               // :'(
            }
            if (next) {
               next(err);
            }
         });
      }
   }
}

function saveStatus(options, next) {
   fs.writeFile(options.statusPath, JSON.stringify(options.status), 'utf8', function(err) {
      next(err);
   });
}