# ui-leaflet-layers

Angular UI Leaflet Layers Plugin, it extend layer capabilities for [ui-leaflet](http://angular-ui.github.io/ui-leaflet)

### Supported Layers:

* [Bing](https://www.bingmapsportal.com/)
* China
* [esri-leaflet](http://esri.github.io/esri-leaflet/)
* [Google Maps](https://developers.google.com/maps/)
* HeatLayer
* [Here Maps](https://developer.here.com/lp/mapAPIs)
* [MapboxGL](https://github.com/mapbox/mapbox-gl-leaflet)
* [Mapbox](http://mapbox.com/)
* MarkerCluster
* Yandex
* WebGLHeatMapLayer
* UTFGrid
* WFS

### Coming Soon:

* [CartoDB](http://cartodb.com/)

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
          style: 'mapbox://styles/mapbox/streets-v8'
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
