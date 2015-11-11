angular.module('ui-leaflet')
  .config ($provide, nemDebugProvider) ->
    $provide.decorator 'leafletHelpers', ($delegate, $log) ->
      $delegate.MapboxGL =
        isLoaded: () ->
          $log.debug 'New MapboxGL plugin in leafletHelpers'
          angular.isDefined(L.mapboxGL)

      $delegate
