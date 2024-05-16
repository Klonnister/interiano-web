<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Product } from '../types/product.interface';

const products: Ref<Product[]> = ref([]);

const getProducts = async () => {
  const response = await fetch('http://192.168.1.5:3000/products', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNTg3Nzk2MiwiZXhwIjoxNzE1ODkyMzYyfQ.TOzLkbHf3IAP_n1IHXxFLYvOWre2-j9TdZ1_ev5_GB4',
    },
  }).then(r => r.json())

  products.value = response.data;
}

getProducts();
</script>

<template>
  <div class="flex flex-col gap-8">
      <CardsViewHeader
        title="productos"
        :filters-button="true"
        add-button-type="button"
      />

      <div class="w-full min-h-[30vh] lg:min-h-[65vh]">
        <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 lg:gap-10 2xl:gap-14 min-h-96" v-if="products.length">
          <ProductCard
            v-for="product in products"
            :product="product"
            :key="product.id"
          />
        </div>

        <div class="min-h-[40vh] lg:min-h-[65vh] flex justify-center items-center" v-else>
          <p class="lg:text-xl opacity-70">No hay productos para mostrar</p>
        </div>
      </div>
  </div>
</template>