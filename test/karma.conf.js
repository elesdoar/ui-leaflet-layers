module.exports = (config) => {
  return config.set({
    basePath: './',
    frameworks: ['jasmine'],
    preprocessors: {
      '../test/**/*.js': ['babel'],
      '../dist/ui-leaflet-layers.js': ['coverage']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: 'dist/coverage/',
          subdir: 'lib'
        }, {
          type: 'cobertura',
          dir: 'dist/coverage/',
          subdir: 'lib'
        }
      ]
    },
    files: [
      '../bower_components/leaflet/dist/leaflet.js',
      '../bower_components/angular/angular.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'http://maps.google.com/maps/api/js?key=AIzaSyBazU_OOTAZRmxQfaiirM1EDPLCiUSTlrY',
      'http://api-maps.yandex.ru/2.1/?lang=en_US',
      '../bower_components/leaflet-plugins/layer/tile/Google.js',
      '../bower_components/leaflet-plugins/layer/tile/Yandex.js',
      '../bower_components/ui-leaflet/dist/ui-leaflet.js',
      '../dist/ui-leaflet-layers.js',
      'unit/*.spec.js'
    ],
    exclude: [],
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false
  });
};
