angular.module('ui-leaflet')
  .config ($provide) ->
    $provide.decorator 'leafletHelpers', ($delegate, leafletLayersLogger) ->
      $log = leafletLayersLogger

      basicFunction = (layerType) ->
        isLoaded: () ->
          angular.isDefined layerType
        is: (layer) ->
          if this.isLoaded()
            return layer instanceof layerType
          false

      angular.extend $delegate,
        GoogleLayerPlugin: basicFunction L.Google
        MapboxGL: basicFunction L.mapboxGL
        BingLayerPlugin: basicFunction L.BingLayer
        WFSLayerPlugin: basicFunction L.GeoJSON.WFS
        ChinaLayerPlugin: basicFunction L.tileLayer.chinaProvider
        HeatLayerPlugin: basicFunction L.heatLayer
        WebGLHeatMapLayerPlugin: basicFunction L.TileLayer.WebGLHeatMap
        YandexLayerPlugin: basicFunction L.Yandex
        UTFGridPlugin: basicFunction L.UtfGrid


      $delegate
