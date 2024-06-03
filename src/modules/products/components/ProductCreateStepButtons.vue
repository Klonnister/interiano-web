<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useWindowScroll } from '@vueuse/core';
import { type RouteLocation, useRouter } from 'vue-router';
import { useProductCreateStore } from '../stores/productCreateStore';

interface Props {
  previousView?: RouteLocation,
  hidePrevious?: boolean,
  isCreateButton?: boolean,
  previousLabel?: string,
  nextLabel: string,
}

const router = useRouter();
const { y } = useWindowScroll({ behavior: 'smooth'});
const createStore = useProductCreateStore();
const props = withDefaults(defineProps<Props>(), {
  disablePrevious: false,
  isCreateButton: false,
})

const previousStep = () => {
  y.value = 0;
  if (props.previousView)
    router.push(props.previousView)
}
</script>

<template>
  <div
    class="w-full flex col-span-2 mt-4"
    :class="props.hidePrevious ? 'justify-end' : 'justify-between'"
  >
    <button
      v-if="!props.hidePrevious"
      class="bg-[#1A2F25] py-2 pe-4 ps-2 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#274738] flex items-center gap-1 disabled:opacity-60 disabled:pointer-events-none"
      type="button"
      :disabled="createStore.loading"
      @click="previousStep"
    >
      <Icon
        icon="ic:round-arrow-left"
        class="w-6 h-6"
      />
      {{ props.previousLabel }}
    </button>
    <button
      class="bg-[#15395A] py-2 ps-4 pe-2 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#205485] flex items-center disabled:opacity-60 disabled:pointer-events-none"
      :class="props.isCreateButton ? 'gap-2' : 'gap-1'"
      :disabled="createStore.loading"
      type="submit"
    >
      {{ props.nextLabel }}
      <Icon
        :icon="props.isCreateButton ? 'mage:box-3d-plus-fill' : 'ic:round-arrow-right'"
        :class="props.isCreateButton ? 'w-5 h-5' : 'w-6 h-6'"
      />
    </button>
  </div>
</template>