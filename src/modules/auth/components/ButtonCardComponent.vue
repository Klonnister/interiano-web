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
    <button class="flex flex-col justify-center items-center h-[70px] group">
      <img
        class="h-[50px] object-cover block group-hover:-translate-y-1 duration-500"
        :src="img"
        alt=""
      />
      <span class="text-center"> {{ title }} </span>
    </button>
  </RouterLink>
</template>
