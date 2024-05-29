import router from '@/router';
import { type RouteLocation } from 'vue-router';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import type { CustomRoute } from '@/modules/shared/types/router.interface';

export default [
  {
    path: 'productos',
    name: 'products',
    component: () => import('@/modules/products/views/ProductsView.vue'),
    beforeEnter: (to: CustomRoute, from: CustomRoute) => {
      if (from.name) {
        if(!from.name.includes('product')) {
          const filterStore = useFilterStore();  
          filterStore.clearFilters();
        }
      }
    },
  },
  {
    path: 'productos/crear',
    component: () => import('@/modules/products/views/ProductCreate.vue'),
    children: [
      {
        path: 'info-principal',
        name: 'products-create-main',
        component: () => import('@/modules/products/components/CreateMainInfo.vue')
      },
      {
        path: '',
        redirect: { name: 'products-create-main' }
      }
    ]
  },
  {
    path: 'productos/:id',
    name: 'product-id',
    component: () => import('@/modules/products/views/ProductId.vue'),
    props: (route: RouteLocation) => {
      const { id } = route.params
      if (isNaN(Number(id))) router.push({ name: 'products' })
      
      return { id }
    }
  },
  {
    path: '',
    redirect: { name: 'products' },
  },
]
