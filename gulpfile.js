// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-html-minifier');
//var convertEncoding = require('gulp-convert-encoding');

// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/custom.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(
        [
            'js/jquery.js'
            , 'js/bootstrap.js'
            , 'js/jquery.inview.js'
            , 'js/wow.js'
            , 'js/smooth-scroll.js'
            , 'js/smoothscroll.js'
            , 'js/jquery.countTo.js'
            , 'js/lightbox.js'
            , 'js/main.js'
        ]
    )
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Minify JS
gulp.task('scriptsIE', function () {
    return gulp.src(
        [
            'js/html5shiv.js'
            , 'js/respond.src.js'
        ]
    )
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
    return gulp.src(
        [
            'css/bootstrap.css'
            , 'css/animate.css'
            , 'css/font-awesome.css'
            , 'css/lightbox.css'
            , 'css/main.css'
            , 'css/presets/preset3.css'
            , 'css/responsive.css'
        ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss({processImport: false}))
        .pipe(gulp.dest('dist/css'));
});

// Optimizing Images
gulp.task('images', function () {
    return gulp.src([
        'images/**/*.jpg',
        'images/**/*.jpeg',
        'images/**/*.png',
        'images/**/*.gif'
    ])
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist/images'));
});

// Minify HTML
gulp.task('html', function() {
    gulp.src(        [
        'index.html'
        , 'portfolio-single.html'
    ])
        .pipe(htmlmin({collapseWhitespace: true}))
        //.pipe(convertEncoding({to: 'shift-jis'})) // お名前.comの簡易CGIがshift-jisのため ！文字化け注意！
        .pipe(gulp.dest('dist'))
});

// Copy
gulp.task('copy', function() {
    gulp.src([
        'favicon.ico',
        '.htaccess'
    ]).pipe(gulp.dest('dist'))
    gulp.src([
        'fonts/**'
    ]).pipe(gulp.dest('dist/fonts'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('*.html', ['html']);
});

// Default Task
gulp.task('default', ['lint', 'css', 'scripts', 'scriptsIE', 'images', 'copy', 'html', 'watch']);
