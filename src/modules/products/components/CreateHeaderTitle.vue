<script setup lang="ts">
import { useProductCreateStore } from '../stores/productCreateStore';
import { Icon } from '@iconify/vue';
const createStore = useProductCreateStore()
</script>

<template>
  <div class="w-full max-w-sm mx-auto flex justify-center">
    <Transition name="swipe-up" mode="out-in">
      <div class="w-full flex items-center justify-between"
        v-if="createStore.currentView === 1"
      >
        <button disabled="true"
          class="disabled:opacity-50"
          aria-label="Paso anterior"
        >
          <Icon icon="ic:round-arrow-left" class="w-8 h-8" />
        </button>
        <div class="relative">
          <h2 class="py-2 px-5 text-xl" aria-current="step">Info. Principal</h2>
          <Icon
            icon="mdi:check-bold"
            class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
            :class="{ 'opacity-100': createStore.category && createStore.trademark && createStore.name && createStore.image }"
          />
        </div>
        <router-link
          aria-label="Siguiente paso"
          :to="{ name: 'products-create-secondary' }"
        >
          <Icon icon="ic:round-arrow-right" class="w-8 h-8" />
        </router-link>
      </div>

      <div class="w-full flex items-center justify-between"
        v-else-if="createStore.currentView === 2"
      >
        <router-link
          aria-label="Paso anterior"
          :to="{ name: 'products-create-main' }"
        >
          <Icon icon="ic:round-arrow-left" class="w-8 h-8" />
        </router-link>
        <div class="relative">
          <h2 class="py-2 px-5 text-xl" aria-current="step">Info. Secundaria</h2>
          <Icon
            icon="mdi:check-bold"
            class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
            :class="{ 'opacity-100': typeof createStore.stock === 'number' && !String(createStore.stock).includes('.') }"
          />
        </div>
        <router-link
          aria-label="Siguiente paso"
          :to="{ name: 'products-create-price' }"
        >
          <Icon icon="ic:round-arrow-right" class="w-8 h-8" />
        </router-link>
      </div>

      <div class="w-full flex items-center justify-between"
        v-else-if="createStore.currentView === 3"
      >
        <router-link
          aria-label="Paso anterior"
          :to="{ name: 'products-create-secondary' }"
        >
          <Icon icon="ic:round-arrow-left" class="w-8 h-8" />
        </router-link>
        <div class="relative">
          <h2 class="py-2 px-5 text-xl" aria-current="step">Precio</h2>
          <Icon
            icon="mdi:check-bold"
            class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
            :class="{ 'opacity-100': createStore.price }"
          />
        </div>
        <router-link
          aria-label="Siguiente paso"
          :to="{ name: 'products-create-price' }"
        >
          <Icon icon="ic:round-arrow-right" class="w-8 h-8" />
        </router-link>
      </div>
    </Transition>
  </div>
  <!--
    <div class="relative" v-else-if="createStore.currentView === 4">
      <h2 class="py-2 px-5 text-xl" aria-current="step">Diseño</h2>
      <Icon
        icon="mdi:check-bold"
        class="w-4 h-4 text-[#468222] absolute top-3 -right-1 opacity-0 transition-all duration-300 ease-in-out"
        :class="{ 'opacity-100': false }"
      />
    </div>
  </Transition> -->
</template>