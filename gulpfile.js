var gulp = require('gulp'),
    less = require("gulp-less"),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify");

gulp.task('compile-less', function () {
    gulp.src('dist/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});
gulp.task('minify-css', function () {
    gulp.src('dist/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('css'));
});
gulp.task('minify-js', function () {
    gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});
