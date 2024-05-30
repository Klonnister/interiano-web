<script setup lang="ts">
import { useProductCreateStore } from '../stores/productCreateStore';
import { Icon } from '@iconify/vue';
const createStore = useProductCreateStore()
</script>

<template>
  <Transition name="swipe-up" mode="out-in">
    <div class="relative" v-if="createStore.currentView === 1">
      <h2 class="py-2 px-5 text-xl" aria-current="step">Info. Principal</h2>
      <Icon
        icon="mdi:check-bold"
        class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
        :class="{ 'opacity-100': createStore.category && createStore.trademark && createStore.name && createStore.image}"
      />
    </div>

    <div class="relative" v-else-if="createStore.currentView === 2">
      <h2 class="py-2 px-5 text-xl" aria-current="step">Info. Secundaria</h2>
      <Icon
        icon="mdi:check-bold"
        class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
        :class="{ 'opacity-100': createStore.stock }"
      />
    </div>

    <div class="relative" v-else-if="createStore.currentView === 3">
      <h2 class="py-2 px-5 text-xl" aria-current="step">Precio</h2>
      <Icon
        icon="mdi:check-bold"
        class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
        :class="{ 'opacity-100': createStore.price }"
      />
    </div>

    <div class="relative" v-else-if="createStore.currentView === 4">
      <h2 class="py-2 px-5 text-xl" aria-current="step">Diseño</h2>
      <Icon
        icon="mdi:check-bold"
        class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
        :class="{ 'opacity-100': false }"
      />
    </div>
  </Transition>
</template>