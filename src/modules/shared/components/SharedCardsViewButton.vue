<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useProductsFilterStore } from '@/modules/products/stores/productsFilterStore';

const props = defineProps<{
  name?: string,
  icon: string,
  shrink?: boolean,
}>();

const filterStore = useProductsFilterStore();
</script>

<template>
  <button
    class="bg-[#15395A] flex gap-2 items-center justify-center py-1.5 px-4 rounded-lg local-shadow hover:-translate-y-[1px] transition-all duration-300 ease-in-out"
    :class="{'w-full': !props.shrink }"
    type="button"
    :disabled="filterStore.loading"
  >
    <Icon
      :icon="filterStore.loading ? 'mingcute:loading-fill' : props.icon"
      :class="{ 'animate-spin text-[#D0D9F6]': filterStore.loading }"
      class="w-5 h-5"
    />
    <span v-if="props.name">{{ props.name }}</span>
  </button>
</template>