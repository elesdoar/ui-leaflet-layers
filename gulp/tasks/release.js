const gulp = require('gulp');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');
const fs = require('fs');

gulp.task('changelog', () => {
  return gulp.src('CHANGELOG.md', {
    buffer: true
  })
  .pipe(conventionalChangelog({
    preset: 'angular' // Or to any other commit message convention you use.
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('github-release', done => {
  const token = JSON.parse(fs.readFileSync('./gulp/.githubreleaser.json', 'utf8')).token;
  conventionalGithubReleaser({
    type: 'oauth',
    token: token
  }, {
    preset: 'angular' // Or to any other commit message convention you use.
  }, done);
});

gulp.task('bump-version', () => {
  // We hardcode the version change type to 'patch' but it may be a good idea to
  // use minimist (https://www.npmjs.com/package/minimist) to determine with a
  // command argument whether you are doing a 'major', 'minor' or a 'patch' change.
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: 'patch'}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', () => {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', (cb) => {
  git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', (cb) => {
  const getPackageJsonVersion = () => {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };
  const version = getPackageJsonVersion();

  git.tag(version, 'Created Tag for version: ' + version, error => {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', {args: '--tags'}, cb);
  });
});

gulp.task('release', gulp.series(
  'bump-version',
  'changelog',
  'commit-changes',
  'push-changes',
  'create-new-tag',
  'github-release'
));
