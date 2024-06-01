<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { useFilterStore } from '../stores/filterStore';
import { ref } from 'vue';

const filterStore = useFilterStore();

const stock = ref([
    { name: 'Ocultar sin existencias', value: 'hideNoStock' },
    { name: 'Mostrar solo sin existencias', value: 'onlyNoStock' },
]);

const discontinued = ref([
    { name: 'Ocultar descontinuados', value: 'hideDiscontinued' },
    { name: 'Mostrar solo descontinuados', value: 'onlyDiscontinued' },
])

</script>

<template>
  <div class="flex flex-col gap-4 ">
    <button
      class="text-sm underline text-[#D0D9F6] -m-px"
      v-if="filterStore.stock || filterStore.discontinued"
      @click="filterStore.resetStatus"
    >
      Reestablecer
    </button>
    <div class="flex flex-col gap-2 mb-6">
      <span id="filterStock" class="text-[0.90rem]">Existencias</span>
      <Dropdown
        v-model="filterStore.stock"
        :options="stock"
        optionLabel="name"
        optionValue="value"
        checkmark
        :highlightOnSelect="false"
        placeholder="No aplicar filtro"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span id="filterDiscontinued" class="text-[0.90rem]">Descontinuado</span>
      <Dropdown
        v-model="filterStore.discontinued"
        :options="discontinued"
        optionLabel="name"
        optionValue="value"
        checkmark
        aria-labelledby="filterDiscontinued"
        :highlightOnSelect="false"
        placeholder="No aplicar filtro"
      />
    </div>
  </div>
</template>