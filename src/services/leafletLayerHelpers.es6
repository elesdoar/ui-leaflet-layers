angular.module('ui-leaflet')
  .config($provide =>
    $provide.decorator('leafletLayerHelpers', function($delegate, $rootScope, leafletHelpers, leafletLayersLogger) {
      let $log = leafletLayersLogger;
      let { isArray } = leafletHelpers;
      let { isObject } = leafletHelpers;
      let { isDefined } = leafletHelpers;
      let { errorHeader } = leafletHelpers;
      let utfGridCreateLayer = params => {
        if (!leafletHelpers.UTFGridPlugin.isLoaded()) {
          $log.error(errorHeader + ' The UTFGrid plugin is not loaded.');
          return;
        }

        let utfgrid = new L.UtfGrid(params.url, params.pluginOptions);

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
          createLayer(params) {
            let type = params.type || 'SATELLITE';
            if (!leafletHelpers.GoogleLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The GoogleLayer plugin is not loaded.');
              return;
            }
            return new L.Google(type, params.options);
          }
        },

        mapboxGL: {
          createLayer(params) {
            if (!leafletHelpers.MapboxGL.isLoaded()) {
              $log.error(errorHeader + ' The MapboxGL plugin is not loaded.');
              return;
            }
            return new L.mapboxGL(params.options);
          }
        },

        bing: {
          mustHaveUrl: false,
          createLayer(params) {
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
          createLayer(params) {
            if (!leafletHelpers.WFSLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The WFSLayer plugin is not loaded.');
              return;
            }
            let options = angular.copy(params.options);
            if (options.crs && 'string' === typeof options.crs) {
              options.crs = eval(options.crs);
            }
            return new L.GeoJSON.WFS(params.url, params.layer, options);
          }
        },

        china: {
          mustHaveUrl:false,
          createLayer(params) {
            let type = params.type || '';
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
          createLayer(params) {
            if (!leafletHelpers.HeatLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The HeatMapLayer plugin is not loaded.');
              return;
            }
            let layer = new L.heatLayer();
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
          createLayer(params) {
            if (!leafletHelpers.WebGLHeatMapLayerPlugin.isLoaded()) {
              $log.error(errorHeader + ' The WebGLHeatMapLayer plugin is not loaded.');
              return;
            }
            let layer = new L.TileLayer.WebGLHeatMap(params.options);
            if (isDefined(params.data)) {
              layer.setData(params.data);
            }
            return layer;
          }
        },

        yandex: {
          mustHaveUrl: false,
          createLayer(params) {
            let type = params.type || 'map';
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
    })
  );
