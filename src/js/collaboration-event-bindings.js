//--------------------------------------------------------------------------------------
//  Portal Collaboration event bindings
//--------------------------------------------------------------------------------------

gisportal.events.bind("room.presenter-state-update", function(event, data) {
   var new_data = _.clone(data);
   new_data.ignoreDivergence = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind("date.selected", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind("date.zoom", function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind("ddslick.open", function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind("ddslick.selectValue", function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind("view.loaded", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind("view.removed", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// hide the panel
gisportal.events.bind("panel.hide", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// show the panel
gisportal.events.bind("panel.show", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// hide a layer
gisportal.events.bind("layer.hide", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// layer removed from panel
gisportal.events.bind("layer.remove", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// layer order changed
gisportal.events.bind("layer.reorder", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// show a layer
gisportal.events.bind("layer.show", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// user moves the map, or zooms in/out
gisportal.events.bind("map.move", function(event, data) {
   collaboration._emit('c_event', data);
});

// show a panel
gisportal.events.bind("panels.showpanel", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind("refinePanel.cancel", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind("refinePanel.removeCat", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// auto scale a layer
gisportal.events.bind("scalebar.autoscale", function(event, data) {
   collaboration._emit('c_event', data);
});

// auto scale a layer
gisportal.events.bind("scalebar.autoscale-checkbox", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// indicator has logarithmic scale
gisportal.events.bind("scalebar.log-set", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// scalebar maximum value set
gisportal.events.bind("scalebar.max-set", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// scalebar minimum value set
gisportal.events.bind("scalebar.min-set", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// layer opacity changed
gisportal.events.bind("scalebar.opacity", function(event, data) {
   collaboration._emit('c_event', data);
});

// layer colorbands changed
gisportal.events.bind("scalebar.colorbands", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// layer custom above max colour changed
gisportal.events.bind("scalebar.custom-aboveMaxColor", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// layer custom below min colour changed
gisportal.events.bind("scalebar.custom-belowMinColor", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// reset layer settings
gisportal.events.bind("scalebar.reset", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// apply setting changes
gisportal.events.bind("scalebar.apply-changes", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// search string changes
gisportal.events.bind("search.typing", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', data);
});

// wms string changes
gisportal.events.bind("wms.typing", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// geocoder string changes
gisportal.events.bind("geocoderInput.typing", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// refresh cache box changed
gisportal.events.bind("refreshCacheBox.clicked", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// wms submitted
gisportal.events.bind("wms.submitted", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// more info clicked
gisportal.events.bind("moreInfo.clicked", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// show geocoder clicked
gisportal.events.bind("showGeocoder.clicked", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// reset list clicked
gisportal.events.bind("resetList.clicked", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// add layers form clicked
gisportal.events.bind("addLayersForm.clicked", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// search string changes
gisportal.events.bind("search.resultselected", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// Layer tab selected
gisportal.events.bind("tab.select", function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

// Layer tab closed
gisportal.events.bind("layerTab.close", function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('configurepanel.scroll', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('mapsettingspanel.scroll', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('indicatorspanel.scroll', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayersForm.scroll', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('slideout.scroll', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('refinePanel.scroll', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayerServer.clicked', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayersForm.input', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayersForm.autoScale-changed', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayersForm.aboveMaxColor-changed', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayersForm.belowMinColor-changed', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayersForm.defaultStyle-changed', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('addLayersForm.close', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('body.keydown', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('paginator.selected', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('zoomToData.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('submitLayers.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('cancelChanges.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('toggleAllLayers.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('logToAllLayers.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('addToAll.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('addScalePointsToAll.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('addTagInput.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('userFeedback.close', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('userFeedback.submit', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('userFeedback.input', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('drawBox.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('drawPolygon.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('indicatorsPanel.geoJSONSelected', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('placeSearchFilter.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('drawFilterBox.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('drawFilterPolygon.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('geocoderRadius.changed', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('selectPolygon.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('removeGeoJSON.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('jsCoordinate.edit', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('clearSelection.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('olDraw.click', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('olDraw.drawstart', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('olDraw.drawend', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('filterDraw.drawend', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('geolocationFilter.filterByPlace', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('selectPolygon.hover', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('selectPolygon.select', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('coordinates.save', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('featureOverlay.removeType', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('dataPopup.display', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('dataPopup.close', function(event, data) {
   collaboration._emit('c_event', data);
});

gisportal.events.bind('newPlot.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('addToPlot.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphs.deleteActive', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('slideout.togglePeak', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('slideout.close', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('more-info.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphTitle.edit', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphType.edit', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphStyle.edit', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('layerDepth.change', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphFramerate.change', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphRange.change', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphStartDate.change', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphEndDate.change', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graph.submitted', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphComponent.remove', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphComponent.axisChange', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphComponent.axisLabelChange', function(events, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graph.open', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graph.copy', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graph.delete', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('graphPopup.close', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('configureInternalLayers.clicked', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});

gisportal.events.bind('configureInternalLayers.closed', function(event, data) {
   var new_data = _.clone(data);
   new_data.collabLog = true;
   collaboration._emit('c_event', new_data);
});