import { App } from "vue";
import Masker from "./masker";
export default {
  install(Vue: App) {
    Vue.component(Masker.name, Masker);
  },
};
