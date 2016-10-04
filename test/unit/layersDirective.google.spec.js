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

  it('should create google layers if correctly configured', function () {
    angular.extend(scope, {
      layers: {
        baselayers: {
          googleTerrain: {
            name: 'Google Terrain',
            layerType: 'TERRAIN',
            type: 'google'
          }
        },
        overlays: {
          googleHybrid: {
            name: 'Google Hybrid',
            layerType: 'HYBRID',
            type: 'google',
            visible: true
          },
          googleRoadmap: {
            name: 'Google Streets',
            layerType: 'ROADMAP',
            type: 'google',
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
      expect(map.hasLayer(layers.baselayers.googleTerrain)).toBe(true);
      expect(map.hasLayer(layers.overlays.googleHybrid)).toBe(true);
      expect(map.hasLayer(layers.overlays.googleRoadmap)).toBe(true);
    });
  });
});
