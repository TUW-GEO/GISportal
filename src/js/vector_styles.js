







gisportal.vectorStyles = {};

gisportal.vectorStyles.coloursInUse = [];

gisportal.vectorStyles.binSize = 10;

gisportal.vectorStyles.createPalette = function(startingColour, steps){
   var startColour;
	if (startingColour in gisportal.vectorStyles.startingColours)
		startColour = gisportal.vectorStyles.startingColours[startingColour];
	else
		return false;

	var tintFactor = 0.5 / steps;
	var currentR = startColour.r;
	var currentG = startColour.g;
	var currentB = startColour.b;
	var palette = [];
	var x = 1;
	for(x;x <= steps;x++){

		currentR = Math.floor(currentR + (255 - currentR) * (tintFactor * x));
		currentG = Math.floor(currentG + (255 - currentG) * (tintFactor * x));
		currentB = Math.floor(currentB + (255 - currentB) * (tintFactor * x));
		newFull = "rgba("+currentR+","+currentG+","+currentB+","+startColour.a+")";
		palette.push(newFull);

	}

	return palette;

};

gisportal.vectorStyles.startingColours = {
	"basic_purple" : {
		"rgba" : "rgba(38, 3, 57,0.8)",
		"r" : 38,
		"g" : 3,
		"b" : 57,
		"a" : 0.8
	},
	"basic_green" : {
		"rgba" : "rgba(0,150,0,0.8)",
		"r" : 0,
		"g" : 150,
		"b" : 0,
		"a" : 0.8
	},
	"basic_red" : {
		"rgba" : "rgba(188,0,0,0.8)",
		"r" : 188,
		"g" : 0,
		"b" : 0,
		"a" : 0.8
	},
	"basic_blue" : {
		"rgba" : "rgba(5,2,175,0.8)",
		"r" : 5,
		"g" : 2,
		"b" : 175,
      "a" : 0.8 
	},
   "basic_orange" : {
		"rgba" : "rgba(255,116,0,0.8)",
      "r" : 255,
      "g" : 116,
      "b" : 0,
      "a" : 0.8
   },
   "bright_green" : {
      "rgba" : "rgba(161,242,0,0.8)",
      "r" : 161,
      "g" : 242,
      "b" : 0,
      "a" : 0.8
   }
};

gisportal.vectorStyles.defaultLine = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 200, 1.0)',
        width: 20
    })
});

gisportal.vectorStyles.defaultPoly =   new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(0, 0, 255, 0.5)',
      width: 20
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
});

gisportal.vectorStyles.genColour = function(opacity) {
      var r = Math.floor(Math.random() * (255 - 0) + 0);
      var g = Math.floor(Math.random() * (255 - 0) + 0);
      var b = Math.floor(Math.random() * (255 - 0) + 0);
    var colour = 'rgba('+ r.toString() +',' + g.toString() +',' + b.toString() + ',' +opacity.toString() + ')';
    return colour;
};


gisportal.vectorStyles.cache = {};
