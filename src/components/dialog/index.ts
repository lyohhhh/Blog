import { App } from "vue";
import Dialog from "./dialog";
export default {
  install(Vue: App) {
    Vue.component(Dialog.name, Dialog);
  },
};
