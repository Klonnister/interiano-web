<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  name: string,
}>();

const emit = defineEmits<{
  (e: 'confirm'):void,
  (e: 'cancel'):void,
}>();
</script>

<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    content-transition="vfm-slide-up"
    class="flex items-start sm:justify-center sm:pt-4"
    content-class="bg-[#0E2032] h-max w-full sm:max-w-md rounded-b-2xl sm:rounded-t-2xl overflow-y-scroll hide-scroll-bar"
  >
    <div>
      <!-- Modal title -->
      <div class="fixed w-full sm:max-w-md bg-[#071524] px-8 py-4 overflow-hidden z-30 sm:rounded-t-2xl">
        <button
          @click="emit('cancel')"
          class="absolute right-6"
          type="button"
          aria-label="Cancelar edición de categoría"
        >
          <Icon
            icon="iconamoon:close-bold"
            class="w-7 h-7 text-white"
          />
        </button>
        <p class="text-2xl text-center text-white">Eliminar categoría</p>
      </div>

      <!-- Modal body -->
      <div class="pt-20 pb-6 px-6 flex flex-col items-center gap-4">
        <p class="text-center text-lg max-w-[50ch]">
          ¿Estás seguro que deseas eliminar la categoría {{ props.name }}?
        </p>
        <p class="text-center text-gray-400 max-w-[50ch]">Recuerda que una categoría no se puede eliminar si hay productos enlazadas a ella.</p>

        <div class="flex justify-center gap-4">
          <button
            class="py-1 px-5 bg-[#722A2A] rounded-md font-medium font-asap w-max local-shadow transition-all duration-300 ease-in-out hover:-translate-y-0.5"
            type="button"
            @click="emit('confirm')"
          >
            Eliminar
          </button>
          <button
            class="py-1 px-5 bg-[#15395A] rounded-md font-medium font-asap w-max local-shadow transition-all duration-300 ease-in-out hover:-translate-y-0.5"
            type="button"
            @click="emit('cancel')"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>