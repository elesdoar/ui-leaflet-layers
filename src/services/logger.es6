angular.module('ui-leaflet')
  .service('leafletLayersLogger', ['nemSimpleLogger', nemSimpleLogger => nemSimpleLogger.spawn()]);
