import { App } from "vue";
import Icon from "./icon";

export default {
  install: (Vue: App) => {
    Vue.component("IconFont", Icon);
  },
};
