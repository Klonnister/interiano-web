<script setup lang="ts">
import ProductModalCreateCategory from './ProductModalCreateCategory.vue';
import ProductModalCreateTrademark from './ProductModalCreateTrademark.vue';
import { useProductCreateStore } from '../stores/productCreateStore';
import Dropdown from 'primevue/dropdown';
import { apiImageRequest, apiRequest, apiUrl } from '@/modules/shared/helpers/api';
import type { ProductOptions } from '@/modules/shared/types/product.interface';
import FileUpload, { type FileUploadUploaderEvent } from 'primevue/fileupload';
import { Icon } from '@iconify/vue';
import { useWindowScroll } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useModal } from 'vue-final-modal';
import { useToast } from 'vue-toastification';
import { type ImageResponse } from '../../shared/types/image.interface';
import Textarea from 'primevue/textarea';

// Tools and stores declarations
const { y } = useWindowScroll({ behavior: 'smooth'});
const createStore = useProductCreateStore();
const { category, trademark } = storeToRefs( createStore );
const toast = useToast();
const router = useRouter();

// Setting Current View step in store
createStore.currentView = 1;


// Get Categories and trademarks from API
const getViewOptions = async() => {
  createStore.loading = true;
  const options: ProductOptions = await apiRequest('products/create');
  createStore.categories = options.categories;
  createStore.categories.unshift({ id: 0, name: 'Crear +' })
  createStore.trademarks = options.trademarks;
  createStore.trademarks.unshift({ id: 0, name: 'Crear +', image: '' })
  createStore.loading = false;
}

if (!createStore.categories.length || !createStore.trademarks.length)
  getViewOptions();


// Image upload method and call to API
const onImageUpload = async(event: FileUploadUploaderEvent) => {
  const response: ImageResponse = await apiImageRequest('products/images', {
    images: event.files[0],
    previousImage: createStore.image,
  });

  if( !response.statusCode ) 
    createStore.image = response.path;
}


// Create category modal
const categoryModal = useModal({
  component: ProductModalCreateCategory,
  attrs: {
    onResetCategory: () => {
      createStore.resetCategory();
    },
    onResetInfo: () => {
      toast.success('Categoría creada con éxito.')
      getViewOptions();
    },
    onSetCategory: (id: number) => {
      createStore.category = id;
    },
    onClose: () => {
      categoryModal.close();
    },

  }
});

watch(category, (newCategory) => {
  if(newCategory === 0) categoryModal.open()
})


// Create Trademark modal
const trademarkModal = useModal({
  component: ProductModalCreateTrademark,
  attrs: {
    onResetTrademark: () => {
      createStore.resetTrademark();
    },
    onResetInfo: () => {
      toast.success('Marca creada con éxito.')
      getViewOptions();
    },
    onSetTrademark: (id: number) => {
      createStore.trademark = id;
    },
    onClose: () => {
      trademarkModal.close();
    },
  }
});

watch(trademark, (newTrademark) => {
  if(newTrademark === 0) trademarkModal.open()
})

// Form submittion next step
const nextStep = (event: Event) => {
  event.preventDefault();
  y.value = 0;
  router.push({ name: 'products-create-secondary' })
}
</script>

<template>
  <form class="w-full max-w-md mx-auto flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:max-w-3xl 2xl:gap-y-10" @submit="nextStep" id="productCreateMainForm">
    <div class="flex flex-col gap-2 group">
      <span
        id="productCreateCategory"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Categoría *
      </span>
      <Dropdown
        :pt="{
          wrapper: 'bg-[#061321] rounded-md mt-2 dropdown-scrollbar',
        }"
        :input-props="{ 
          name: 'productCreateCategory',
          autocomplete: 'off',
        }"
        :filter-input-props="{
          id: 'productCreateCategorySearch',
        }"
        :highlightOnSelect="false"
        :loading="createStore.loading"
        :options="createStore.categories"
        aria-labelledby="productCreateCategory"
        checkmark
        empty-filter-message="No hay categorías para mostrar"
        empty-message="No hay categorías para mostrar"
        filter
        optionLabel="name"
        optionValue="id"
        required
        v-model="createStore.category"
        :placeholder="createStore.loading ? 'Cargando...' : 'Seleccionar...'"
      />
    </div>
    <div class="flex flex-col gap-2 group">
      <span
        id="productCreateTrademark"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Marca *
      </span>
      <Dropdown
        :pt="{
          wrapper: 'bg-[#061321] rounded-md mt-2 dropdown-scrollbar',
        }"
        :input-props="{ 
          name: 'productCreateTrademark',
          autocomplete: 'off',
        }"
        :filter-input-props="{
          id: 'productCreateTrademarkSearch',
        }"
        filter
        :loading="createStore.loading"
        aria-labelledby="productCreateTrademark"
        v-model="createStore.trademark"
        :options="createStore.trademarks"
        optionLabel="name"
        optionValue="id"
        checkmark
        :highlightOnSelect="false"
        required
        :placeholder="createStore.loading ? 'Cargando...' : 'Seleccionar...'"
      />
    </div>
    <div class="flex flex-col gap-2 group relative">
      <label
        for="productCreateName"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Nombre *
      </label>
      <span class="text-[#A8B7EA] text-sm absolute top-0 right-0">
        ({{ createStore.name.length }}/70)
      </span>
      <Textarea
        id="productCreateName"
        name="productCreateName"
        v-model="createStore.name"
        autoResize
        maxlength="70"
        placeholder="Shampo Control Caída, Nutre y Crece"
        rows="2"
      />
    </div>
    <div class="flex flex-col gap-2 group">
      <span
        id="productCreateImage"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Imagen *
      </span>
      <FileUpload
        :auto="true"
        :choose-label="createStore.image ? 'Escoger otra' : 'Subir'"
        :maxFileSize="2 * 1024 * 1024"
        @uploader="onImageUpload"
        aria-labelledby="productCreateImage"
        accept=".jpeg,.jpg,.png,.webp,.svg"
        class="local-shadow hover:-translate-y-px text-sm"
        custom-upload
        invalid-file-size-message="Seleccione una imagen menos pesada."
        mode="basic"
      />
    </div>

    <Transition name="fade">
      <div
        class="mx-auto lg:col-span-2"
        v-if="createStore.image"
      >
        <img
          :src="`${apiUrl}${createStore.image}`"
          alt=""
          class="w-full lg:max-w-xs lg:max-h-[32rem] object-contain"
        >
      </div>
    </Transition>

    <div class="w-full flex justify-end col-span-2">
      <button
        class="bg-[#15395A] py-2 ps-4 pe-2 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#205485] flex items-center gap-1"
        type="submit"
      >
        Info. Secundaria
        <Icon
          icon="ic:round-arrow-right"
          class="w-6 h-6"
        />
      </button>
    </div>
  </form>
    
</template>