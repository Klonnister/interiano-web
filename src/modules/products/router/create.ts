import router from '@/router';
import { type RouteLocation } from 'vue-router';
import { useProductCreateStore } from '../stores/productCreateStore';

export default [
  {
    path: 'info-principal',
    name: 'products-create-main',
    component: () => import('@/modules/products/components/CreateMainInfo.vue')
  },
  {
    path: 'info-secundaria',
    name: 'products-create-secondary',
    component: () => import('@/modules/products/components/CreateSecondaryInfo.vue'),
    beforeEnter: (to: RouteLocation, from: RouteLocation) => {
      const previousRoute = String(from.name);
      const createStore = useProductCreateStore();

      if(
        !previousRoute.includes('products-create') && 
        !createStore.validateView(1)
      ) 
        router.push({ name: 'products-create-main' })

      else if(!createStore.validateView(1))
        return false;
    },
  },
  {
    path: 'precio',
    name: 'products-create-price',
    component: () => import('@/modules/products/components/CreatePrice.vue'),
    beforeEnter: (to: RouteLocation, from: RouteLocation) => {
      const previousRoute = String(from.name);
      const createStore = useProductCreateStore();

      if(
        !previousRoute.includes('products-create') && 
        !createStore.validateView(1)
      ) 
        router.push({ name: 'products-create-main' })
      
      else if(
        !previousRoute.includes('products-create') && 
        !createStore.validateView(2)
      ) 
        router.push({ name: 'products-create-secondary' })

      else if(!createStore.validateView(1))
        return false;
        
      else if(
        !previousRoute.includes('products-create-secondary') && 
        !createStore.validateView(2)
      )
        router.push({ name: 'products-create-secondary' })

      else if(!createStore.validateView(2))
        return false;
      
    },
  },
  {
    path: '',
    redirect: { name: 'products-create-main' }
  }
]
