import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-teal/theme.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import toastOptions from './plugins/toastOptions'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(Toast, toastOptions)
app.use(router)

app.mount('#app')
