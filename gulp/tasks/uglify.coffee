gulp = require 'gulp'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'

gulp.task 'min', () ->
  gulp.src './dist/ui-leaflet-layers.js'
    .pipe uglify
      mangle: false
    .pipe concat 'ui-leaflet-layers.min.js'
    .pipe gulp.dest './dist'
