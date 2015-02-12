var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    shell = require('gulp-shell');

var files = [
    //'**/*.js'
    'innercircle-enhancement-suite.user.js'
];

gulp.task('lint', function () {
  return gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['lint']);

gulp.task('watch', function() {
    gulp.watch(files, ['lint']);
});

gulp.task('sign', shell.task([
  'keybase --quiet dir sign -p git'
]));

gulp.task('pub', function(cb) {
  runSequence('lint', 'sign', cb);
});