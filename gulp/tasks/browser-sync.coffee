gulp = require 'gulp'
browserSync = require('browser-sync').create()

gulp.task 'browser-sync', () ->
  browserSync.init
    open: false
    server:
      baseDir: './'
  return

gulp.task 'watch', () ->
  gulp.watch 'examples/*.html', (file) ->
    if file.type == 'changed'
      result = browserSync.reload
        stream: true
      return result;
  return
