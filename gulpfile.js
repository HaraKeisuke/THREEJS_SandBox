var plumber = require('gulp-plumber');
var typescript = require('gulp-typescript');
var watch = require('gulp-watch');
var gulp = require('gulp');

var tsProject = typescript.createProject('./src/tsconfig.json');
var appDir = './app/';
var tsFiles = './src/**/*.{ts,tsx}';
var resources = './src/**/*.{html,js,css,mp3,wav,jpg,png,jpeg,gif}';

gulp.task('ts:compile', function() {
  return gulp.src(tsFiles)
    .pipe(plumber())
    .pipe(typescript(tsProject))
    .pipe(gulp.dest(appDir));
});

gulp.task("static",function(){
  return gulp.src(resources)
    .pipe(gulp.dest(appDir));
});

// Auto compile
gulp.task('watch:ts', function() {
  watch(tsFiles, function() {
    gulp.run('ts:compile');
  });
});

gulp.task('watch:resource',function(){
  watch(resources,function(){
    gulp.run("static");
  });
});

gulp.task("default",['watch:ts','watch:resource','ts:compile','static']);
