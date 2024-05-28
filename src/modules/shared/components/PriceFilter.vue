<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFilterStore } from '../stores/filterStore';
import { watch } from 'vue';

const filterStore = useFilterStore();
const { priceMin, priceMax } = storeToRefs(filterStore);

watch(priceMin, (newValue) => {
  if(newValue) {
    priceMin.value = Number(newValue.toFixed(2));
  }
})

watch(priceMax, (newValue) => {
  if(newValue) {
    priceMax.value = Number(newValue.toFixed(2));
  }
})
</script>

<template>
  <div
    class="flex flex-col gap-4"
  > 
    <button
      class="text-sm underline text-[#D0D9F6] -m-px"
      v-if="filterStore.priceMin || filterStore.priceMax"
      @click="filterStore.clearPrices"
    >
      Limpiar
    </button>
    <div class="flex flex-col gap-2">
      <label for="priceMin" class="text-[0.90rem]">Precio mínimo</label>
      <div class="local-money-input">
        <input
          id="priceMin"
          name="priceMin"
          v-model="filterStore.priceMin"
          type="number"
          class="local-inset-shadow transition-all duration-300 ease-in-out"
          step="0.01"
          placeholder="1"
        />
        <span>Q</span>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label for="priceMin" class="text-[0.90rem]">Precio máximo</label>
      <div class="local-money-input">
        <input
          id="priceMax"
          name="priceMax"
          v-model="filterStore.priceMax"
          type="number"
          class="local-inset-shadow transition-all duration-300 ease-in-out"
          step="0.01"
          placeholder="9999"
        />
        <span>Q</span>
      </div>
    </div>
  </div>
</template>