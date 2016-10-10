angular.module('ui-leaflet')
  .config(['$provide', $provide =>
    $provide.decorator('leafletHelpers', ['$delegate', 'leafletLayersLogger', ($delegate, leafletLayersLogger) => {
      const $log = leafletLayersLogger;

      const _versionCompare = (left, right) => {
        if(typeof left + typeof right !== 'stringstring') {
          return false;
        }

        let a = left.split('.');
        let b = right.split('.');
        let i = 0, len = Math.max(a.length, b.length);

        for (; i < len; i++) {
          if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
          } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
          }
        }

        return 0;
      };

      const basicFunction = layerType =>
        ({
          isLoaded() {
            return angular.isDefined(layerType);
          },
          is(layer) {
            if (this.isLoaded()) {
              return layer instanceof layerType;
            }
            return false;
          }
        });

      const plugins = {
        // Please keep keys order by alphabetical sort.
        BingLayerPlugin: basicFunction(L.BingLayer),
        ChinaLayerPlugin: basicFunction(L.tileLayer.chinaProvider),
        HeatLayerPlugin: basicFunction(L.heatLayer),
        LeafletProviderPlugin: basicFunction(L.TileLayer.Provider),
        MapboxGL: basicFunction(L.mapboxGL),
        UTFGridPlugin: basicFunction(L.UtfGrid),
        WebGLHeatMapLayerPlugin: basicFunction(L.TileLayer.WebGLHeatMap),
        WFSLayerPlugin: basicFunction(L.GeoJSON.WFS),
        YandexLayerPlugin: basicFunction(L.Yandex)
      };

      if(_versionCompare(L.version, '1.0.0') === -1) {
        plugins.GoogleLayerPlugin = basicFunction(L.Google);
      } else {
        plugins.GoogleLayerPlugin = basicFunction(L.GridLayer.GoogleMutant);
      }
      plugins.versionCompare = _versionCompare;

      if(angular.isDefined(L.esri)) {
        angular.extend(plugins, {
          AGSBaseLayerPlugin: basicFunction(L.esri.basemapLayer),
          AGSClusteredLayerPlugin: basicFunction(L.esri.clusteredFeatureLayer),
          AGSDynamicMapLayerPlugin: basicFunction(L.esri.dynamicMapLayer),
          AGSFeatureLayerPlugin: basicFunction(L.esri.featureLayer),
          AGSImageMapLayerPlugin: basicFunction(L.esri.imageMapLayer),
          AGSHeatmapLayerPlugin: basicFunction(L.esri.heatmapFeatureLayer),
          AGSTiledMapLayerPlugin: basicFunction(L.esri.tiledMapLayer)
        });
      } else {
        angular.extend(plugins, {
          AGSBaseLayerPlugin: basicFunction(),
          AGSClusteredLayerPlugin: basicFunction(),
          AGSDynamicMapLayerPlugin: basicFunction(),
          AGSFeatureLayerPlugin: basicFunction(),
          AGSImageMapLayerPlugin: basicFunction(),
          AGSHeatmapLayerPlugin: basicFunction(),
          AGSTiledMapLayerPlugin: basicFunction()
        });
      }

      if(angular.isDefined(window.lvector)) {
        angular.extend(plugins, {
          AGSLayerPlugin: basicFunction(window.lvector.AGS)
        });
      } else {
        angular.extend(plugins, {
          AGSLayerPlugin: basicFunction()
        });
      }

      angular.extend($delegate, plugins);

      $log.info('[ui-leaflet-layers] - Layers plugin is loaded');

      return $delegate;
    }])
  ]);
