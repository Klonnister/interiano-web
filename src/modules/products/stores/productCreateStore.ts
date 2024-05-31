import type { Category } from "@/modules/shared/types/category.interface";
import type { Trademark } from "@/modules/shared/types/trademark.interface";
import { StorageSerializers, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, type Ref } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();

const NSerializer = {
  read: (v: any) => v === '' ? null : Number(v),
  write: (v: any) => v !== null ? String(v) : '',
}

export const useProductCreateStore = defineStore('productCreateStore', () => {
  // View info
  const currentView = ref(1);
  const loading = ref(false);
  const categories: Ref<Category[]> = ref([]);
  const trademarks: Ref<Trademark[]> = ref([]);

  // Form inputs
  const name: Ref<string> = useStorage('productCreateName', '');
  const image: Ref<string> = useStorage('productCreateImage', '');
  const size: Ref<string> = useStorage('productCreateSize', '');
  const description: Ref<string> = useStorage('productCreateDescription', '')
  const extraProps = useStorage('productCreateExtraProps', {}, undefined, {
    serializer: StorageSerializers.object,
  })
  const category: Ref<number|null> = useStorage(
    'productCreateCategory',
    null,
    undefined,
    { serializer: StorageSerializers.number }
  );
  const trademark: Ref<number|null> = useStorage(
    'productCreateTrademark',
    null,
    undefined,
    { serializer: StorageSerializers.number }
  );
  
  const stock: Ref<number|null> = useStorage(
    'productCreateStock',
    null,
    undefined,
    { serializer: NSerializer }
  );
  const price: Ref<number|null> = useStorage(
    'productCreatePrice', 
    null,
    undefined,
  { serializer: StorageSerializers.number }
);

  const resetCategory = () => {
    category.value = 0;
    localStorage.setItem('productCreateCategory', '0');
  }

  const resetTrademark = () => {
    trademark.value = 0;
    localStorage.setItem('productCreateTrademark', '0');
  }

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
          if(typeof stock.value !== 'number')
            toast.error('Agregue la cantidad de existencias.')

          if(String(stock.value).includes('.'))
            toast.error('Las existencias no pueden contener decimales.')

          return Boolean(
            typeof stock.value === 'number' && 
            !String(stock.value).includes('.')
          );
        case 3:
          
          return false;
        default: 
          return false;
      }
  }

  return {
    currentView, loading, categories, trademarks,
    name, category, trademark, image, size, stock, description,
    extraProps, price, validateView, resetCategory, resetTrademark
  }
})