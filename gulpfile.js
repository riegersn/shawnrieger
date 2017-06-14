/**
 * ./gulpfile.js
 */

'use strict';

// REQUIRE
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    autoprefix  = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    bs          = require('browser-sync').create();


// JAVASCRIPT (UGLIFY)
gulp.task('js', function() {
  gulp.src(['./js/photos.js', './js/main.js', '!js/*.min.js'], {base:'js/'})
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js'));
});

// Process Sass
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //.pipe(autoprefix({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('style'));
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

gulp.task('watch', ['sass', 'js'], function () {
  gulp.watch('js/*.js', ['js']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('watch-browser', ['sass', 'browser-sync'], function () {
  gulp.watch('*.html').on('change', bs.reload);
  gulp.watch('js/**/*.js', [bs.reload]);
  gulp.watch('sass/**/*.scss', ['sass']);
});


gulp.task('build', ['sass', 'js'], function() {
  gulp.src(['./.htaccess', './index.php', './portfolio.json'])
    .pipe(gulp.dest('./build'));

  gulp.src('./style/main.css')
    .pipe(gulp.dest('./build/style'));

  gulp.src('./js/main.min.js')
    .pipe(gulp.dest('./build/js'));

  gulp.src('./downloads/*')
    .pipe(gulp.dest('./build/downloads'));

  gulp.src('./img/**/*')
    .pipe(gulp.dest('./build/img'));

  gulp.src('./parts/**/*')
    .pipe(gulp.dest('./build/parts'));
});
