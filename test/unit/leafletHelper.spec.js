describe('leafletHelpers', () => {
  let leafletHelpers;
  beforeEach(() => {
    module('ui-leaflet');
    inject(function(_leafletHelpers_) {
      leafletHelpers = _leafletHelpers_;
    });
  });

  describe('versionCompare', () => {
    let versionCompare;
    beforeEach(() => {
      versionCompare = leafletHelpers.versionCompare;
    });

    describe('is greater than', () => {
      it('1.0.0 > 0.7.7', () => {
        expect(versionCompare('1.0.0', '0.7.7')).toBe(1);
      });
    });

    describe('is equal', () => {
      it('1.0.0 = 1.0.0', () => {
        expect(versionCompare('1.0.0', '1.0.0')).toBe(0);
      });
    });

    describe('is less than', () => {
      it('0.7.7 < 1.0.0', () => {
        expect(versionCompare('0.7.7', '1.0.0')).toBe(-1);
      });
    });
  });
});
