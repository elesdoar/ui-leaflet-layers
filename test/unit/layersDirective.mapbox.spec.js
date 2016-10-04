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

  it('should create mapbox layers if correctly configured', function () {
    angular.extend(scope, {
      layers: {
        baselayers: {
          mapboxBasic: {
            name: 'Mapbox Basic',
            type: 'mapbox',
            key: 'citng102800332hphzmbjudn7',
            user: 'elesdoar',
            apiKey: 'pk.eyJ1IjoiZWxlc2RvYXIiLCJhIjoiY2l0bmcwaDNpMDQzMTJvbDRpaTltN2dlbiJ9.KDnhRVh9St6vpQovMI7iLg'
          }
        },
        overlays: {
          mapboxOutdoors: {
            name: 'Mapbox Outdoors',
            type: 'mapbox',
            key: 'citng3g0g003s2it88y9lg769',
            user: 'elesdoar',
            apiKey: 'pk.eyJ1IjoiZWxlc2RvYXIiLCJhIjoiY2l0bmcwaDNpMDQzMTJvbDRpaTltN2dlbiJ9.KDnhRVh9St6vpQovMI7iLg',
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
      expect(map.hasLayer(layers.baselayers.mapboxBasic)).toBe(true);
      expect(map.hasLayer(layers.overlays.mapboxOutdoors)).toBe(true);
    });
  });
});
