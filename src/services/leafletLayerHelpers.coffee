angular.module('ui-leaflet')
  .config ($provide) ->
    $provide.decorator 'leafletLayerHelpers', ($delegate, leafletHelpers, leafletLayersLogger) ->
      $log = leafletLayersLogger
      angular.extend $delegate.layerTypes,
        google:
          mustHaveUrl: false,
          createLayer: (params) ->
            type = params.type || 'SATELLITE'
            if not leafletHelpers.GoogleLayerPlugin.isLoaded()
              return

            new L.Google type, params.options

        mapboxGL:
          createLayer: (params) ->
            $log.debug 'New MapboxGL plugin'
            if not leafletHelpers.MapboxGL.isLoaded()
              return
            new L.mapboxGL(params.options)

      $delegate
