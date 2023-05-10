/**------------------------------*\
    Enhanced Overlay Script
    This file add the functionality to 
    add additional overlays to the map
\*------------------------------------*/



gisportal.enhancedOverlay = {};

gisportal.enhancedOverlay.initDOM=function(){
    // Do something here to initialise something
    console.log('Enhanced Overlay being developed here!');
    
    $('.js-compare').on('click', gisportal.enhancedOverlayParis);
    
};

gisportal.enhancedOverlayParis=function(){
    document.getElementsByClassName('js-hide-panel')[0].click();
    gisportal.createComparisonBaseLayers();
    if (document.getElementById('map-holder').className == 'standard-view') {
        document.getElementById('map-holder').className = 'compare';
    }
    console.log('Synchronising Maps Now!');
    // Initialise the two maps and synchronise
    var shared_view = map.getView().values_;
    
    // Synchronise the views of both maps by setting the same views
    new_view = new ol.View({
        projection: shared_view.projection,
        center: shared_view.center,
        minZoom: shared_view.minZoom,
        maxZoom: shared_view.maxZoom,
        resolution: shared_view.resolution,
        rotation: shared_view.rotation,
        zoom: shared_view.zoom,
    });
    
    
        var map_layers=map.getLayers();
        // Read in the existing baseMap which is always to 0th index:
        var currentBaseMap=map_layers.array_[0].values_.id;
        var layer = gisportal.comparisonBaseLayers[currentBaseMap];
        
        // The map
        var map_paris = new ol.Map ({
            target: 'compare_map',
            view: new_view,
            layers: [layer]
        });
        map_paris.updateSize();
        map.setView(new_view);
        map.addInteraction(new ol.interaction.Synchronize({maps:[map_paris]}));
        map_paris.addInteraction(new ol.interaction.Synchronize({maps:[map]}));
        
        
    // Array to cache image style
    var styleCache = {};
    
    // Vector style
    function getFeatureStyle (feature, resolution, sel) {
        var k = $('#kind').val()+"_"+$("#border").val()+"_"+feature.get("img").match(/[^\\/]+$/)[0]+($("#shadow").prop('checked')?"_1":"_0")+($("#crop").prop('checked')?"_1":"_0")+(sel?"_1":"");
        var style = styleCache[k];
        if (!style) {
        styleCache[k] = style = new ol.style.Style ({
            image: new ol.style.Photo ({
            src: feature.get("img"),
            radius: 20,
            crop: $("#crop").prop('checked'),
            kind: $('#kind').val(),
            shadow: $("#shadow").prop('checked')?5:0,
            onload: function() { vector.changed(); },
            displacement: [0, $('#kind').val() === 'anchored' ? 20 : 0],
            stroke: new ol.style.Stroke({
                width: Number($("#border").val()) + (sel ? 3 : 0),
                color: sel ? 'red' : '#fff'
            })
            })
        });
        }
        return [style];
    }
    
    // GeoJSON layer
    var vectorSource = new ol.source.Vector({
        url: './app/settings/get_enhanced_overlays',
        projection: 'EPSG:3857',
        format: new ol.format.GeoJSON(),
        attributions: [ "&copy; <a href='https://twitter.com/search?q=paris%20autrefois%20(from%3ASamuelMartin75)&src=typed_query&f=live'>@SamuelMartin75</a>" ]
    });
    
    var vector = new ol.layer.Vector({
        name: 'Paris 1900',
        preview: "https://pbs.twimg.com/media/Fnnx0ylXgAABNjV?format=jpg&name=small",
        source: vectorSource,
        // y ordering
        renderOrder: ol.ordering.yOrdering(),
        style: getFeatureStyle
      });
    
      map_paris.addLayer(vector);
};