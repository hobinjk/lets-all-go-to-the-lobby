var gulp = require('gulp'),
	bowerFiles = require('main-bower-files'),
	inject = require("gulp-inject");

// inject bower packages into index.html
function bowerInstall() {
  return gulp.src('./public/index.html')
  	.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
  	.pipe(gulp.dest('./public/'))
}

exports.bowerInstall = bowerInstall;
// register default task
exports.default = bowerInstall;
