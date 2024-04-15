import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/md-dark-deeppurple/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(vuetify)
app.use(router)

app.mount('#app')
