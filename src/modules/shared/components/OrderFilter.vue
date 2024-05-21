<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { useFilterStore } from '../stores/filterStore';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const filterStore = useFilterStore();
const { orderBy } = storeToRefs(filterStore);

watch(orderBy, (newOrderBy) => {
  if (orderBy.value === newOrderBy) filterStore.orderType = 'asc'
})

const columns = ref([
    { name: 'Precio', value: 'price' },
    { name: 'Nombre', value: 'name' },
    { name: 'Marca', value: 'trademark' },
]);

const priceOrder = ref([
    {
      name: 'Menor a mayor',
      value: 'asc',
    },
    {
      name: 'Mayor a menor',
      value: 'desc',
    },
])

const otherOrder = ref([
    {
      name: 'A-Z',
      value: 'asc',
    },
    {
      name: 'Z-A',
      value: 'desc',
    },
])
</script>

<template>
  <div class="flex flex-col gap-4 ">
    <button
      class="text-sm underline text-[#D0D9F6] -m-px"
      v-if="
        filterStore.orderBy !== 'price' || 
        filterStore.orderType !== 'asc'
      "
      @click="filterStore.resetOrder"
    >
      Reestablecer
    </button>
    <div class="flex flex-col gap-2 mb-6">
      <label for="priceMin" class="text-[0.90rem]">Ordenar por</label>
      <Dropdown
        v-model="filterStore.orderBy"
        :options="columns"
        optionLabel="name"
        optionValue="value"
        checkmark
        :highlightOnSelect="false"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="priceMin" class="text-[0.90rem]">Ordenar de</label>
      <Dropdown
        v-model="filterStore.orderType"
        :options="filterStore.orderBy === 'price' ? priceOrder : otherOrder"
        optionLabel="name"
        optionValue="value"
        checkmark
        :highlightOnSelect="false"
      />
    </div>
  </div>
</template>