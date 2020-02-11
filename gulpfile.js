'use strict';

const gulp = require('gulp'),
watch = require('gulp-watch'),
prefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
rigger = require('gulp-rigger'),
cclean = require('gulp-clean-css'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
rimraf = require('rimraf'),
tiny = require('gulp-tinypng'),
rename = require("gulp-rename"),
browserSync = require("browser-sync"),
terser = require('gulp-terser'),
reload = browserSync.reload;

const path = {
    siteName: { 
        html: './',
        js: 'js/',
        css: 'css/',
        img: 'images/',
        fonts: 'fonts/'
    },
    src: {
        html: 'src/*.html', 
        js: 'src/js/main.js',
        style: 'src/scss/main.scss',
        img: 'images/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './siteName'
};

const config = {
    server: {
        baseDir: "./"
    },
    // tunnel: true,
    host: 'localhost',
    port: 8081,
    logPrefix: "Frontend_Devil"
};

gulp.task('html', () => {
   return gulp.src(path.src.html) 
   .pipe(rigger()) 
   .pipe(gulp.dest('./'))
   .pipe(reload({stream: true})); 
});

gulp.task('js', () => {
    return  gulp.src(path.src.js) 
    .pipe(rigger()) 
    .pipe(sourcemaps.init()) 
    .pipe(terser()) 
    .pipe(sourcemaps.write())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(path.siteName.js)) 
    .pipe(reload({stream: true})); 
});
gulp.task('style', () => {
   return  gulp.src(path.src.style) 
   .pipe(sourcemaps.init()) 
   .pipe(sass()) 
   .pipe(prefixer()) 
   .pipe(cclean()) 
   .pipe(sourcemaps.write())
   .pipe(rename('app.min.css'))
   .pipe(gulp.dest('./css')) 
   .pipe(reload({stream: true}));
});
gulp.task('image', () => {
   return gulp.src(path.src.img) 
   .pipe(imagemin({ 
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()],
    interlaced: true
}))
   .pipe(gulp.dest(path.siteName.img))
   .pipe(reload({stream: true}));
});
gulp.task('fonts', () => {
   return  gulp.src(path.src.fonts)
   .pipe(gulp.dest(path.siteName.fonts))
});

gulp.task('tinypng', function () {
    gulp.src(path.src.img)
    .pipe(tiny('y6vBpNQt3CR2JSBRw1ZFDHpPXR84gKrR'))
    .pipe(gulp.dest('./images'));
});


gulp.task('watch', () => {
   gulp.watch('src/scss/**/*.scss', gulp.series('style')),
   gulp.watch('src/*.html', gulp.series('html')),
   gulp.watch('src/js/**/*.js', gulp.series('js')),
   gulp.watch('src/img/**/*.*', gulp.series('image')),
   gulp.watch('src/fonts/**/*.*', gulp.series('fonts'))
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('build', gulp.parallel('html', 'js', 'style', 'image', 'fonts'));

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));