import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './styles/index.css';
import './styles/reset.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router);

router.isReady().then(() => {
	app.mount('#app');
});
