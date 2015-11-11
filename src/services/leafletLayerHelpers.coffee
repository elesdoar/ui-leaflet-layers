angular.module('ui-leaflet')
  .config ($provide, nemDebugProvider) ->
    $provide.decorator 'leafletLayerHelpers', ($delegate, $log, leafletHelpers) ->
      layerTypes = $delegate.layerTypes
      layerTypes.mapboxGL =
        createLayer: (params) ->
          $log.debug 'New MapboxGL plugin'
          if not leafletHelpers.MapboxGL.isLoaded()
            return
          new L.mapboxGL(params.options)

      $delegate
