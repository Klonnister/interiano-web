<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  name: string,
  icon: string,
}>();
</script>

<template>
  <button
    class="bg-[#15395A] flex gap-2 items-center justify-center py-1.5 px-4 w-full rounded-lg local-shadow"
  >
    <Icon
      :icon="props.icon"
      class="w-5 h-5"
    />
    <span>{{ props.name }}</span>
  </button>
</template>