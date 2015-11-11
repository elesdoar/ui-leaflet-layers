/**
 * ui-leaflet-layers
 *
 * @version: 0.1.0
 * @author: Michael Salgado <elesdoar@gmail.com>
 * @date: Wed Nov 11 2015 11:36:20 GMT-0500 (COT)
 * @license: MIT
 */
(function (window, angular){
  (function() {
  angular.module('ui-leaflet').config(function($provide) {
    return $provide.decorator('leafletHelpers', function($delegate, leafletLayersLogger) {
      var $log;
      $log = leafletLayersLogger;
      angular.extend($delegate, {
        GoogleLayerPlugin: {
          isLoaded: function() {
            return angular.isDefined(L.Google);
          },
          is: function(layer) {
            if (this.isLoaded()) {
              return layer instanceof L.Google;
            } else {
              return false;
            }
          }
        },
        MapboxGL: {
          isLoaded: function() {
            $log.debug('New MapboxGL plugin in leafletHelpers');
            return angular.isDefined(L.mapboxGL);
          }
        }
      });
      return $delegate;
    });
  });

}).call(this);

(function() {
  angular.module('ui-leaflet').config(function($provide) {
    return $provide.decorator('leafletLayerHelpers', function($delegate, leafletHelpers, leafletLayersLogger) {
      var $log;
      $log = leafletLayersLogger;
      angular.extend($delegate.layerTypes, {
        google: {
          mustHaveUrl: false,
          createLayer: function(params) {
            var type;
            type = params.type || 'SATELLITE';
            if (!leafletHelpers.GoogleLayerPlugin.isLoaded()) {
              return;
            }
            return new L.Google(type, params.options);
          }
        },
        mapboxGL: {
          createLayer: function(params) {
            $log.debug('New MapboxGL plugin');
            if (!leafletHelpers.MapboxGL.isLoaded()) {
              return;
            }
            return new L.mapboxGL(params.options);
          }
        }
      });
      return $delegate;
    });
  });

}).call(this);

(function() {
  angular.module('ui-leaflet').service('leafletLayersLogger', function(nemSimpleLogger) {
    return nemSimpleLogger.spawn();
  });

}).call(this);

})(window, angular);