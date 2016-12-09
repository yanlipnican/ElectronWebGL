var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var exec = require('child_process').exec;
var gulpsync = require('gulp-sync')(gulp);
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var merge = require('gulp-merge');
var ts = require('gulp-typescript');

var onError = function (err) {  
  console.log(err.toString());
  this.emit('end');
};

var babelConfig = {
    presets : [
        "es2015",
        "es2017",
        "react"
    ],
    "plugins": [
        [
            "transform-runtime", {
                "polyfill": false,
                "regenerator": true
            }
        ]
    ]
}

var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
    return gulp.src('src/**/*.{tsx,ts}')
        .pipe(plumber({errorHandler: onError}))
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('less', function() {
  return gulp.src('src/**/*.less')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/**/*.js', ['babel']);
  gulp.watch('src/**/*.html', ['copy-html']);
  gulp.watch('src/**/*.{tsx,ts}', ['typescript']);
});

gulp.task('copy-html', function() {
    return gulp.src('src/**/*.html')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('babel', function() {
    return gulp.src('src/**/*.js')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(babel(babelConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('clear-dist', function() {
    exec('rm -rf dist');
});

gulp.task('run-electron', function() {
    exec('./node_modules/.bin/electron .');
});

gulp.task('build-assets', ['copy-html', 'typescript', 'less']);
gulp.task('build', gulpsync.sync(['clear-dist', 'build-assets']));
gulp.task('sync-build-launch', gulpsync.sync(['build', 'run-electron']));
gulp.task('default', ['sync-build-launch', 'watch']);