require './tasks/'
gulp = require 'gulp'

gulp.task 'default', gulp.series 'build', 'test', 'browser-sync', 'watch'
