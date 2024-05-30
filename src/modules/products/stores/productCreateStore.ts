import type { Category } from "@/modules/shared/types/category.interface";
import type { Trademark } from "@/modules/shared/types/trademark.interface";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, type Ref } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();

export const useProductCreateStore = defineStore('productCreateStore', () => {
  // View info
  const currentView = ref(1);
  const loading = ref(false);
  const categories: Ref<Category[]> = ref([]);
  const trademarks: Ref<Trademark[]> = ref([]);

  // Form inputs
  const name: Ref<string> = useStorage('productCreateName', '');
  const category: Ref<number> = useStorage('productCreateCategory', 0);
  const trademark: Ref<number> = useStorage('productCreateTrademark', 0);
  const image: Ref<string> = useStorage('productCreateImage', '');
  const size: Ref<string> = useStorage('productCreateSize', '');
  const stock: Ref<number|null> = useStorage('productCreateStock', null);
  const description: Ref<string> = useStorage('productCreateDescription', '');
  const extraProps = useStorage('productCreateExtraProps', {})
  const price: Ref<number|null> = useStorage('productCreatePrice', null);

  const validateView = (id: number) => {
      switch(id) {
        case 1:
          if(!category.value)
            toast.error('Seleccione una categoría.')
          else if(!trademark.value)
            toast.error('Seleccione una marca.')
          else if(!name.value)
            toast.error('Ingrese un nombre para el producto.')
          else if(!image.value)
            toast.error('Escoja una imagen para el producto.')
          
          return Boolean(category.value && trademark.value && name.value && image.value);
        case 2: 
          if(!stock.value)
            toast.error('Agregue la cantidad de existencias.')

          return Boolean(stock.value)
        case 3:
          return false;
        default: 
          return false;
      }
  }

  return {
    currentView, loading, categories, trademarks,
    name, category, trademark, image, size, stock, description,
    extraProps, price, validateView,
  }
})