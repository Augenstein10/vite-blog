---
lastUpdated: true
---

Gulp 是一个基于 Node.js 的前端构建工具，主要用于任务自动化,它通过使用插件执行文件操作（如编译、压缩、合并等），帮助开发者优化和构建项目,其核心特点是基于流（Stream）的方式处理文件，使得操作高效且可组合。

# 工作原理：

1. 定义任务（Task），如压缩 CSS、压缩 JS 等。
2. 使用插件对文件进行处理。
3. 自动化运行任务。

# 主要特性：

1. 轻量化：专注于任务的执行，而非模块打包。
2. 插件丰富：拥有大量社区插件，支持各种文件操作。
3. 基于流：以流的方式处理文件，不需要生成临时文件。

# Vite、Webpack 与 Gulp 对比

|          | Gulp                                     | Webpack                                | Vite                                       |
| -------- | ---------------------------------------- | -------------------------------------- | ------------------------------------------ |
| 定位     | 任务执行工具                             | 模块打包工具                           | 开发服务器和现代化打包工具                 |
| 处理方式 | 基于流的文件操作，逐个任务执行           | 模块化打包，基于依赖关系分析生成依赖图 | 使用 ES Module，开发时直接加载模块         |
| 目标     | 文件优化和任务自动化                     | 构建整个项目，支持多种格式和工具链     | 提供极速开发环境及构建优化                 |
| 使用场景 | 任务自动化、单纯文件处理（如压缩、编译） | 模块化项目构建，适合复杂应用           | 现代化开发，适合前端框架开发（Vue、React） |

# gulp 常见用途

1. 合并多个 JS 文件成一个。
2. 压缩 CSS 和 JS 文件。
3. 优化图片。
4. 编译 Sass/Less。
5. 监听文件变更并实时刷新。

# gulp 的使用

## 安装命令行工具

最新版本的 gulp 是 4.x，和之前的 3.x 的 gulp 有所不同，把 cli 分离出去了，所以需要单独安装 gulp-cli

```batchfile
npm install --global gulp-cli
```

## 安装 gulp

```
npm install --save-dev gulp
```

## 检查是否安装成功

```typescript
gulp --version
// CLI version: 3.0.0
// Local version: 5.0.0
```

## 创建 gulpfile 文件

在项目大的根目录下创建一个名为 gulpfile.js 的文件，并在文件中输入以下内容：

```javascript
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask;
```

## 测试

```
gulp
```

## 输出结果(输出以下结果为运行成功了)

```
[10:26:54] Using gulpfile ~/Desktop/Project/demo/gulpfile.js
[10:26:54] Starting 'default'...
[10:26:54] Finished 'default' after 1.06 ms
```

    Gulp 允许你使用现有 JavaScript 知识来书写 gulpfile 文件，或者利用你所掌握的 gulpfile 经验来书写普通的 JavaScript 代码。虽然gulp 提供了一些实用工具来简化文件系统和命令行的操作，但是你所编写的其他代码都是纯 JavaScript 代码。

## 这是一个基本的 gulp 任务

```javascript
const { series } = require("gulp");

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
exports.default = series(clean, build);
```

    在以前的 gulp 版本中，task() 方法用来将函数注册为任务（task）。虽然这个 API 依旧是可以使用的，但是 导出（export）将会是主要的注册机制，除非遇到 export 不起作用的情况。

## 组合任务

    gulp提供了两个组合方法，分别是series()和parallel()，这两个方法都是用来接收任意数量的任务(task)，并且可以互相嵌套。

1. 使用 series 方法(对于希望让任务==按顺序执行==的时候使用)
2. 使用 parallel 方法(对于希望让任务以==最大并发来执行==的时候使用)

```javascript
const { series, parallel } = require("gulp");

function clean(cb) {
  // body omitted
  cb();
}

function cssTranspile(cb) {
  // body omitted
  cb();
}

function cssMinify(cb) {
  // body omitted
  cb();
}

function jsTranspile(cb) {
  // body omitted
  cb();
}

function jsBundle(cb) {
  // body omitted
  cb();
}

function jsMinify(cb) {
  // body omitted
  cb();
}

function publish(cb) {
  // body omitted
  cb();
}

exports.build = series(clean, cssTranspile); // series方法
// exports.build = parallel(clean, cssTranspile); // parallel方法
// exports.build = series( // 嵌套使用
//   clean,
//   parallel(
//     cssTranspile,
//     series(jsTranspile, jsBundle)
//   ),
//   parallel(cssMinify, jsMinify),
//   publish
// );
```

