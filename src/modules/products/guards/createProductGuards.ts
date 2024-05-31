import { createPinia } from "pinia";
import { useProductCreateStore } from '../stores/productCreateStore';
import router from "@/router";

const pinia = createPinia();
const createStore = useProductCreateStore(pinia);

export const createSecondaryGuard = () => {
  if(!createStore.validateView(1)) 
    router.push({ name: 'products-create-main' });
}

export const createPriceGuard  = () => {
  if(!createStore.validateView(1))
    router.push({ name: 'products-create-main' })
    
  else if( !createStore.validateView(2) )
    router.push({ name: 'products-create-secondary' })
}
