import './assets/main.css'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-teal/theme.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import toastOptions from './plugins/toastOptions'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

const vfm = createVfm();
const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(vfm)
app.use(Toast, toastOptions)
app.use(router)

const auth = useAuthStore()
auth.setSession()

app.mount('#app')
