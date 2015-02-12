var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish')

gulp.task('lint', function () {
  return gulp.src([
        //'**/*.js'
        'innercircle-enhancement-suite.user.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
})

gulp.task('default', ['lint'])
