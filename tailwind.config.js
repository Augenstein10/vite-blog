// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/src/**/*.js",
    "./docs/src/**/*.ts",
    "./docs/src/**/*.vue",
    "./docs/src/**/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
};
