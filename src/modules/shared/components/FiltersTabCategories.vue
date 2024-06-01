<script setup lang="ts">
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();
</script>

<template>
  <div
    class="max-h-[16rem] 2xl:max-h-[21rem] flex flex-col gap-4 overflow-y-scroll hide-scroll-bar"
    v-if="filterStore.categories.length"
  >
    <button
      class="text-sm underline text-[#D0D9F6] -m-px"
      v-if="filterStore.selectedCategories.length"
      @click="filterStore.clearCategories"
    >
      Limpiar
    </button>
    <FiltersSwitchCategory
      v-for="category in filterStore.categories"
      :key="category.id"
      :name="category.name"
      :id="category.id"
    />
  </div>
  <p v-else class="text-sm">
    No hay categorías para mostrar
  </p>
</template>