<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { Icon } from '@iconify/vue';
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();
</script>

<template>
  <div class="w-full flex h-9 local-shadow rounded-lg md:min-w-96 lg:min-w-64 xl:min-w-96 hover:-translate-y-[1px] searchbar-transition">
    <InputText
      type="text"
      v-model="filterStore.search"
      placeholder="Buscar..."
      class="w-full text-sm lg:text-base"
    />
    <div class="w-1 bg-[#D0D9F6]"></div>
    <button class="bg-[#15395A] px-2 rounded-e-lg">
      <Icon
        icon="ic:baseline-search"
        class="w-7 h-7"
      />
    </button>
  </div>
</template>

<style scoped>
/* Inputtext */
.p-inputtext {
  padding: 0.6rem 1rem;
  background-color: white;
  color: #10273D;
  border-radius: 6px 0px 0px 6px;
  border: none;
  min-width: 0;
  box-shadow: none
}

.p-inputtext:focus {
  box-shadow: none
}

.p-inputtext:hover {
  box-shadow: none
}

.searchbar-transition {
  transition: transform .3s ease-in-out;
}
</style>