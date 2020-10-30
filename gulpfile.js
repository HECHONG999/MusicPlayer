const {series, src, dest, watch} = require('gulp');
const htmlClean = require('gulp-htmlclean');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const connent = require('gulp-connect');
const folder = {
    src: 'src/',
    dist: 'dist/'
}


function html (cb) {
    // 压缩html代码
    return src(folder.src + 'html/*')
            .pipe(htmlClean())
           .pipe(dest(folder.dist + 'html/'))
           .pipe(connent.reload())   // 修改文件 然后自动监听
}

function css (cb) {
    return src(folder.src + 'css/*')
            .pipe(less())  // 把less文件转为css文件
            .pipe(cleanCss()) // 压缩css文件
            .pipe( dest(folder.dist + 'css/'))
            .pipe(connent.reload())
}

function js (cb) {
    return src(folder.src + 'js/*')
            .pipe(stripDebug())
            .pipe(uglify())
           .pipe(dest(folder.dist + 'js/'))
           .pipe(connent.reload())
}

function images(cb) {
    return src( folder.src + 'images/*.jpg')
            .pipe(imagemin())
            .pipe( dest(folder.dist + 'images/'))
}
function server (cb) {
    connent.server({
        port: "1573",
        liveeload: true,  // 自动刷新
    })

    cb()
}

watch(folder.src+'html/*', function (cb) {
    html();
    cb();
})
watch(folder.src+'css/*', function (cb) {
    css();
    cb();
})
watch(folder.src+'js/*', function (cb) {
    js();
    cb();
})
exports.default = series(html, css, js, images, server);