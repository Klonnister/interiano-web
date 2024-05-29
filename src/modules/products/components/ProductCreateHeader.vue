<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useProductCreateStore } from '../stores/productCreateStore';

const createStore = useProductCreateStore();
</script>

<template>
  <header class="w-full flex flex-col gap-5 sm:gap-6">
    <h1 class="text-center uppercase text-2xl sm:text-3xl 2xl:text-4xl font-semibold">Crear Producto</h1>
    <div class="w-full max-w-sm mx-auto flex items-center justify-between sm:hidden">
      <button
        :disabled="createStore.currentView - 1 === 0"
        class="disabled:opacity-50"
        aria-label="Paso anterior"
      >
        <Icon icon="ic:round-arrow-left" class="w-8 h-8" />
      </button>
      <h2 class="py-2 px-5 text-xl" aria-current="step">Info. Principal</h2>
      <button
        :disabled="createStore.currentView + 1 === 5"
        class="disabled:opacity-50"
        aria-label="Siguiente paso"
      >
        <Icon icon="ic:round-arrow-right" class="w-8 h-8" />
      </button>
    </div>
    <div class="hidden sm:flex w-full justify-center gap-8">
      <button
        class="px-4 py-1"
        :class="{ 'border-b border-white text-white': createStore.currentView === 1 }"
      >
        <span>Info. Principal</span>
      </button>
      <button
        class="px-4 py-1"
        :class="{ 'border-b border-white text-white': createStore.currentView === 2 }"
      >
        <span>Info. Secundaria</span>
      </button>
      <button
        class="px-4 py-1"
        :class="{ 'border-b border-white text-white': createStore.currentView === 3 }"
      >
        <span>Precio</span>
      </button>
      <button
        class="px-4 py-1"
        :class="{ 'border-b border-white text-white': createStore.currentView === 4 }"
      >
        <span>Diseño</span>
      </button>
    </div>
  </header>
</template>