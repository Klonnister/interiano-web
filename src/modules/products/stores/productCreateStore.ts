import { NSerializer } from "@/modules/shared/helpers/nSerializer";
import type { Category } from "@/modules/shared/types/category.interface";
import type { Trademark } from "@/modules/shared/types/trademark.interface";
import { StorageSerializers, useStorage } from "@vueuse/core";
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
    { serializer: NSerializer }
  );
  const trademark: Ref<number|null> = useStorage(
    'productCreateTrademark',
    null,
    undefined,
    { serializer: NSerializer }
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
    { serializer: NSerializer }
  );
  const sale: Ref<boolean> = useStorage(
    'productCreateSale', 
    false,
    undefined,
    { serializer: StorageSerializers.boolean }
  );
  const discontinued: Ref<boolean> = useStorage(
    'productCreateDiscontinued', 
    false,
    undefined,
    { serializer: StorageSerializers.boolean }
  );
  const salePrice: Ref<number|null> = useStorage(
    'productCreateSalePrice', 
    null,
    undefined,
    { serializer: NSerializer }
  );
  const design: Ref<number|null> = useStorage(
    'productCreateDesign',
    null,
    undefined,
    { serializer: NSerializer }
  );
  
  const resetCategory = () => {
    category.value = null;
    localStorage.setItem('productCreateCategory', '')
  }

  const resetTrademark = () => {
    trademark.value = null;
    localStorage.setItem('productCreateTrademark', '')
  }

  const validateView = (id: number) => {
      switch(id) {
        case 1:
          name.value = name.value.trim();

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
          Object.keys(extraProps.value).forEach(( key:string ) => {
            if (extraProps.value[key].trim() !== ''){
              extraProps.value[key] = extraProps.value[key].trim()
            } else {
              delete extraProps.value[key];
            }
          })
          size.value = size.value.trim();
          description.value = description.value.trim();
          
          if(typeof stock.value !== 'number')
            toast.error('Agregue la cantidad de existencias.')

          if(String(stock.value).includes('.'))
            toast.error('Las existencias no pueden contener decimales.')

          return Boolean(
            typeof stock.value === 'number' && 
            !String(stock.value).includes('.')
          );
        case 3:
          if(!price.value)
            toast.error('Agregue un precio al producto.')

          if(sale.value) {
            if(!salePrice.value) {
              sale.value = false;
              salePrice.value = null;
              toast('Se ha desaplicado la oferta ya que no se agregó un precio ofertado.')
            }
          }
          return Boolean(price.value);
        case 4: 
          if(!design.value)
            toast.error('Escoja un diseño para su producto.')

          return Boolean(design.value);
        default: 
          return false;
      }
  }

  const resetProductCreate: () => void = () => {
    category.value = null,
    localStorage.setItem('productCreateCategory', '')
    trademark.value = null,
    localStorage.setItem('productCreateTrademark', '')
    name.value = '';
    image.value = '';
    size.value = '';
    stock.value = null;
    description.value = '';
    extraProps.value = {};
    price.value = null;
    sale.value = false;
    discontinued.value = false;
    salePrice.value = null;
    design.value = null;
  }

  return {
    currentView, loading, categories, trademarks,
    name, category, trademark, image, size, stock, description,
    extraProps, price, sale, salePrice, discontinued, design,
    validateView, resetCategory, resetTrademark, resetProductCreate,
  }
})