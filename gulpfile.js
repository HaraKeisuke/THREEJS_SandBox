var plumber = require('gulp-plumber');
var typescript = require('gulp-typescript');
var watch = require('gulp-watch');
var gulp = require('gulp');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

var tsProject = typescript.createProject('./tsconfig.json');
var appDir = './app/';
var tsFiles = './src/*.{ts,tsx}';
var resources = './src/**/*.{html,js,css,mp3,wav,jpg,png,jpeg,gif}';

var webserver = require('gulp-webserver');

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

gulp.task('ts:compile', function () {
    return browserify({
        entries: './src/main.ts'
    }).plugin('tsify')
        .bundle()
        .on('error', function(){})
        .pipe(plumber())
        .pipe(source('main.js'))
        .pipe(gulp.dest('./app/'));
});

gulp.task('compress', () => {
    return gulp.src('./app/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('./bin/'));
});

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(plumber())
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});


gulp.task("default",['watch:ts','watch:resource','ts:compile','static',"webserver"]);
