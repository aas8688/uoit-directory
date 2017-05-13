/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sassLint = require('gulp-sass-lint'),
    notify = require('gulp-notify'),
    templateCache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    ngAnnotate = require('gulp-ng-annotate');



gulp.task('scss-task', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(sourcemaps.write())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('html-task', function() {
    // gulp.task('html-task', ['template'], function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'html task complete'
        }));
});

gulp.task('annotation', function() {
    return gulp.src('src/service.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('src/js'));
});

gulp.task('minify', ['annotation'], function() {
    return gulp.src('src/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist/js/'));
});


gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html-task']);
    // gulp.watch('src/template/**/*.html', ['template']);
    gulp.watch('src/scss/**/*.scss', ['scss-task']);
    gulp.watch('src/js/**/*.js', ['minify']);

});

// 'template', 'scss', 'copyHtml', 'js'
gulp.task('default', ['html-task', 'scss-task', 'minify', 'watch'], function() {
    return gutil.log('Gulp is running!');
});
