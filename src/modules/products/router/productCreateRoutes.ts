import router from '@/router';
import { useProductCreateStore } from '../stores/productCreateStore';

export default [
  {
    path: 'info-principal',
    name: 'product-create-main',
    component: () => import('@/modules/products/components/ProductCreateViewMain.vue')
  },
  {
    path: 'info-secundaria',
    name: 'product-create-secondary',
    component: () => import('@/modules/products/components/ProductCreateViewSecondary.vue'),
    beforeEnter: () => {
      const createStore = useProductCreateStore();
      if(!createStore.validateView(1)) 
        router.push({ name: 'product-create-main' });
    }
  },
  {
    path: 'precio',
    name: 'product-create-price',
    component: () => import('@/modules/products/components/ProductCreateViewPrice.vue'),
    beforeEnter: () => {
      const createStore = useProductCreateStore();
      if(!createStore.validateView(1))
        router.push({ name: 'product-create-main' })
        
      else if( !createStore.validateView(2) )
        router.push({ name: 'product-create-secondary' })
    },
  },
  {
    path: 'design',
    name: 'product-create-design',
    component: () => import('@/modules/products/components/ProductCreateViewDesign.vue'),
    beforeEnter: () => {
      const createStore = useProductCreateStore();
      if(!createStore.validateView(1))
        router.push({ name: 'product-create-main' })
        
      else if( !createStore.validateView(2) )
        router.push({ name: 'product-create-secondary' })

      else if( !createStore.validateView(3) )
        router.push({ name: 'product-create-price' })
    },
  },
  {
    path: '',
    redirect: { name: 'product-create-main' }
  }
]