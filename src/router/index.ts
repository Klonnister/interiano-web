import { createRouter, createWebHistory } from 'vue-router';
import TestView from '@/modules/test/views/TestView.vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
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
      ...authRoutes,
      meta:{
        isAuthPage: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && store.isLogin === false) next('/sesion/inicio')
  else if(to.meta.isAuthPage && store.isLogin === true) next('/')
  else next()
})
export default router
