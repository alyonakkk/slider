const path = {
    src: {
        html: ['src/*.html', '!' + 'src/_*.html'],
        scss: 'src/scss/style.scss',
        js: 'src/js/script.js',
        img: 'src/img/**/*.{png,jpg,jpeg,svg}'
    },

    build: {
        html: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/'
    },

    watch: {
        html: 'src/**/*.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.{png,jpg,jpeg,svg}'
    }
}

let { src, dest } = require('gulp');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let fileInclude = require('gulp-file-include');
let scss = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
let mediaCss = require('gulp-group-css-media-queries');
let cleanCss = require('gulp-clean-css');
let uglify = require('gulp-uglify-es').default;
let rename = require('gulp-rename');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './dist/'
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.scss)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(
            autoPrefixer({
                overrideBrowserslist: ['last 3 versions'],
                cascade: true
            })
        )
        .pipe(mediaCss())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function img() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.src.img], img);
}

let build = gulp.parallel(html, css, js, img);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;