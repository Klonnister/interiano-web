import { createRouter, createWebHistory } from 'vue-router';
import TestView from '@/modules/test/views/TestView.vue';
import productRoutes from '@/modules/products/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: TestView,
    },
    {
      path: '/',
      component: () => import('@/modules/shared/layouts/MainLayout.vue'),
      children: [

        ...productRoutes,
        
      ],
    },
  ]
})

export default router
