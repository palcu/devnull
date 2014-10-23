var browserify = require('browserify'),
    gulp = require('gulp'),
    react = require('gulp-react'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
    glob = require('glob');

var FILES = './src/**/*.jsx';

gulp.task('build', function() {
  var bundler = browserify();

  glob.sync(FILES).forEach(function(file) {
    console.log(file);
    bundler.require(file)
  })
  return bundler.bundle()
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
