var browserify = require('browserify'),
    gulp = require('gulp'),
    react = require('gulp-react'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
    glob = require('glob');

var FILES = './src/**/*.jsx';

gulp.task('lint', function() {
  return gulp.src(FILES)
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
