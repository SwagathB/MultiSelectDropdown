var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});
var conf = require('./gulp.config.js')();

gulp.task('vet', function () {
    log('swagatham');
    return gulp.src(conf.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jscs())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));

});

gulp.task('clean-scripts', function () {
    return gulp.src('./tmp/*.js', {read: false})
        .pipe($.clean());
});
gulp.task('templates', ['clean-scripts'],function () {
    log('template caching')
    return gulp.src(conf.htmltemplates)
        .pipe($.angularTemplatecache(
            'templates.js',
            {
                module: 'utilities',
                standAlone: false,
                transformUrl:function(url){
                    log(url);
                    log(url.lastIndexOf("\\")+1);
                    return url.substring(url.lastIndexOf("\\")+1);
                }
            }
        ))
        .pipe(gulp.dest('./tmp'));
})

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = conf.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src('./views/index.html')
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(['./Scripts/Component/app.js','./tmp/*.js','./Scripts/Component/MultiSelect/*.js','./Scripts/demoApp.js'])))
        .pipe(gulp.dest('./views'));
});


function log(msg) {
    $.util.log($.util.colors.green(msg));
}