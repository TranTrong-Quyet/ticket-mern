/** @type {import('tailwindcss').Config} */
import primeui from "tailwindcss-primeui";
import vueform from "@vueform/vueform/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./vueform.config.js", // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.vue",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.js",
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [primeui, vueform, require("flowbite/plugin")],
};
