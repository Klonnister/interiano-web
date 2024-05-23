<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Icon } from '@iconify/vue';
import { useWindowSize } from '@vueuse/core';
import { useLayoutStore } from '@/modules/shared/stores/layoutStore';

const layoutStore = useLayoutStore()
const { width } = useWindowSize();

const closeMenu = () => {
  layoutStore.resetLayout();
}
</script>

<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    :content-transition="width < 640 ? 'vfm-slide-up' : 'vfm-slide-right'"
    :reserve-scroll-bar-gap="true"
    @closed="closeMenu"
  > 
    <div
      class="fixed top-0 right-0 bg-[#0E2032] h-max w-full sm:w-[22rem] 2xl:w-[25rem] sm:min-h-screen rounded-b-xl sm:rounded-s-2xl overflow-hidden"
    > 
      <div class="bg-[#050e17] px-8 py-6">
        <button @click="closeMenu" class="fixed right-6">
          <Icon
            icon="iconamoon:close-bold"
            class="w-7 h-7 text-white"
          />
        </button>
        <p class="text-2xl text-center text-white sm:text-start">Más opciones</p>
      </div>
      
      <div class="flex flex-col local-link-borders px-8 pt-2 pb-4">
        <RouterLink
          class="flex gap-3 items-center justify-center sm:justify-start py-6 px-4 sm:px- hover:translate-x-[2px] transition-all duration-300 ease-in-out max-w-80 w-full mx-auto"
          @click="closeMenu"
          :to="{ name: 'dev' }"
        >
          <Icon
            icon="mdi:add"
            class="w-6 h-6"
          />
          <span>Crear producto</span >
        </RouterLink>

        <button
          class="flex gap-3 items-center justify-center sm:justify-start py-6 px-4 sm:px- hover:translate-x-[2px] transition-all duration-300 ease-in-out max-w-80 w-full mx-auto"
          @click="closeMenu"
        >
          <Icon
            icon="mdi:file-plus"
            class="w-6 h-6"
          />
          <span>Agregar página al catálogo</span >
        </button>

        <button
          class="flex gap-3 items-center justify-center sm:justify-start py-6 px-4 sm:px- hover:translate-x-[2px] transition-all duration-300 ease-in-out max-w-80 w-full mx-auto"
          @click="closeMenu"
        >
          <Icon
            icon="mdi:file-check"
            class="w-6 h-6"
          />
          <span>Agregar todos al catálogo</span >
        </button>
      </div> 
    </div>
  </VueFinalModal>
</template>
