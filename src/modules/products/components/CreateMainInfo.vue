<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { useProductCreateStore } from '../stores/productCreateStore';
import Dropdown from 'primevue/dropdown';
import { apiImageRequest, apiRequest, apiUrl } from '@/modules/shared/helpers/api';
import type { ProductOptions } from '@/modules/shared/types/product.interface';
import FileUpload, { type FileUploadUploaderEvent } from 'primevue/fileupload';
import { Icon } from '@iconify/vue';
import { useWindowScroll } from '@vueuse/core';
import { useRouter } from 'vue-router';

const { y } = useWindowScroll({ behavior: 'smooth'});
const createStore = useProductCreateStore();
const router = useRouter();
createStore.currentView = 1;


const getViewOptions = async() => {
  createStore.loading = true;
  const options: ProductOptions = await apiRequest('products/create');
  createStore.categories = options.categories;
  createStore.categories.unshift({ id: 99999, name: 'Crear +' })
  createStore.trademarks = options.trademarks;
  createStore.trademarks.unshift({ id: 99999, name: 'Crear +', image: '' })
  createStore.loading = false;
}

if (!createStore.categories.length || !createStore.trademarks.length)
  getViewOptions();

const onImageUpload = async(event: FileUploadUploaderEvent) => {
  const response = await apiImageRequest('products/images', {
    images: event.files[0],
    previousImage: createStore.image,
  });

  if( response ) 
    createStore.image = response.path;
}

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
        id="createProductCategory"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Categoría *
      </span>
      <Dropdown
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
        aria-labelledby="createProductCategory"
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
        id="createProductTrademark"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Marca *
      </span>
      <Dropdown
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
        input-id="productCreateTrademark"
        :options="createStore.trademarks"
        optionLabel="name"
        optionValue="id"
        checkmark
        :highlightOnSelect="false"
        required
        :placeholder="createStore.loading ? 'Cargando...' : 'Seleccionar...'"
      />
    </div>
    <div class="flex flex-col gap-2 group">
      <label
        for="productCreateName"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Nombre *
      </label>
      <InputText
        name="productCreateName"
        autocomplete="off"
        :disabled="createStore.loading"
        id="productCreateName"
        placeholder="Shampo Control Caída, Bambú Nutre y Crece"
        required
        type="text"
        v-model="createStore.name"
      />
    </div>
    <div class="flex flex-col gap-2 group">
      <span
        id="createProductImage"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Imagen *
      </span>
      <FileUpload
        :auto="true"
        :choose-label="createStore.image ? 'Escoger otra' : 'Subir'"
        :maxFileSize="2 * 1024 * 1024"
        @uploader="onImageUpload"
        aria-labelledby="createproductImage"
        accept=".jpeg,.jpg,.png,.webp,.svg"
        class="local-shadow hover:-translate-y-px text-sm"
        custom-upload
        invalid-file-size-message="Seleccione una imagen menos pesada."
        mode="basic"
      />
    </div>

    <Transition name="fade">
      <div
        class="w-full lg:max-w-xs mx-auto lg:col-span-2"
        v-if="createStore.image"
      >
        <img
          :src="`${apiUrl}${createStore.image}`"
          alt=""
          class="w-full object-contain"
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