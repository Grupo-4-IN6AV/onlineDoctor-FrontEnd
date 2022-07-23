/**
 *
 * The packages we are using
 *
 **/
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');

/**
 *
 * Styles
 * - Compile
 * - Catch errors (gulp-plumber)
 *
 **/
function style() {
    return gulp
        .src(['assets/scss/theme.scss'])
        .pipe(
            sass({
                outputStyle: 'compressed'
                // outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(autoprefixer('last 4 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
}

/**
 *
 * Javascript
 * - Uglify
 *
 **/

function scripts() {
    return gulp
        .src('assets/bundle/*.js')
        .pipe(uglify())
        .pipe(concat('plugins.bundle.js'))
        .pipe(plumber())
        .pipe(gulp.dest('./assets/js'))
}

/**
 *
 * BrowserSync.io
 * - Watch CSS, JS & HTML for changes
 * - View project at: localhost:3000
 *
 **/
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./assets/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./assets/bundle/**/*.js', scripts);
}

exports.style = style;
exports.scripts = scripts;
exports.default = watch;