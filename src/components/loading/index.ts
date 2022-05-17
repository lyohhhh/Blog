import { App } from "vue";
import Loading from "./loading";
export default {
  install(Vue: App) {
    Vue.component(Loading.name, Loading);
  },
};
