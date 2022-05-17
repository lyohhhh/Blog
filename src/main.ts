import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/index.css";
import "./styles/reset.css";

import Icon from "./components/icon";
import Aside from "./components/aside";
import Button from "./components/button";

const pinia = createPinia();
const app = createApp(App);

app.use(Button).use(Aside).use(Icon).use(pinia).use(router);

router.isReady().then(() => {
  app.mount("#app");
});
