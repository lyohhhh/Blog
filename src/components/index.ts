import type { App, Component } from "vue";

import Aside from "./aside/aside";
import Button from "./button/button";
import Dialog from "./dialog/dialog";
import Icon from "./icon/icon";
import Masker from "./masker/masker";
import Skeleton from "./skeleton/skeleton";
import LoadingMore from "./loading/loading";

export default {
  [Aside.name]: Aside,
  [Dialog.name]: Dialog,
  [Button.name]: Button,
  [Icon.name]: Icon,
  [Masker.name]: Masker,
  [Skeleton.name]: Skeleton,
  [LoadingMore.name]: LoadingMore,
} as {
  [componentName: string]: Component;
};

// export default {
//   install(Vue: App) {
//     for (const key in components) {
//       Vue.component(key, components[key]);
//     }
//   },
// };
