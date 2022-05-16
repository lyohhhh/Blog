import { App } from "vue";
import Button from "./button";

export default {
  install(Vue: App) {
    Vue.component(Button.name, Button);
  },
};
