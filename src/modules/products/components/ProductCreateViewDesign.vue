<script setup lang="ts">
import { useProductCreateStore } from '../stores/productCreateStore';
import { useRouter } from 'vue-router';
import Dropdown from 'primevue/dropdown';
import { apiRequest } from '@/modules/shared/helpers/api';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const createStore = useProductCreateStore();
createStore.currentView = 4;

const designs = [
  {
    name: 'Diseño 1',
    value: 1,
  },
  {
    name: 'Diseño 2',
    value: 2,
  }
]

const submit = async(event: Event) => {
  event.preventDefault();
  if(!createStore.validateView(4)) return false;

  const response = await apiRequest('products', {
      method: 'POST',
      body: {
        category_id: createStore.category,
        trademark_id: createStore.trademark,
        title: createStore.name.trim(),
        image: createStore.image,
        size: createStore.size.trim(),
        stock: createStore.stock,
        description: createStore.description.trim(),
        extra_props: createStore.extraProps,
        price: createStore.price,
        sale: createStore.sale,
        discontinued: createStore.discontinued,
        sale_price: createStore.salePrice || 0,
        design: createStore.design,
      }
  })

  if(!response.statusCode) {
    createStore.resetProductCreate();
    toast.success('Producto creado con éxito');
    router.push({ name: 'product-id', params: { id: response.id } })
  }
}
</script>

<template>
  <form class="w-full max-w-md mx-auto flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:max-w-3xl 2xl:gap-y-10" @submit="submit" id="productCreateMainForm">
    <div class="flex flex-col gap-2 group lg:col-span-2 lg:max-w-sm lg:w-full lg:mx-auto">
      <span
        id="productCreateDesignLabel"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Diseño *
      </span>
      <Dropdown
        :pt="{
          wrapper: 'bg-[#061321] rounded-md mt-2 dropdown-scrollbar',
        }"
        :input-props="{ 
          name: 'productCreateDesign',
          autocomplete: 'off',
        }"
        :filter-input-props="{
          id: 'productCreateDesign',
        }"
        :highlightOnSelect="false"
        :loading="createStore.loading"
        :options="designs"
        aria-labelledby="productCreateDesignLabel"
        checkmark
        empty-filter-message="No hay diseños para mostrar"
        empty-message="No hay diseños para mostrar"
        filter
        optionLabel="name"
        optionValue="value"
        required
        v-model="createStore.design"
        :placeholder="createStore.loading ? 'Cargando...' : 'Seleccionar...'"
      />
    </div>

    <Transition name="fade">
      <div v-if="createStore.design" class="w-full col-span-2">
        <div class="h-20 w-20 bg-white mx-auto text-black text-3xl flex justify-center items-center">
          {{ createStore.design }}
        </div>
      </div>
    </Transition>

    <ProductCreateStepButtons
      :previous-view="{ name: 'product-create-price' }"
      :is-create-button="true"
      previous-label="Precio"
      next-label="Crear"
    />
  </form>
</template>