## 处理文件

**gulp 主要是通过 src()、pipe（）和 dest()来处理文件的，主要分为三个步骤，获取文件，处理文件，输出文件**

### **gulp.src(globs, [options])：文件输入。**

gulp.src() 是 Gulp 的源文件方法，用于指定需要处理的文件或文件集合。它定义了从哪里获取文件。

参数:

1. globs: 需要匹配的文件路径，可以使用 ‘ \* ’来匹配任意文件名，‘ ! ’来排除文件

```javascript
gulp.src("src/*.js"); // 匹配 src 目录下的所有 .js 文件
gulp.src(["src/**/*.js", "!src/ignore.js"]); // 排除 ignore.js
```

2.  options：可选参数，用于设置读取文件的行为。

        	read：指定是否读取文件内容(默认为true)

        	base：设置文件的基准路径，用于确定输出文件结构

```javascript
gulp.src("src/**/*.js", { base: "src" }); // 保留 src 目录结构
```

### ** [pipe](https://gulpjs.com/plugins/)(destination)：文件处理，==可以使用链式调用== **

pipe() 是 Gulp 的核心方法，用于将文件流传递到下一个处理步骤。它实现了文件的链式处理。

参数:

1. destination：下一个处理插件或输出目的地。

```javascript
const gulp = require("gulp");
const uglify = require("gulp-uglify"); //需要安装gulp-uglify插件
const rename = require("gulp-rename"); //需要安装gulp-rename插件

gulp.task("scripts", () => {
  return gulp
    .src("src/**/*.js")
    .pipe(uglify()) // 压缩 JavaScript
    .pipe(rename({ suffix: ".min" })) // 重命名文件后缀为 .min
    .pipe(gulp.dest("out")); // 输出文件的目标文件夹
});
```

### gulp.dest(path, [options])：文件输出

gulp.dest() 是文件输出方法，用于将处理后的文件保存到指定目录。

1. path：目标文件夹路径，用于保存处理后的文件。如果路径不存在，Gulp 会自动创建,文件的输出结构会根据 gulp.src() 的 base 设置确定
2. options：

   mode：设置文件权限（如 0o755）

   cwd：设置目标目录的工作路径

```javascript
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("styles", () => {
  return gulp
    .src("src/styles/**/*.scss", { base: "src" }) // 保留 src 目录结构
    .pipe(sass())
    .pipe(gulp.dest("dist")); // 输出到 dist 目录
});
```

在这个示例中：

- 源文件路径为 src/styles/main.scss。
- 输出文件路径为 dist/styles/main.css，因为 base 保留了原目录结构。

### 综合实例：

```javascript
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass")); // 需要安装gulp-sass插件
const cleanCSS = require("gulp-clean-css"); //需要安装gulp-clean-css插件
const uglify = require("gulp-uglify"); // 需要安装gulp-uglify插件
const imagemin = require("gulp-imagemin"); //需要安装gulp-imagemin插件

function styles() {
  return gulp
    .src("src/styles/**/*.scss") // 1. 获取源文件
    .pipe(sass().on("error", sass.logError)) // 2. 编译 SCSS
    .pipe(cleanCSS()) // 3. 压缩 CSS
    .pipe(gulp.dest("dist/styles")); // 4. 输出到目标文件夹
}

function scripts() {
  return gulp
    .src("src/scripts/**/*.js") // 1. 获取源文件
    .pipe(uglify()) // 2. 压缩 JS
    .pipe(gulp.dest("dist/scripts")); // 3. 输出到目标文件夹
}

function images() {
  return gulp
    .src("src/images/**/*") // 1. 获取图片源文件
    .pipe(imagemin()) // 2. 优化图片
    .pipe(gulp.dest("dist/images")); // 3. 输出优化后的图片
}

exports.default = gulp.parallel(styles, scripts, images);
```
