---
lastUpdated: true
---

VitePress 是一个[静态站点生成器](https://en.wikipedia.org/wiki/Static_site_generator) (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

# 安装

- node 版本需要>18

### 1. 前置准备

```sh
pnpm add -D vitepress
```

### 2. 安装向导

```sh
pnpm vitepress init
```

### 3. 根据提示回答问题完成向导

```sh
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
└
```

### 4.完成后项目结构

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

### 5.启动

```sh
pnpm run docs:dev
```

# 部署到 github page

1. 编写部署脚本
   在项目的  `.github/workflows`  目录中创建一个名为  `deploy.yml`  的文件，内容如下

```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程

#

name: Deploy VitePress site to Pages


on:

# 在针对 `main` 分支的推送上运行。如果你

# 使用 `master` 分支作为默认分支，请将其更改为 `master`

push:

branches: [dev]


# 允许你从 Actions 选项卡手动运行此工作流程

workflow_dispatch:


# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages

permissions:

contents: read

pages: write

id-token: write



# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列

# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成

concurrency:

group: pages

cancel-in-progress: false



jobs:

# 构建工作

build:

runs-on: ubuntu-latest

steps:

- name: Checkout

uses: actions/checkout@v4

with:

fetch-depth: 0 # 如果未启用 lastUpdated，则不需要

- uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消此区域注释

with:

version: 9

# - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释

- name: Setup Node

uses: actions/setup-node@v4

with:

node-version: 20

cache: pnpm # 或 pnpm / yarn

- name: Setup Pages

uses: actions/configure-pages@v4

- name: Install dependencies

run: pnpm install # 或 pnpm install / yarn install / bun install

- name: Build with VitePress

run: pnpm docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build

- name: Upload artifact

uses: actions/upload-pages-artifact@v3

with:

path: docs/.vitepress/dist



# 部署工作

deploy:

environment:

name: github-pages

url: ${{ steps.deployment.outputs.page_url }}

needs: build

runs-on: ubuntu-latest

name: Deploy

steps:

- name: Deploy to GitHub Pages

id: deployment

uses: actions/deploy-pages@v4
```

2. 添加.gitignore 文件

```gitignore
node_modules
docs/.vitepress/cache
docs/.vitepress/dist
```

3. 将代码 push 到 github 仓库
4. 在存储库设置中的“Pages”菜单项下，选择“Build and deployment > Source > GitHub Actions”
5. 将更改推送到  `main`  分支并等待 GitHub Action 工作流完成。你应该看到站点部署到  `https://<username>.github.io/[repository]/`  或  `https://<custom-domain>/`，这取决于你的设置。你的站点将在每次推送到  `main`  分支时自动部署。

最后如果出现 css 样式 404 的问题，需要到.vitepress 目录下的 config 文件，添加 css 请求 base 路径

```js
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/vite-blog/", //添加这行，即 /repository/

  title: "vite-blog",

  //...........
});
```
