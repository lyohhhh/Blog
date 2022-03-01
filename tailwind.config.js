module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{vue,js,ts,tsx,jsx}", // 那些文件
  ],
  darkMode: "class", // 暗黑模式
  content: [],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textOpacity: ["dark"],
    },
  },
  plugins: [],
};
