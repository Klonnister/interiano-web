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
import { primeVueOptions } from './plugins/primeVueOptions'

const vfm = createVfm();
const app = createApp(App)

app.use(PrimeVue, primeVueOptions)
app.use(vfm)
app.use(Toast, toastOptions)
app.use(createPinia())
app.use(router)

app.mount('#app')

const auth = useAuthStore()
auth.setSession()
