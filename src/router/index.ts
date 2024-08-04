import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useLayoutStore } from '../modules/shared/stores/layoutStore';
import TestView from '@/modules/test/views/TestView.vue';
import authRoutes from "@/modules/auth/router/authRoutes";
import productRoutes from '@/modules/products/router';
import categoryRoutes from '@/modules/categories/router';
import trademarkRoutes from '@/modules/trademarks/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'auth',
      meta:{ isAuthPage: true },
      ...authRoutes,
    },

    {
      path: '/dev',
      name: 'dev',
      component: TestView
    },

    {
      path: '/',
      component: () => import('@/modules/shared/layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [

        ...productRoutes,
        ...categoryRoutes,
        ...trademarkRoutes,
        
      ],
    },
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && store.isLogged === false) next({ name: 'login' })
  else if(to.meta.isAuthPage && store.isLogged === true) next({ name: 'products' })
  else {
    const layoutStore = useLayoutStore();
    layoutStore.resetLayout();
    next()
  }
})
export default router
