VitePress 是一个基于 Vite 的静态站点生成器，专注于文档和博客的快速构建。而 taiwindcss 是一个用于快速构建现代网站的 CSS 框架,支持与 vite 一起使用，可以快速构建现代网站。

## 添加依赖

```sh
pnpm add tailwindcss tailwindcss postcss autoprefixer -D
```

## 生成 taiwindcss.config.js 文件

```sh
npx tailwindcss init / 或 pnpm dlx tailwindcss init
```

## 修改 taindcss.config.js 文件

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    //覆盖路径，看是否有配置 srcDir 源文件目录，来编写路径。
    "./docs/src/**/*.js",
    "./docs/src/**/*.ts",
    "./docs/src/**/*.vue",
    "./docs/src/**/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
};
```

## 将 Tailwind 指令添加到您的 CSS 中

1. 新建一个 style.css 文件

```css
/* docs/.vitepress/theme/style.css  */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. 导入到 index.ts 中

```ts
/*  docs/.vitepress/theme/index.ts  */
import DefaultTheme from "vitepress/theme";
import "./style.css"; //导入

export default DefaultTheme;
```
