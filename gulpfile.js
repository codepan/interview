const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const config = require('./gitbook.config')

const output = config?.output || 'dist'

// 压缩html文件
gulp.task('minifyHtml', () => {
  const minifyOptions = {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  }
  return gulp.src(`${output}/**/*.html`)
  .pipe(htmlmin(minifyOptions))
  .pipe(gulp.dest(output))
})

// 压缩js文件
gulp.task('minifyJs', () => {
  const minifyOptions = {
    mangle: true,
    compress: true
  }
  return gulp.src(`${output}/**/*.js`)
  .pipe(uglify(minifyOptions))
  .pipe(gulp.dest(output))
})

// 压缩css文件
gulp.task('minifyCss', () => {
  return gulp.src(`${output}/**/*.css`)
  .pipe(cleanCss({rebase: false}))
  .pipe(gulp.dest(output))
})

// 压缩图片
gulp.task('minifyImage', () => {
  return gulp.src(`${output}/**/*.png`)
  .pipe(imagemin())
  .pipe(gulp.dest(output))
})


exports.default = gulp.series('minifyHtml', 'minifyJs', 'minifyCss', 'minifyImage')