import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vite-blog/",
  title: "vite-blog",
  description: "A VitePress Site",
  lastUpdated: true,
  srcDir: "src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/images/cat.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "note",
        items: [
          { text: "gulp", link: "/gulp" },
          { text: "vitepress", link: "/VitePress" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Augenstein10/vite-blog" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present Evan You",
    },
  },
  markdown: {
    lineNumbers: true,
  },
});
