//New Sept 2024
const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require("gulp-postcss");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const postcssImport = require("postcss-import");
const sourcemaps = require("gulp-sourcemaps");
const minifyHTML = require("gulp-htmlmin");
const browserSync = require('browser-sync');
const cachebust = require('gulp-cache-bust');
const fileInclude = require('gulp-file-include');
const newer = require('gulp-newer');

const server = browserSync.create();

const paths = {
  js: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  },
  css: {
    src: 'src/css/style.css',
    dest: 'dist/css/'
  },
  html: {
    src:  "src/**/*.+(html|htm)",
    dest: "dist"
  },
  img: {
    src: "src/img/**/*.+(jpg|jpeg|png|svg|avif)",
    dest: "dist/img/"
  },
  fonts: {
    src: "src/fonts/**/*.+(woff|woff2|ttf|otf|eot)",
    dest: "dist/fonts/"
  }
};

function css(){
  var plugins=[
    postcssImport(),
    autoprefixer({overrideBrowserslist: ['last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Safari versions', 'last 2 Edge versions']})
  ]
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init() )
    .pipe( postcss(plugins) )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.') )
    .pipe(gulp.dest(paths.css.dest) )
}
exports.css = css;

function js() {
  return gulp.src(paths.js.src, { sourcemaps: true })
    .pipe(terser({
      ecma: 2020,
      compress: {
        passes: 2
      },
      format: {
        comments: false
      }
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(paths.js.dest));
}
exports.js = js;

function img() {
  return gulp.src(paths.img.src, {encoding: false})
    .pipe(newer(paths.img.dest))
    .pipe(gulp.dest(paths.img.dest));
}
exports.img = img;

function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest));
}
exports.fonts = fonts;

function html() {
    return gulp.src(paths.html.src)
        .pipe(fileInclude({
            prefix: '@@',
            basepath: 'src'
        }))
        .pipe(cachebust({ type: 'timestamp' }))
        .pipe(minifyHTML({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest));
}
exports.html = html;

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: "./dist"
    }
  });
  done();
}

const watch = () => {
  gulp.watch('src/**/*.+(html|htm)', gulp.series(html, reload));
  gulp.watch('src/css/**/*.css', gulp.series(css, html, reload));
  gulp.watch('src/js/**/*.js', gulp.series(js, reload));
  gulp.watch('src/img/**/*', gulp.series(img, reload));
  gulp.watch('src/fonts/**/*', gulp.series(fonts, reload));
};

const dev = gulp.series(html, css, js, img, fonts, serve, watch);
exports.default=dev;
