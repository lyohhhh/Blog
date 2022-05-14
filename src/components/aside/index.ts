import { App } from "vue";
import Aside from "./aside";

export default {
  install: (Vue: App) => {
    Vue.component(Aside.name, Aside);
  },
};
