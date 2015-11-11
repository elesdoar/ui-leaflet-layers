/**
 * ui-leaflet-layers
 *
 * @version: 0.1.0
 * @author: Michael Salgado <elesdoar@gmail.com>
 * @date: Wed Nov 11 2015 01:35:21 GMT-0500 (COT)
 * @license: MIT
 */
(function (window, angular){
  (function() {
  angular.module('ui-leaflet').config(function($provide, nemDebugProvider) {
    return $provide.decorator('leafletHelpers', function($delegate, $log) {
      $delegate.MapboxGL = {
        isLoaded: function() {
          $log.debug('New MapboxGL plugin in leafletHelpers');
          return angular.isDefined(L.mapboxGL);
        }
      };
      return $delegate;
    });
  });

}).call(this);

(function() {
  angular.module('ui-leaflet').config(function($provide, nemDebugProvider) {
    return $provide.decorator('leafletLayerHelpers', function($delegate, $log, leafletHelpers) {
      var layerTypes;
      layerTypes = $delegate.layerTypes;
      layerTypes.mapboxGL = {
        createLayer: function(params) {
          $log.debug('New MapboxGL plugin');
          if (!leafletHelpers.MapboxGL.isLoaded()) {
            return;
          }
          return new L.mapboxGL(params.options);
        }
      };
      return $delegate;
    });
  });

}).call(this);

})(window, angular);