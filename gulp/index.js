require('./tasks/');
const gulp = require('gulp');

gulp.task('release', gulp.series('build', 'test', 'min'));
gulp.task('default', gulp.series('release', 'browser-sync'));
