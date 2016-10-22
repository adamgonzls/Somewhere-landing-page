// var gulp = require('gulp');
// var autoprefixer = require('gulp-autoprefixer');

// gulp.task('styles', function() {
// 	gulp.src('css/styles.css')
// 	.pipe(autoprefixer())
// 	.pipe(gulp.dest('build'))
// });

// gulp.task('watch', function() {
// 	gulp.watch('css/styles.css', ['styles']);
// });

// gulp.task('default', ['watch']);

var gulp 					= require('gulp');
var browserSync 	= require('browser-sync').create();
var sass 					= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');

// static server + watch scss/html files
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: "./"
	});

	gulp.watch("./sass/*.scss", ['sass']);
	gulp.watch("./js/*.js").on('change', browserSync.reload);
	gulp.watch("./*.html").on('change', browserSync.reload);
});

// compile sass & auto-inject into browsers

//sass
gulp.task('sass', function() {
	return gulp.src('./sass/*.scss')
	.pipe(sass().on('error', sass.logError))
//pipe to autoprefixer
	.pipe(autoprefixer({
		browsers: ['last 5 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);