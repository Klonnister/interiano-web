import router from '@/router';
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
    beforeEnter: () => {
      const createStore = useProductCreateStore();
      if(!createStore.validateView(1)) 
        router.push({ name: 'products-create-main' });
    }
  },
  {
    path: 'precio',
    name: 'products-create-price',
    component: () => import('@/modules/products/components/CreatePrice.vue'),
    beforeEnter: () => {
      const createStore = useProductCreateStore();
      if(!createStore.validateView(1))
        router.push({ name: 'products-create-main' })
        
      else if( !createStore.validateView(2) )
        router.push({ name: 'products-create-secondary' })
    },
  },
  {
    path: '',
    redirect: { name: 'products-create-main' }
  }
]