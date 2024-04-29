import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/modules/test/views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestView
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/modules/auth/views/AuthView.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/modules/auth/components/LogInComponent.vue')
        },
        {
          path: 'signup',
          component: () => import('@/modules/auth/components/SignupComponent.vue')
        }
      ]
    }
  ]
})

export default router
