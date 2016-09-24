const server = require('http-server');
const gulp = require('gulp');
const path = require('path');

gulp.task('server', function(done) {
  server.createServer({
    root: path.join(__dirname, '../../')
    // robots: true
    // headers:
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': 'true'

  }).listen(8888);
  return done();
});

gulp.task('s', gulp.series('server'));
