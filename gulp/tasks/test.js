const gulp = require('gulp');
const Karma = require('karma').Server;
const open = require('open');
const { log } = require('gulp-util');

let karmaRunner = (done) => {
  log('-- Karma Setup --');
  const karmaConf = require.resolve('../../karma.conf.coffee');
  try {
    new Karma({
      configFile: karmaConf,
      singleRun: true
    }, (code) => {
      log(`Karma Callback Code: ${code}`);
      done();
    }).start();
  } catch(e) {
    log(`KARMA ERROR: ${e}`);
    done(e);
  }
};

gulp.task('karma', done => karmaRunner(done));

gulp.task('test', gulp.parallel('karma'));

let doOpen = (name = '') => done => open(`dist/coverage/lib${name}/index.html`, 'Google Chrome', done) ;
gulp.task('coverage', doOpen());
