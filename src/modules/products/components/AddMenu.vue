<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Icon } from '@iconify/vue';
import { useWindowSize } from '@vueuse/core';

const emit = defineEmits<{
  (e: 'close'): void
}>()
const { width } = useWindowSize();
</script>

<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    :content-transition="width < 640 ? 'vfm-slide-up' : 'vfm-slide-right'"
    :reserve-scroll-bar-gap="true"
  > 
    <div
      class="fixed top-0 right-0 px-8 py-6 bg-[#0E2032] h-max w-full sm:w-max sm:min-h-screen"
    >
      <button @click="emit('close')" class="fixed right-6">
        <Icon
          icon="iconamoon:close-bold"
          class="w-7 h-7 text-[#D0D9F6]"
        />
      </button>
      <p class="text-2xl text-center mb-4">Menú agregar</p>
      
      <!-- <div
        class="flex flex-col local-link-borders"
        v-if="layoutStore.addMenu.links.length"
      >
        <RouterLink
          v-for="link in layoutStore.addMenu.links"
          :key="link.name"
          :to="link.path"
          class="flex gap-3 items-center justify-center sm:justify-start py-6 px-6 sm:px- hover:scale-105 transition-all duration-300 ease-in-out max-w-80 w-full mx-auto"
        >
          <Icon
            :icon="link.icon"
            class="w-6 h-6"
          />
          <span>{{ link.name }}</span >
        </RouterLink>
      </div>  -->
    </div>
  </VueFinalModal>
</template>
