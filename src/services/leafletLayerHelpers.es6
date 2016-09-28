angular.module('ui-leaflet')
  .config($provide =>
    $provide.decorator('leafletLayerHelpers', function($delegate, $rootScope, $q, leafletHelpers, leafletLayersLogger) {
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
        ags: {
          mustHaveUrl: true,
          createLayer: function(params) {
            if (!leafletHelpers.AGSLayerPlugin.isLoaded()) {
              return;
            }

            var options = angular.copy(params.options);
            angular.extend(options, {
              url: params.url
            });
            var layer = new lvector.AGS(options);
            layer.onAdd = function(map) {
              this.setMap(map);
            };
            layer.onRemove = function() {
              this.setMap(null);
            };
            return layer;
          }
        },
        agsBase: {
          mustHaveLayer : true,
          createLayer: function (params) {
            if (!leafletHelpers.AGSBaseLayerPlugin.isLoaded()) {
              return;
            }
            return L.esri.basemapLayer(params.layer, params.options);
          }
        },
        agsClustered: {
          mustHaveUrl: true,
          createLayer: function(params) {
            if (!leafletHelpers.AGSClusteredLayerPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The esri clustered layer plugin is not loaded.');
              return;
            }

            if(!leafletHelpers.MarkerClusterPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The markercluster plugin is not loaded.');
              return;
            }
            return L.esri.clusteredFeatureLayer(params.url, params.options);
          }
        },
        agsDynamic: {
          mustHaveUrl: true,
          createLayer: function(params) {
            if (!leafletHelpers.AGSDynamicMapLayerPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The esri plugin is not loaded.');
              return;
            }

            params.options.url = params.url;

            return L.esri.dynamicMapLayer(params.options);
          }
        },
        agsFeature: {
          mustHaveUrl: true,
          createLayer: function(params) {
            if (!leafletHelpers.AGSFeatureLayerPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The esri plugin is not loaded.');
              return;
            }

            params.options.url = params.url;

            var layer = L.esri.featureLayer(params.options);
            var load = function() {
              if(isDefined(params.options.loadedDefer)) {
                params.options.loadedDefer.resolve();
              }
            };
            layer.on('loading', function() {
              params.options.loadedDefer = $q.defer();
              layer.off('load', load);
              layer.on('load', load);
            });

            return layer;
          }
        },
        agsHeatmap: {
          mustHaveUrl: true,
          createLayer: function(params) {
            if (!leafletHelpers.AGSHeatmapLayerPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The esri heatmap layer plugin is not loaded.');
              return;
            }

            if(!leafletHelpers.HeatLayerPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The heatlayer plugin is not loaded.');
              return;
            }
            return L.esri.heatmapFeatureLayer(params.url, params.options);
          }
        },
        agsImage: {
          mustHaveUrl: true,
          createLayer: function(params) {
            if (!leafletHelpers.AGSImageMapLayerPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The esri plugin is not loaded.');
              return;
            }
            params.options.url = params.url;

            return L.esri.imageMapLayer(params.options);
          }
        },
        agsTiled: {
          mustHaveUrl: true,
          createLayer: function(params) {
            if (!leafletHelpers.AGSTiledMapLayerPlugin.isLoaded()) {
              $log.warn(errorHeader + ' The esri plugin is not loaded.');
              return;
            }

            params.options.url = params.url;

            return L.esri.tiledMapLayer(params.options);
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

        here: {
          mustHaveUrl: false,
          createLayer: function(params) {
            var provider = params.provider || 'HERE.terrainDay';
            if (!leafletHelpers.LeafletProviderPlugin.isLoaded()) {
              return;
            }
            return new L.TileLayer.Provider(provider, params.options);
          }
        },

        mapbox: {
          mustHaveKey: true,
          createLayer(params) {
            let url = '//api.mapbox.com/styles/v1/{user}/{mapId}/tiles/256/{z}/{x}/{y}?access_token={apiKey}';
            return L.tileLayer(url, angular.extend(params.options, {
              mapId: params.key,
              user: params.user,
              apiKey: params.apiKey
            }));
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

        utfGrid: {
          mustHaveUrl: true,
          createLayer: utfGridCreateLayer
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
        }
      });

      return $delegate;
    })
  );
