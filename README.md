# ui-leaflet-layers

Angular UI Leaflet Layers Plugin, it extend layer capabilities for [ui-leaflet](http://angular-ui.github.io/ui-leaflet)

### Suported Layers:

* MapboxGL


### Coming Soon:

* [Mapbox](http://mapbox.com/)
* [CartoDB](http://cartodb.com/)
* [esri-leaflet](http://esri.github.io/esri-leaflet/)
* Google Maps
* Bing

### MapboxGL Example

**Controller:**

```js
angular.extend($scope, {
  center: {
    lat: 38.91275,
    lng: -77.032194,
    zoom: 15
  },
  layers: {
    baselayers: {
      mapboxGlLayer: {
        name: 'Sample',
        type: 'mapboxGL',
        layerOptions: {
          accessToken: [token],
          style: $scope.style
        }
      }
    },
    overlays: {}
  }
})
```

**HTML:**

```html
<leaflet lf-center="center" layers="layers" height="480px" width="100%"></leaflet>
```
