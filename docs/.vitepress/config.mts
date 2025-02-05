import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 站点将部署到的 base URL。如果计划在子路径例如 GitHub 页面下部署站点，则需要设置此项。
  // 如果计划将站点部署到 https://foo.github.io/bar/，那么应该将 base 设置为 '/bar/'。
  // 它应该始终以 / 开头和结尾。
  base: "/vite-blog/",
  title: "vite-blog", // 设置标题
  description: "A VitePress Site", // 设置描述
  lastUpdated: true, // 根据git提交记录显示最近更新时间
  head: [["link", { rel: "icon", href: "/vite-blog/images/cat.png" }]], // 设置头部链接icon
  srcDir: "src", // 设置源文件目录
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/images/cat.png", //标题Logo
    nav: [
      {
        text: "Note",
        link: "/note/vitepress",
      },
      {
        text: "Live",
        link: "/live/live1",
      },
      // { text: "Examples", link: "/markdown-examples" },
    ],
    search: {
      provider: "local",
    },
    sidebar: {
      "/note/": [
        {
          text: "note",
          collapsed: true,
          items: [
            { text: "如何搭建部署一个VitePress博客", link: "/note/vitepress" },
            {
              text: "Gulp.js - 自动化构建工具",
              link: "/note/gulp",
            },
            {
              text: "VitePress集成tailwindcss",
              link: "/note/VitePress集成tailwindcss",
            },
            {
              text: "IntersectionObserver",
              link: "/note/IntersectionObserver",
            },
            {
              text: "Nuxt3代码规范搭建",
              link: "/note/Nuxt3代码规范",
            },
          ],
        },
      ],
      "/live/": [
        {
          text: "live",
          collapsed: true,
          items: [{ text: "live1", link: "/live/live1" }],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Augenstein10/vite-blog" },
    ],
    editLink: {
      pattern: "https://github.com/Augenstein10/vite-blog/tree/dev/docs/src",
      text: "Edit this page on GitHub",
    },
    lastUpdatedText: "最后更新于",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    sidebarMenuLabel: "目录",
    siteTitle: "LK Blog",
    returnToTopLabel: "返回顶部",
    // footer: {
    //   message: "Released under the MIT License.",
    //   copyright: "Copyright © 2025-present Evan You",
    // },
  },
  markdown: {
    lineNumbers: true,
  },
});
