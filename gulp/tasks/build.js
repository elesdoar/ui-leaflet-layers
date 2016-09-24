const gulp = require('gulp');
const concat = require('gulp-concat');
const insert = require('gulp-insert');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const jf = require('jsonfile');
const wrap = require('gulp-wrap');
require('./clean.js');

let date = new Date();

let pkgFn = () => jf.readFileSync('package.json');

let header = () => {
  let ourPackage = pkgFn();
  return `/**
           * ${ourPackage.name}
           *
           * @version: ${ourPackage.version}
           * @author: ${ourPackage.author}
           * @date: ${date.toString()}
           * @license: ${ourPackage.license}
           */\n`;
};

let build = (source, out = 'index.js') => {
  return gulp.src(source)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      compact: false,
      plugins: ['transform-remove-strict-mode']
    }))
    .pipe(concat(out))
    .pipe(sourcemaps.write('.'))
    .pipe(wrap({src: 'src/wrap/dist.js'}))
    .pipe(insert.prepend(header()))
    .pipe(gulp.dest('dist'));
};

gulp.task('build', () =>
  build([
    'src/services/leafletHelpers.es6',
    'src/services/leafletLayerHelpers.es6',
    'src/services/logger.es6'
  ], 'ui-leaflet-layers.js')
);
