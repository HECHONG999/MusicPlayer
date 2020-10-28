// function defaultTask(cb) {
    // place code for your default task here
//     console.log("何冲")
//     cb();
//   }
  
//   exports.default = defaultTask

/**
 * series: 执行多个任务
 */
// const {series, parallel} = require('gulp');
// console.log(series, parallel )

// function fn1(cb) {
//     console.log("fn1被调用了");
//     cb()
// }

// function fn2 (cb) {
//     console.log("fn2被调用了")
//     cb();
// }
// exports.build = fn1;
// exports.default = series(fn1,fn2);  // series一次执行fn1 fn2 任务， gulp执行之后会去找default这个值


// function js(cb) {
//     console.log("js被执行完了");
//     cb()
// }

// function css(cb) {
//     console.log("css被执行完了");
//     cb();
// }
// function html(cb) {
//     console.log("html被执行完了")
//     cb()
// }

// exports.default = series(js, css);  // 依次添加执行任务
// exports.default = parallel(js, css);  // 先把任务添加到管道内，后一起执行


// 处理文件
/**
 * src: 获取文件路径
 * dest：处理文件的方法--管道思想：流操作
 */
const {src, dest} = require('gulp');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
// IO 操作
// less --> css -- css加上css3的前缀  --> 压缩 --> 输出
exports.default = function () {
    return src('src/js/*.js') // 所有js文件夹的js文件
            .pipe(dest('dis/js'))
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))

            .pipe(dest('dis/js'))
}


// 文件监控： 引入的任务和操作进行关联
const { watch } = require('gulp');
watch('src/css/*', {}, function (cb) {
    console.log("文件被修改了");
    cb()
})


