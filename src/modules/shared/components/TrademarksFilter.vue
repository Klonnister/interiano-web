<script setup lang="ts">
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();
</script>

<template>
  <div
    class="max-h-52 2xl:max-h-[21rem] flex flex-col gap-4 overflow-y-scroll hide-scroll-bar"
    v-if="filterStore.trademarks.length"
  >
    <TrademarkCheckbox
      v-for="trademark in filterStore.trademarks"
      :key="trademark.id"
      :name="trademark.name"
      :id="trademark.id"
    />
  </div>
  <p v-else class="text-sm">
    No hay marcas para mostrar
  </p>
</template>