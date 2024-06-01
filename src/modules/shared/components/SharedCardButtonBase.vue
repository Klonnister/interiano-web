<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  background: string,
  icon: string
}>()
</script>

<template>
  <div
    class="p-[0.4rem] rounded-md"
    :class="`${props.background} `"
  >
    <Icon :icon="props.icon" class="w-5 h-5 sm:h-6 sm:w-6" />
  </div>  
</template>