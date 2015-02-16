var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    shell = require('gulp-shell'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

var files = [
    //'**/*.js'
    'src/innercircle-enhancement-suite.user.js'
];

gulp.task('lint', function () {
  return gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['lint']);

gulp.task('compress', function() {
  gulp.src('src/innercircle-enhancement-suite.user.js')
    .pipe(uglify())
    .pipe(gulp.dest('tmp'))
});

gulp.task('concat', function() {
  return gulp.src([
      './src/version.js',
      './tmp/innercircle-enhancement-suite.user.js'
    ])
    .pipe(concat('innercircle-enhancement-suite.user.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch(files, ['lint']);
});

gulp.task('sign', shell.task([
  'keybase --quiet dir sign -p git'
]));

gulp.task('pub', function(cb) {
  runSequence('lint', 'compress', 'concat', 'sign', cb);
});