const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('min', () => {
  return gulp.src('./dist/ui-leaflet-layers.js')
    .pipe(uglify({mangle: false}))
    .pipe(concat('ui-leaflet-layers.min.js'))
    .pipe(gulp.dest('./dist'));
});
