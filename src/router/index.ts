import { createRouter, createWebHistory } from 'vue-router';
import TestView from '@/modules/test/views/TestView.vue';
import productRoutes from '@/modules/products/router'

import authRoutes from "@/modules/auth/router/authRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: TestView
    },

    {
      path: '/',
      component: () => import('@/modules/shared/layouts/MainLayout.vue'),
      children: [

        ...productRoutes,
        
      ],
      meta: {
        requiresAuth: true
      }
    },

    {
      name: 'auth',
      ...authRoutes
    }
  ]
})

// const xd = 'si'
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/sesion/inicio' && xd === 'si') next('/sesion/inicio')
//   else next()
// })
export default router
