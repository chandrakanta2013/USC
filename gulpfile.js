// Gulp.js configuration

var fs = require('fs'),
    gulp = require("gulp"),
    babel = require("gulp-babel"),
    minify = require('gulp-minify'),
    sass = require("gulp-sass"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rsync = require('gulp-rsync'),
    composer = require('gulp-composer'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require("gulp-sourcemaps"),
    babel = require("gulp-babel"), concat = require("gulp-concat");

//************ CSS ************//

gulp.task('compile-css:dev', function () {
    gulp.src('./src/assets/css_custom/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "> 1%", "Last 10 versions"
            ]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css_custom/'));

    gulp.src('./src/assets/css_custom/bootstrap.min.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "> 1%", "Last 10 versions"
            ]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css_custom/'));


});


gulp.task("sources", function () {
/*        return gulp.src("src/app.js")
     .pipe(sourcemaps.init())
     .pipe(babel())
     .pipe(concat("app.js"))
     .pipe(sourcemaps.write("."))
     .pipe(gulp.dest("dist/"));*/
});

gulp.task('copy', function () {
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dist/'))
    gulp.src(['./src/app.js'])
        .pipe(gulp.dest('./dist/'))
    gulp.src(['./src/howtoplay.html'])
        .pipe(gulp.dest('./dist/'))
    gulp.src(['./src/question.js'])
        .pipe(gulp.dest('./dist/'))
    gulp.src(['./src/resume.html'])
        .pipe(gulp.dest('./dist/'))
    gulp.src('./src/assets/audio/**/*')
        .pipe(gulp.dest('./dist/audio/'))
    gulp.src('./src/assets/css/**/*')
        .pipe(gulp.dest('./dist/css/'))
    gulp.src('./src/assets/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'))
    gulp.src('./src/assets/fonts_custom/**/*')
        .pipe(gulp.dest('./dist/fonts_custom/'))
    gulp.src('./src/assets/images/**/*')
        .pipe(gulp.dest('./dist/images/'))
    gulp.src('./src/assets/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
    gulp.src('./src/assets/js/**/*')
        .pipe(gulp.dest('./dist/js/'))
    gulp.src('./src/assets/template_files/**/*')
        .pipe(gulp.dest('./dist/template_files/'))
    gulp.src('./src/assets/vendor/**/*')
        .pipe(gulp.dest('./dist/vendor/'))
});

//************ DEV ************//

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {baseDir: './dist/'}
    });
});

//************ DEV ************//

gulp.task('watch', ['copy', 'sources', 'compile-css:dev', 'browser-sync'], function () {
    /*    gulp.watch('src/js/site.js', ['sources']);
     gulp.watch('src/css/style.scss', ['compile-css:dev']);
     gulp.watch('src/css/flip-card-style.scss', ['compile-css:dev']);
     gulp.watch('src/css/mashup.css', ['copy']);
     gulp.watch('src/index.html', ['copy']);
     gulp.watch('src/img/!**!/!*', ['copy']);*/
});

gulp.task('build', ['copy', 'sources', 'compile-css:dev',]);

//************ STAGING/PRODUCTION ************//

gulp.task('push-to-server', function () {
    gulp.src('./dist/')
        .pipe(rsync({
            root: './dist/',
            hostname: process.env.SSH_IP,
            username: process.env.SSH_USERNAME,
            destination: process.env.SSH_DESTINATION,
            recursive: true,
            emptyDirectories: true,
            clean: true,
            silent: true,
            exclude: [
                '.bowerrc',
                '.git',
                '.idea',
                '.env',
                '.env-example',
                '.bower.json',
                'composer.*',
                'gulpfile.js',
                'package.json',
                'README.MD',
                '*.scss',
                './**/.cass-cache',
                'node_modules/**'
            ]
        }));
});