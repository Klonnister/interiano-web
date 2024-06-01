import router from '@/router';
import { type RouteLocation } from 'vue-router';
import productCreateRoutes from './productCreateRoutes';

export default [
  {
    path: 'productos',
    name: 'products',
    component: () => import('@/modules/products/views/ProductsView.vue'),
  },
  
  {
    path: 'productos/crear',
    component: () => import('@/modules/products/views/ProductCreate.vue'),
    children: [ ...productCreateRoutes ],
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
