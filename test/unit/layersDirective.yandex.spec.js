describe('layersDirective', () => {
  let leafletData, $rootScope, $compile, scope;
  beforeEach(() => {
    module('ui-leaflet');
    inject(function(_$compile_, _$rootScope_, _leafletData_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      leafletData = _leafletData_;
    });
  });

  afterEach(inject(function ($rootScope) {
    $rootScope.$apply();
  }));

  it('should create yandex layers if correctly configured', function () {
    angular.extend(scope, {
      layers: {
        baselayers: {
          yandexBasic: {
            name: 'Yandex Basic',
            type: 'yandex'
          }
        },
        overlays: {
          yandexHybrid: {
            name: 'Yandex Hybrid',
            layerType: 'hybrid',
            type: 'yandex',
            visible: true
          },
          yandexRoadmap: {
            name: 'Yandex Satellite',
            layerType: 'satellite',
            type: 'yandex',
            visible: true
          }
        }
      }
    });
    var element = angular.element('<leaflet layers="layers"></leaflet>');
    element = $compile(element)(scope);
    var map;
    leafletData.getMap().then(function (leafletMap) {
      map = leafletMap;
    });
    scope.$digest();
    leafletData.getLayers().then(function (layers) {
      expect(map.hasLayer(layers.baselayers.yandexBasic)).toBe(true);
      expect(map.hasLayer(layers.overlays.yandexHybrid)).toBe(true);
      expect(map.hasLayer(layers.overlays.yandexRoadmap)).toBe(true);
    });
  });
});
