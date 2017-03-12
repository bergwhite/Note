/*eslint pug require.js(not sure) unit test*/
const gulp = require('gulp'),
    less = require("gulp-less"),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint');

gulp.task('compile-less', () =>
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(rename(function(path){
            path.basename += '.min'
        }))
        .pipe(gulp.dest('src/css'))
);
gulp.task('minify-css', () =>
    gulp.src('src/css/*.css')
        .pipe(minifyCss())
        .pipe(rename(function(path){
            path.basename += '.min'
        }))
        .pipe(gulp.dest('dist/css'))
);
gulp.task('minify-js', () =>
    gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path){
            path.basename += '.min'
        }))
        .pipe(gulp.dest('dist/js'))
);
gulp.task('rename', () =>
    gulp.src('./dist/*/*')
        .pipe(rename(function(path){
            path.basename += '.min'
        }))
        .pipe(gulp.dest('./dist'))
);
gulp.task('babel', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
);
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
gulp.task('ready',['compile-less','babel']);
gulp.task('build',['minify-css','minify-js']);