<script setup lang="ts">
import { useFilterStore } from '../stores/filterStore';

const filterStore = useFilterStore();
</script>

<template>
  <div
    class="max-h-[16rem] 2xl:max-h-[21rem] flex flex-col gap-4 overflow-y-scroll hide-scroll-bar"
    v-if="filterStore.trademarks.length"
  >
    <button
      class="text-sm underline text-[#D0D9F6] -m-px"
      v-if="filterStore.selectedTrademarks.length"
      @click="filterStore.clearTrademarks"
    >
      Limpiar
    </button>
    <FiltersSwitchTrademark
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