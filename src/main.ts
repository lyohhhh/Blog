import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/reset.css";
const app = createApp(App);
app.use(router).mount("#app");
