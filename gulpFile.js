var gulp = require("gulp")
var webserver = require("gulp-webserver")
var browserify = require("browserify")
var watchify = require('watchify')
var source = require('vinyl-source-stream')
var livereload = require('gulp-livereload')

gulp.task("move-files", function() {
  return gulp.src("app/*.html")
    .pipe(gulp.dest("build"))
})

gulp.task("build-app", function() {
  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source("main.js"))
      .pipe(gulp.dest("./build"))
      .pipe(livereload())
  }

  var bundler = browserify("./app/main.js", watchify.args)
  bundler.on("update", bundle)
  bundler = watchify(bundler)

  return bundle()
})

gulp.task("webserver", ["move-files", "build-app"], function() {
  return gulp.src("build")
    .pipe(webserver({
      livereload: true
    }))
})

gulp.task("default", ["move-files", "webserver"])