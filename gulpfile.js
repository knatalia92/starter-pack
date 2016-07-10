var gulp = require('gulp'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-clean-css'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync');


/* ----------------------
	paths to source files
---------------------- */
var paths = {
	scss: "./src/scss/**/*.scss",
	scripts: "./src/js/**/*.js"
}


/* ----------------------
	scss to css tasks
---------------------- */
gulp.task('scss', function() {
	return gulp.src([
	    paths.scss
	])
	    .pipe(sass({
	    	onError: function(err) {
	            return notify().write(err);
	        }
	    }))
	    .pipe(minifycss({
	      	debug: true
	    }))
	    .pipe(gulp.dest('./dist/css/app.min.js'))
	    .pipe(browserSync.stream());
});


/* ----------------------
	jslint
---------------------- */
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


/* ----------------------
	js tasks
---------------------- */
gulp.task('scripts', ['lint'],  function() {
  return gulp.src([
	    paths.scripts
	])
        .pipe(sourcemaps.init())
  		.pipe(uglify())
  		.pipe(concat('app.min.js'))
    	.pipe(gulp.dest('./dist/js'))
    	.pipe(sourcemaps.write())
    	.pipe(browserSync.stream());
});


/* ----------------------
	watch && serve task
---------------------- */
gulp.task('serve', function() {

	browserSync.init({
        server: "./"
    });

	gulp.watch(paths.scss, ['scss']);
	gulp.watch(paths.scripts, ['scripts']);
})

/* ----------------------
	build task
---------------------- */
gulp.task('build', ['scss', 'scripts']);