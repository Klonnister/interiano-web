<script setup lang="ts">
import Skeleton from 'primevue/skeleton';

const skeletons = Array.from(Array(12))
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 2xl:gap-10">
    <div 
      class="w-full h-[7.5rem] | sm:h-[8.5rem] | xl:h-[8.5rem] 2xl:h-[10rem] rounded-xl overflow-hidden custom-shadow"
      v-for="skeleton in skeletons"
      :key="skeleton"
    >
      <Skeleton
        width="100%"
        height="100%"
      />
    </div>
  </div>
</template>

<style scoped>
.custom-shadow {
  box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.4s ease-in-out;
}

.custom-shadow:hover {
  box-shadow: 5px 8px 2px rgba(0, 0, 0, 0.35);
}
</style>