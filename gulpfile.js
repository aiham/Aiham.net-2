var gulp = require('gulp'),
    gulpSourceMaps = require('gulp-sourcemaps'),
    gulpConcat = require('gulp-concat'),
    gulpCopy = require('gulp-copy'),
    gulpUglify = require('gulp-uglify'),
    gulpCssNano = require('gulp-cssnano'),

    SOURCE_ROOT = './src',
    VENDOR_ROOT = './node_modules',
    DESTINATION_ROOT = './dist',

    files = {
        src: {
            all: [
                SOURCE_ROOT + '/**/*',
                '!' + SOURCE_ROOT + '/app.css',
                '!' + SOURCE_ROOT + '/app.js',
            ],
            css: [
                VENDOR_ROOT + '/bootstrap/dist/css/bootstrap.css',
                SOURCE_ROOT + '/app.css'
            ],
            js: [
                VENDOR_ROOT + '/jquery/dist/jquery.js',
                VENDOR_ROOT + '/bootstrap/dist/js/bootstrap.js',
                VENDOR_ROOT + '/masonry-layout/dist/masonry.pkgd.js',
                VENDOR_ROOT + '/angular/angular.js',
                SOURCE_ROOT + '/app.js'
            ]
        }
    };

gulp.task('default', ['copy', 'css', 'js']);

gulp.task('copy', function () {
    return gulp.src(files.src.all)
        .pipe(gulpCopy(DESTINATION_ROOT, {prefix: 1}));
});

gulp.task('css', function () {
    return gulp.src(files.src.css)
        .pipe(gulpSourceMaps.init())
        .pipe(gulpConcat('app.css'))
        .pipe(gulpCssNano())
        .pipe(gulpSourceMaps.write('.'))
        .pipe(gulp.dest(DESTINATION_ROOT));
});

gulp.task('js', function () {
    return gulp.src(files.src.js)
        .pipe(gulpSourceMaps.init())
        .pipe(gulpConcat('app.js'))
        .pipe(gulpUglify())
        .pipe(gulpSourceMaps.write('.'))
        .pipe(gulp.dest(DESTINATION_ROOT));
});
