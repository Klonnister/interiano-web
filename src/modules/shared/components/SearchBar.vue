<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { Icon } from '@iconify/vue';
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();
</script>

<template>
  <div class="w-full flex h-9 local-shadow rounded-lg md:min-w-96 lg:min-w-72 xl:min-w-96">
    <InputText
      type="text"
      v-model="filterStore.search"
      class="w-full"
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
  padding: 0.6rem 1.25rem;
  background-color: white;
  color: #10273D;
  font-size: 16px;
  border-radius: 6px 0px 0px 6px;
  border: none;
  min-width: 0;
}

</style>