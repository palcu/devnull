var browserify = require('browserify'),
    gulp = require('gulp'),
    react = require('gulp-react'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint');

var FILES = 'src/**';

gulp.task('build', function() {
  return browserify('./src/game.jsx')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('lint', function() {
  return gulp.src(FILES)
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  var lintFiles = FILES.concat('gulpfile.js')
  gulp.watch(lintFiles, ['build']);
});

gulp.task('default', ['build', 'watch']);
