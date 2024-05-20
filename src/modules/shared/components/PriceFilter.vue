<script setup lang="ts">
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();
</script>

<template>
  <div
    class="flex flex-col gap-4"
  > 
    <div class="flex flex-col gap-2">
      <label for="priceMin" class="text-[0.90rem]">Precio mínimo</label>
      <div class="local-money-input">
        <input
          id="priceMin"
          name="priceMin"
          v-model="filterStore.priceMin"
          type="number"
          class="local-inset-shadow"
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
          class="local-inset-shadow"
          step="0.01"
          placeholder="9999"
        />
        <span>Q</span>
      </div>
    </div>
  </div>
</template>