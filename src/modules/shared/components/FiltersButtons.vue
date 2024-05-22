<script setup lang="ts">
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();

const clearFilters = () => {
  filterStore.clearFilters();
  filterStore.applyFilters = true;
}

const applyFilters = () => {
  filterStore.page = 1;
  filterStore.applyFilters = true;
}
</script>

<template>
  <div class=" bg-[#0E2032] fixed bottom-0 pt-5 pb-6 lg:pb-5 flex justify-center gap-3 w-full sm:w-[24rem] 2xl:w-[25rem] sm:rounded-bl-2xl z-20">
    <button
      class="bg-[#722A2A] py-2.5 w-36 rounded-lg local-shadow font-semibold lg:text-[#a1a1aa] hover:text-white hover:-translate-y-[1px] button-hover"
      @click="clearFilters"
    >
      Limpiar
    </button>
    <button
      class="bg-[#15395A] py-2 w-36 rounded-lg local-shadow font-semibold lg:text-[#a1a1aa] hover:text-white hover:-translate-y-[1px] button-hover"
      @click="applyFilters"
    >
      Aplicar
    </button>
  </div>
</template>

<style scoped>
.button-hover {
  transition: all 0.3s ease-in-out;
}
</style>