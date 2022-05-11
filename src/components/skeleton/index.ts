import { App } from "vue";
import Skeleton from "./skeleton";

export default {
  install: (Vue: App) => {
    Vue.component(Skeleton.name, Skeleton);
  },
};
