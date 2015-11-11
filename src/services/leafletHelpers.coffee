angular.module('ui-leaflet')
  .config ($provide) ->
    $provide.decorator 'leafletHelpers', ($delegate, leafletLayersLogger) ->
      $log = leafletLayersLogger
      angular.extend $delegate,
        GoogleLayerPlugin:
          isLoaded: () ->
            angular.isDefined L.Google
          is: (layer) ->
            if this.isLoaded()
              return layer instanceof L.Google
            else
              return false

        MapboxGL:
          isLoaded: () ->
            $log.debug 'New MapboxGL plugin in leafletHelpers'
            angular.isDefined(L.mapboxGL)

      $delegate
