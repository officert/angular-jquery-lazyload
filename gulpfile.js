/* ========================================================================
 * Dependencies
 * ========================================================================= */
var fs = require('fs')
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var uglify = require('gulp-uglifyjs');
var replace = require('gulp-replace');
var sh = require('shelljs');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

/* =========================================================================
 * Constants
 * ========================================================================= */
var BUILDDIR = 'release';

//js
var UNMINIFIEDSCRIPT = 'angular.jquery.lazyload.js';
var MINIFIEDSCRIPT = 'angular.jquery.lazyload.min.js';

/* =========================================================================
 * Tasks
 * ========================================================================= */

/**
 * Clean the build directory
 */
gulp.task('clean', function(next) {
  sh.rm('-rf', BUILDDIR);
  next();
});

/**
 * Minify javascript files
 */
gulp.task('js', ['js-un-min', 'js-min']);

gulp.task('js-min', function() {
  return gulp.src(['src/**/*.js', '!src/examples/**'])
    .pipe(uglify(MINIFIEDSCRIPT, {
      mangle: true,
      compress: true
    }))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('js-un-min', function() {
  return gulp.src(['src/**/*.js', '!src/examples/**'])
    .pipe(concat(UNMINIFIEDSCRIPT))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('examples-js', ['js'], function() {
  return gulp.src(BUILDDIR + '/*.js')
    .pipe(gulp.dest('src/examples/lib'));
});

/**
 * Js Hint
 */
gulp.task('jshint', function() {
  return gulp.src(['src/**/*.js', '!src/examples/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Release
 */
gulp.task('release', ['clean', 'examples-js', 'jshint', 'js'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['release']);
