<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useProductCreateStore } from '../stores/productCreateStore';

const createStore = useProductCreateStore();
</script>

<template>
  <header class="w-full flex flex-col gap-5 sm:gap-6">
    <h1 class="text-center uppercase text-2xl sm:text-3xl 2xl:text-4xl font-semibold">
      Crear Producto
    </h1>

    <CreateHeaderTitle class="sm:hidden"/>

    <div class="hidden sm:flex w-full justify-center gap-8">
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-[#A8B7EA] border-b relative group hover:text-white"
        :class="
          createStore.currentView === 1
            ? 'border-white text-white'
            : 'border-[#A8B7EA00]'
        "
        :to="{ name: 'products-create-main' }"
      >
        <span>Info. Principal</span>
        <Icon
          icon="mdi:check-bold"
          class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2 opacity-0 transition-all duration-300 ease-in-out"
          :class="{ 
            'opacity-50 group-hover:opacity-100': createStore.currentView !== 1 && createStore.category && createStore.trademark && createStore.name && createStore.image,
            'opacity-100': createStore.category && createStore.trademark && createStore.name && createStore.image
          }"
        />
      </router-link>
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-[#A8B7EA] border-b relative group hover:text-white"
        :class="
          createStore.currentView === 2
            ? 'border-white text-white'
            : 'border-[#A8B7EA00]'
        "
        :to="{ name: 'products-create-secondary' }"
      >
        <span>Info. Secundaria</span>
        <Icon
          icon="mdi:check-bold"
          class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2 transition-all duration-300 ease-in-out opacity-0"
          :class="{ 
            'opacity-50 group-hover:opacity-100': createStore.currentView !== 2 && typeof createStore.stock === 'number' && !String(createStore.stock).includes('.'),
            'opacity-100': typeof createStore.stock === 'number' && !String(createStore.stock).includes('.')
          }"
        />
      </router-link>
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-[#A8B7EA] border-b relative group hover:text-white"
        :class="
          createStore.currentView === 3
            ? 'border-white text-white'
            : 'border-[#A8B7EA00]'
        "
        :to="{ name: 'products-create-price' }"
      >
        <span>Precio</span>
        <Icon
          icon="mdi:check-bold"
          class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2 transition-all duration-300 ease-in-out opacity-0"
          :class="{ 
            'opacity-50 group-hover:opacity-100': createStore.currentView !== 3 && createStore.price,
            'opacity-100': createStore.price,
          }"
        />
      </router-link>
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-[#A8B7EA] border-b relative group hover:text-white"
        :class="
          createStore.currentView === 4
            ? 'border-white text-white'
            : 'border-[#A8B7EA00]'
        "
        :to="{ name: 'products-create-design' }"
      >
        <span>Diseño</span>
        <Icon
          icon="mdi:check-bold"
          class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2 transition-all duration-300 ease-in-out opacity-0"
          :class="{ 
            'opacity-50 group-hover:opacity-100': createStore.currentView !== 4 && createStore.design,
            'opacity-100': createStore.design,
          }"
        />
      </router-link>
    </div>
  </header>
</template>