angular.module('ui-leaflet')
  .config ($provide) ->
    $provide.decorator 'leafletLayerHelpers', ($delegate, $rootScope, leafletHelpers, leafletLayersLogger) ->
      $log = leafletLayersLogger
      isArray = leafletHelpers.isArray
      isObject = leafletHelpers.isObject
      isDefined = leafletHelpers.isDefined
      errorHeader = leafletHelpers.errorHeader
      utfGridCreateLayer = (params) ->
        if not leafletHelpers.UTFGridPlugin.isLoaded()
          $log.error errorHeader + ' The UTFGrid plugin is not loaded.'
          return

        utfgrid = new L.UtfGrid params.url, params.pluginOptions

        utfgrid.on 'mouseover', (e) ->
          $rootScope.$broadcast 'leafletDirectiveMap.utfgridMouseover', e
          return

        utfgrid.on 'mouseout', (e) ->
          $rootScope.$broadcast 'leafletDirectiveMap.utfgridMouseout', e
          return

        utfgrid.on 'click', (e) ->
          $rootScope.$broadcast 'leafletDirectiveMap.utfgridClick', e
          return

        utfgrid.on 'mousemove', (e) ->
          $rootScope.$broadcast 'leafletDirectiveMap.utfgridMousemove', e
          return

        utfgrid

      angular.extend $delegate.layerTypes,
        google:
          mustHaveUrl: false
          createLayer: (params) ->
            type = params.type || 'SATELLITE'
            if not leafletHelpers.GoogleLayerPlugin.isLoaded()
              $log.error errorHeader + ' The GoogleLayer plugin is not loaded.'
              return
            new L.Google type, params.options

        mapboxGL:
          createLayer: (params) ->
            if not leafletHelpers.MapboxGL.isLoaded()
              $log.error errorHeader + ' The MapboxGL plugin is not loaded.'
              return
            new L.mapboxGL(params.options)

        bing:
          mustHaveUrl: false
          createLayer: (params) ->
            if not leafletHelpers.BingLayerPlugin.isLoaded()
              $log.error errorHeader + ' The Bing plugin is not loaded.'
              return
            new L.BingLayer params.key, params.options

        wfs:
          mustHaveUrl: true
          mustHaveLayer: true
          createLayer: (params) ->
            if not leafletHelpers.WFSLayerPlugin.isLoaded()
              $log.error errorHeader + ' The WFSLayer plugin is not loaded.'
              return
            options = angular.copy params.options
            if options.crs and 'string' == typeof options.crs
              options.crs = eval options.crs
            new L.GeoJSON.WFS params.url, params.layer, options

        china:
          mustHaveUrl:false
          createLayer: (params) ->
            type = params.type || ''
            if not leafletHelpers.ChinaLayerPlugin.isLoaded()
              $log.error errorHeader + ' The ChinaLayer plugin is not loaded.'
              return
            L.tileLayer.chinaProvider type, params.options

        heat:
          mustHaveUrl: false
          mustHaveData: true
          createLayer: (params) ->
            if not leafletHelpers.HeatLayerPlugin.isLoaded()
              $log.error errorHeader + ' The HeatMapLayer plugin is not loaded.'
              return
            layer = new L.heatLayer()
            if isArray params.data
              layer.setLatLngs params.data
            if isObject params.options
              layer.setOptions params.options
            layer

        webGLHeatmap:
          mustHaveUrl: false
          mustHaveData: true
          createLayer: (params) ->
            if not leafletHelpers.WebGLHeatMapLayerPlugin.isLoaded()
              $log.error errorHeader + ' The WebGLHeatMapLayer plugin is not loaded.'
              return
            layer = new L.TileLayer.WebGLHeatMap params.options
            if isDefined params.data
              layer.setData params.data
            layer

        yandex:
          mustHaveUrl: false
          createLayer: (params) ->
            type = params.type || 'map'
            if not leafletHelpers.YandexLayerPlugin.isLoaded()
              $log.error errorHeader + ' The YandexLayer plugin is not loaded.'
              return
            new L.Yandex type, params.options

        utfGrid:
          mustHaveUrl: true
          createLayer: utfGridCreateLayer

      $delegate
