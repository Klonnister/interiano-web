<script lang="ts" setup>
//props
defineProps({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="path">
    <button class="flex flex-col gap-2 lg:gap-1 justify-center items-center h-[4.375rem] group">
      <img
        class="h-[3.125rem] object-cover block group-hover:-translate-y-1 duration-500"
        :src="img"
        alt=""
      />
      <span class="text-center"> {{ title }} </span>
    </button>
  </RouterLink>
</template>
