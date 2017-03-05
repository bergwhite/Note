var gulp = require('gulp'),
    less = require("gulp-less"),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify");
    rename = require('gulp-rename')

gulp.task('compile-less', function () {
    gulp.src('dist/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});
gulp.task('minify-css', function () {
    gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});
gulp.task('minify-js', function () {
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('rename',function () {
    gulp.src('./dist/*/*')
    .pipe(rename(function(path){
        path.basename += '.min'
    }))
    .pipe(gulp.dest('./dist'))
})
gulp.task('build',['minify-css','minify-js'])