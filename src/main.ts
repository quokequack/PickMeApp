import { createApp } from 'vue'
import pinia from "./stores";
import { vuetify } from './plugins/vuetify'
import { router } from './router';
import './style.css'
import App from './App.vue'
import "@mdi/font/css/materialdesignicons.min.css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);


app.mount('#app')
