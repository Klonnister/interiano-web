<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Product, ProductResponse } from '../../shared/types/product.interface';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import { apiRequest } from '@/modules/shared/helpers/api';
import type { Category } from '@/modules/shared/types/category.interface';

const products: Ref<Product[]> = ref([]);

const filterStore = useFilterStore();

const setViewInfo = async () => {
  // Products request
  const productsResponse: ProductResponse = await apiRequest('products');
  products.value = productsResponse.data;
  filterStore.trademarks = productsResponse.trademarks;

  // Categories request
  if (!filterStore.categories.length) {
    const categories: Category[] = await apiRequest('categories?raw=true');
    filterStore.categories = categories;
  }
}

setViewInfo();
</script>

<template>
  <div class="flex flex-col gap-8">
    <CardsViewHeader title="productos" :filters-button="true" add-button-type="button" />

    <div class="w-full min-h-[30vh] lg:min-h-[65vh]">
      <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 lg:gap-10 2xl:gap-14 min-h-96"
        v-if="products.length">
        <ProductCard v-for="product in products" :product="product" :key="product.id" />
      </div>

      <div class="min-h-[40vh] lg:min-h-[65vh] flex justify-center items-center" v-else>
        <p class="lg:text-xl opacity-70">No hay productos para mostrar</p>
      </div>
    </div>
  </div>
</template>