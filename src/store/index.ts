import { createStore } from "vuex";

// webpack -> require.context
// vite -> import.meta.globEager

const modulesFiles = import.meta.globEager("./modules/**/*.ts");

// 存储 Modules
const modules: any = {};

// 自动注册 Modules Store
for (const key in modulesFiles) {
  if (Object.prototype.hasOwnProperty.call(modulesFiles, key)) {
    modules[key.replace(/^\.\/(.*)\.\w+$/, "$1").replace(/modules\//g, "")] =
      modulesFiles[key].default;
  }
}

export default createStore({
  modules,
});
