'use strict';

const gulp = require('gulp');
let browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    open: false,
    server: {
      baseDir: './',
      directory: true
    }
  });

  const reload = (done) => {
    browserSync.reload();
    done();
  };

  gulp.watch('./src/**/*.es6', gulp.series('build-release'));
  gulp.watch('./test/**/*.spec.js', gulp.series('test'));
  gulp.watch('./dist/**/*.min.js',  reload);
  gulp.watch('./examples/**/*.html', reload);
});
