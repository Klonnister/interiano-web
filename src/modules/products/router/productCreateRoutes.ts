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
      createStore.loading = true;

      if(!createStore.validateView(1)) {
        router.push({ name: 'product-create-main' });
        createStore.loading = false;
      }
    }
  },
  {
    path: 'precio',
    name: 'product-create-price',
    component: () => import('@/modules/products/components/ProductCreateViewPrice.vue'),
    beforeEnter: () => {
      const createStore = useProductCreateStore();
      createStore.loading = true;

      if(!createStore.validateView(1)) {
        router.push({ name: 'product-create-main' });
        createStore.loading = false;
      }
        
      else if( !createStore.validateView(2) ) {
        router.push({ name: 'product-create-secondary' });
        createStore.loading = false;
      }
    },
  },
  {
    path: 'design',
    name: 'product-create-design',
    component: () => import('@/modules/products/components/ProductCreateViewDesign.vue'),
    beforeEnter: () => {
      const createStore = useProductCreateStore();
      createStore.loading = true;
      
      if(!createStore.validateView(1)) {
        router.push({ name: 'product-create-main' });
        createStore.loading = false;
      }
        
      else if( !createStore.validateView(2) ) {
        router.push({ name: 'product-create-secondary' });
        createStore.loading = false;
      }

      else if( !createStore.validateView(3) ) {
        router.push({ name: 'product-create-price' });
        createStore.loading = false;
      }
    },
  },
  {
    path: '',
    redirect: { name: 'product-create-main' }
  }
]