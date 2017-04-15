var gulp = require('gulp');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});
var path = require('path'),
wrap = require('gulp-wrap'),
declare = require('gulp-declare'),
concat = require('gulp-concat'),
    handlebars = require('gulp-handlebars');

gulp.task('styles', function() {
    //log('Compiling Less --> CSS');

    return gulp
        .src("public/less/*.less")
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest("public/css"));
});

gulp.task('watcher', function() {
    gulp.watch(["public/less/*.less"], ['styles']);
    gulp.watch('public/templates/*.hbs', ['templates']);
});

gulp.task('templates', function () {
  gulp.src('public/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'WorldInsight.templates',
      noRedeclare: true,
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/javascript/'));
});

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}