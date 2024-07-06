<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useOrderTypeDefaults } from '../composables/orderTypeDefaults';

const orderTypeDefaults = useOrderTypeDefaults();
const filterStore = useFilterStore();
const { orderBy } = storeToRefs(filterStore);

const updateOrderTypeList = () => {
  switch(orderBy.value) {
    case 'price': 
      filterStore.orderTypeOptions = orderTypeDefaults.price;
      break;
    case 'created_at': 
      filterStore.orderTypeOptions = orderTypeDefaults.date;
      break;
    case 'updated_at': 
      filterStore.orderTypeOptions = orderTypeDefaults.date;
      break;
    default:
      filterStore.orderTypeOptions = orderTypeDefaults.alphabetic;
      break;
  }
}

updateOrderTypeList();

watch(orderBy, (newOrderBy) => {
  if (orderBy.value === newOrderBy) filterStore.orderType = 'asc'
  updateOrderTypeList();
})
</script>

<template>
  <div class="flex flex-col gap-4 ">
    <button
      class="text-sm underline text-[#D0D9F6] -m-px"
      v-if="
        filterStore.orderBy !== 'created_at' ||
        filterStore.orderType !== 'asc'
      "
      @click="filterStore.resetOrder"
    >
      Reestablecer
    </button>
    <div class="flex flex-col gap-2 mb-6">
      <span id="filterOrderBy" class="text-[0.90rem]">Ordenar por</span>
      <Dropdown
        v-model="filterStore.orderBy"
        :options="filterStore.orderByOptions"
        optionLabel="name"
        optionValue="value"
        checkmark
        :highlightOnSelect="false"
        aria-labelledby="filterOrderBy"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span id="filterOrderType" class="text-[0.90rem]">Tipo de orden</span>
      <Dropdown
        v-model="filterStore.orderType"
        :options="filterStore.orderTypeOptions"
        optionLabel="name"
        optionValue="value"
        checkmark
        aria-labelledby="filterOrderType"
        :highlightOnSelect="false"
      />
    </div>
  </div>
</template>