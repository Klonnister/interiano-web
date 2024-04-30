import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/modules/test/views/TestView.vue'

import authRoutes from "@/router/authRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestView
    },
    ...authRoutes
  ]
})

export default router
