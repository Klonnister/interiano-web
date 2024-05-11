<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  name?: string,
  icon: string,
  shrink?: boolean,
}>();
</script>

<template>
  <button
    class="bg-[#15395A] flex gap-2 items-center justify-center py-1.5 px-4 rounded-lg local-shadow hover:-translate-y-[1px] button-transition"
    :class="{'w-full': !props.shrink }"
  >
    <Icon
      :icon="props.icon"
      class="w-5 h-5"
    />
    <span v-if="props.name">{{ props.name }}</span>
  </button>
</template>

<style scoped>
.button-transition {
  transition: transform .3s ease-in-out;
}
</style>