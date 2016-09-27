angular.module('ui-leaflet')
  .config($provide =>
    $provide.decorator('leafletHelpers', function($delegate, leafletLayersLogger) {
      const $log = leafletLayersLogger;

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
        GoogleLayerPlugin: basicFunction(L.Google),
        HeatLayerPlugin: basicFunction(L.heatLayer),
        LeafletProviderPlugin: basicFunction(L.TileLayer.Provider),
        MapboxGL: basicFunction(L.mapboxGL),
        UTFGridPlugin: basicFunction(L.UtfGrid),
        WebGLHeatMapLayerPlugin: basicFunction(L.TileLayer.WebGLHeatMap),
        WFSLayerPlugin: basicFunction(L.GeoJSON.WFS),
        YandexLayerPlugin: basicFunction(L.Yandex)
      };

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
    })
  );
