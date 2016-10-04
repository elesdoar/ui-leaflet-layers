require('./tasks/');
const gulp = require('gulp');

gulp.task('build-release', gulp.series('build', 'test', 'min'));
gulp.task('default', gulp.series('build-release', 'browser-sync'));
