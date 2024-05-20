<script setup lang="ts">
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();
</script>

<template>
  <div
    class="max-h-64 flex flex-col gap-4 overflow-y-scroll hide-scroll-bar"
    v-if="filterStore.categories.length"
  >   
    <CategoryCheckbox
      v-for="category in filterStore.categories"
      :key="category.id"
      :name="category.name"
      :id="category.id"
    />
    <CategoryCheckbox
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