import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './styles/index.css';
import './styles/reset.css';

import Components from '@/components';

const pinia = createPinia();
const app = createApp(App);

app.use(Components).use(pinia).use(router);

router.isReady().then(() => {
	app.mount('#app');
});
