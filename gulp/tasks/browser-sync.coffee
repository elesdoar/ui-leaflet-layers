gulp = require 'gulp'
browserSync = require('browser-sync').create()

gulp.task 'browser-sync', () ->
  browserSync.init
    open: false
    server:
      baseDir: './',
      directory: true

  gulp.watch './src/**/*.coffee', gulp.series 'release'
  gulp.watch './dist/**/*.min.js', browserSync.reload
  gulp.watch './examples/**/*.html', browserSync.reload
  return
