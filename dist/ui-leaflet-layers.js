/**
 * ui-leaflet-layers
 *
 * @version: 0.1.0
 * @author: Michael Salgado <elesdoar@gmail.com>
 * @date: Thu Nov 12 2015 01:40:28 GMT-0500 (COT)
 * @license: MIT
 */
(function (window, angular){
  (function() {
  angular.module('ui-leaflet').config(function($provide) {
    return $provide.decorator('leafletHelpers', function($delegate, leafletLayersLogger) {
      var $log, basicFunction;
      $log = leafletLayersLogger;
      basicFunction = function(layerType) {
        return {
          isLoaded: function() {
            return angular.isDefined(layerType);
          },
          is: function(layer) {
            if (this.isLoaded()) {
              return layer instanceof layerType;
            }
            return false;
          }
        };
      };
      angular.extend($delegate, {
        GoogleLayerPlugin: basicFunction(L.Google),
        MapboxGL: basicFunction(L.mapboxGL),
        BingLayerPlugin: basicFunction(L.BingLayer),
        WFSLayerPlugin: basicFunction(L.GeoJSON.WFS),
        ChinaLayerPlugin: basicFunction(L.tileLayer.chinaProvider),
        HeatLayerPlugin: basicFunction(L.heatLayer),
        WebGLHeatMapLayerPlugin: basicFunction(L.TileLayer.WebGLHeatMap),
        YandexLayerPlugin: basicFunction(L.Yandex),
        UTFGridPlugin: basicFunction(L.UtfGrid)
      });
      return $delegate;
    });
  });

}).call(this);

(function() {
  angular.module('ui-leaflet').config(function($provide) {
    return $provide.decorator('leafletLayerHelpers', function($delegate, $rootScope, leafletHelpers, leafletLayersLogger) {
      var $log, errorHeader, isArray, isDefined, isObject, utfGridCreateLayer;
      $log = leafletLayersLogger;
      isArray = leafletHelpers.isArray;
      isObject = leafletHelpers.isObject;
      isDefined = leafletHelpers.isDefined;
      errorHeader = leafletHelpers.errorHeader;
      utfGridCreateLayer = function(params) {
        var utfgrid;
        if (!leafletHelpers.UTFGridPlugin.isLoaded()) {
          $log.error(errorHeader + ' The UTFGrid plugin is not loaded.');
          return;
        }
        utfgrid = new L.UtfGrid(params.url, params.pluginOptions);
        utfgrid.on('mouseover', function(e) {
          $rootScope.$broadcast('leafletDirectiveMap.utfgridMouseover', e);
        });
        utfgrid.on('mouseout', function(e) {
          $rootScope.$broadcast('leafletDirectiveMap.utfgridMouseout', e);
        });
        utfgrid.on('click', function(e) {
          $rootScope.$broadcast('leafletDirectiveMap.utfgridClick', e);
        });
        utfgrid.on('mousemove', function(e) {
          $rootScope.$broadcast('leafletDirectiveMap.utfgridMousemove', e);
        });
        return utfgrid;
      };
      angular.extend($delegate.layerTypes, {
        google: {
          mustHaveUrl: false,
          createLayer: function(params) {
            var type;
            type = params.type || 'SATELLITE';
            if (!leafletHelpers.GoogleLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The GoogleLayer plugin is not loaded.');
              return;
            }
            return new L.Google(type, params.options);
          }
        },
        mapboxGL: {
          createLayer: function(params) {
            if (!leafletHelpers.MapboxGL.isLoaded()) {
              $log.error(errorHeader + ' The MapboxGL plugin is not loaded.');
              return;
            }
            return new L.mapboxGL(params.options);
          }
        },
        bing: {
          mustHaveUrl: false,
          createLayer: function(params) {
            if (!leafletHelpers.BingLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The Bing plugin is not loaded.');
              return;
            }
            return new L.BingLayer(params.key, params.options);
          }
        },
        wfs: {
          mustHaveUrl: true,
          mustHaveLayer: true,
          createLayer: function(params) {
            var options;
            if (!leafletHelpers.WFSLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The WFSLayer plugin is not loaded.');
              return;
            }
            options = angular.copy(params.options);
            if (options.crs && 'string' === typeof options.crs) {
              options.crs = eval(options.crs);
            }
            return new L.GeoJSON.WFS(params.url, params.layer, options);
          }
        },
        china: {
          mustHaveUrl: false,
          createLayer: function(params) {
            var type;
            type = params.type || '';
            if (!leafletHelpers.ChinaLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The ChinaLayer plugin is not loaded.');
              return;
            }
            return L.tileLayer.chinaProvider(type, params.options);
          }
        },
        heat: {
          mustHaveUrl: false,
          mustHaveData: true,
          createLayer: function(params) {
            var layer;
            if (!leafletHelpers.HeatLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The HeatMapLayer plugin is not loaded.');
              return;
            }
            layer = new L.heatLayer();
            if (isArray(params.data)) {
              layer.setLatLngs(params.data);
            }
            if (isObject(params.options)) {
              layer.setOptions(params.options);
            }
            return layer;
          }
        },
        webGLHeatmap: {
          mustHaveUrl: false,
          mustHaveData: true,
          createLayer: function(params) {
            var layer;
            if (!leafletHelpers.WebGLHeatMapLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The WebGLHeatMapLayer plugin is not loaded.');
              return;
            }
            layer = new L.TileLayer.WebGLHeatMap(params.options);
            if (isDefined(params.data)) {
              layer.setData(params.data);
            }
            return layer;
          }
        },
        yandex: {
          mustHaveUrl: false,
          createLayer: function(params) {
            var type;
            type = params.type || 'map';
            if (!leafletHelpers.YandexLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The YandexLayer plugin is not loaded.');
              return;
            }
            return new L.Yandex(type, params.options);
          }
        },
        utfGrid: {
          mustHaveUrl: true,
          createLayer: utfGridCreateLayer
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