<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { useProductCreateStore } from '../stores/productCreateStore';
import Dropdown from 'primevue/dropdown';
import { apiRequest } from '@/modules/shared/helpers/api';
import type { ProductOptions } from '@/modules/shared/types/product.interface';
import FileUpload from 'primevue/fileupload';

const createStore = useProductCreateStore();

const getViewOptions = async() => {
  createStore.loading = true;
  const options: ProductOptions = await apiRequest('products/create');
  createStore.categories = options.categories;
  createStore.trademarks = options.trademarks;
  createStore.loading = false;
}

if (!createStore.categories.length || !createStore.trademarks.length)
  getViewOptions();

const onUpload = (image) => {
  console.log(image);
}
</script>

<template>
  <form action="" class="w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-8">
    <div class="flex flex-col gap-2 group">
      <label for="productCreateCategory">
        Categoría *
      </label>
      <Dropdown
        :input-props="{ 
          name: 'productCreateCategory',
          autocomplete: 'off',
        }"
        :loading="createStore.loading"
        input-id="productCreateCategory"
        v-model="createStore.category"
        :options="createStore.categories"
        optionLabel="name"
        optionValue="id"
        checkmark
        :highlightOnSelect="false"
        required
        placeholder="Seleccionar..."
      />
    </div>
    <div class="flex flex-col gap-2 group">
      <label for="productCreateTrademark">
        Marca *
      </label>
      <Dropdown
        :input-props="{ 
          name: 'productCreateTrademark',
          autocomplete: 'off',
        }"
        :loading="createStore.loading"
        input-id="productCreateTrademark"
        v-model="createStore.trademark"
        :options="createStore.trademarks"
        optionLabel="name"
        optionValue="id"
        checkmark
        :highlightOnSelect="false"
        required
        placeholder="Seleccionar..."
      />
    </div>
    <div class="flex flex-col gap-2 group">
      <label for="productCreateName">
        Nombre *
      </label>
      <InputText
        :props="{ 
          name: 'productCreateName',
          autocomplete: 'off',
        }"
        :disabled="createStore.loading"
        id="productCreateName"
        required
        type="text"
        v-model="createStore.name"
      />
    </div>
    <div class="flex flex-col gap-2 group">
      <label for="productCreateImage">
        Imagen *
      </label>
      <FileUpload
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="image/*"
        :maxFileSize="2 * 1024 * 1024"
        :custom-upload="true"
        @upload="onUpload"
      />
    </div>
  </form>
    
</template>

<style scoped>
label {
  color: white;
}
</style>