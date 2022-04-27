module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{vue,js,ts,tsx,jsx}", // 那些文件
  ],
  darkMode: "class", // or 'media' or 'class'
  content: [],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textOpacity: ["dark"],
      backgroundColor: ["dark"],
    },
  },
};
