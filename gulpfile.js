/**
 * ./gulpfile.js
 */

'use strict';

// REQUIRE
var gulp    = require('gulp');
// var concat  = require('gulp-concat');
var eslint  = require('gulp-eslint');
var rename  = require('gulp-rename');
var clean   = require('gulp-clean');
var uglify  = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sass    = require('gulp-sass');
var bs   = require('browser-sync').create();

// CLEAN DEV JS
gulp.task('clean-dev-js', function(){
  return gulp.src(
    ['js/*.min.js', 'js/*.pkgd.js'], {read: false})
    .pipe(clean());
});

// LINTER
gulp.task('linter', ['clean-dev-js'], function(){
  gulp.src(['js/*.js', '!js/*.min.js', '!js/*.pkgd.js'], {base:'js/'})
    .pipe(eslint())
    .pipe(eslint.formatEach());
});

/**
 * UGLIFY
 */
gulp.task('uglify', ['clean-dev-js'], function(){
  gulp.src(['js/*.js', '!js/*.min.js', '!js/*.pkgd.js'], {base:'js/'})
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('js'));
});

/**
 * VENDOR LIBRARIES
 */
gulp.task('libs', ['clean-dev-js'], function() {
  gulp.src(['node_modules/normalize.css/normalize.css'])
    .pipe(gulp.dest('style'));
});

/**
 * BUILD CLEAN
 */
gulp.task('clean', function(){
  return gulp.src('build', {read: false})
    .pipe(clean());
});

// SASS
gulp.task('sass', function () {
  return gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('style'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: './'
    },
    ghostMode: {
      clicks: true,
      location: true,
      scroll: true
    }
  });
});

gulp.task('watch', ['sass', 'browser-sync'], function () {
  gulp.watch('*.html').on('change', bs.reload);
  gulp.watch('js/**/*.js', [bs.reload]);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('sass-watch', function () {
  return gulp.watch(['sass/**/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'linter', 'uglify', 'libs', 'sass-watch']);

gulp.task('build', ['sass', 'linter', 'uglify', 'libs'], function(){
  gulp.src(['js/*.min.js', 'js/*.pkgd.js'], {base:'js/'})
    .pipe(gulp.dest('build/js'));
  gulp.src('style/*.css')
    .pipe(gulp.dest('build/style'));
  gulp.src('images/*')
    .pipe(gulp.dest('build/images'));
  gulp.src('index.html')
    .pipe(gulp.dest('build'));
});
