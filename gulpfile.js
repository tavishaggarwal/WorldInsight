var gulp = require('gulp');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('styles', function() {
    //log('Compiling Less --> CSS');

    return gulp
        .src("public/less/*.less")
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest("public/css"));
});

gulp.task('less-watcher', function() {
    gulp.watch(["public/less/*.less"], ['styles']);
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