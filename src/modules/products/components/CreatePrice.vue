<script setup lang="ts">
import { useProductCreateStore } from '../stores/productCreateStore';
// import { useWindowScroll } from '@vueuse/core';

// const { y } = useWindowScroll({ behavior: 'smooth'});
const createStore = useProductCreateStore();
createStore.currentView = 3;


// const nextStep = (event: Event) => {
//   event.preventDefault();
//   y.value = 0;
//   createStore.goToStep(3);
// }

</script>

<template>
  <div>
    test
  </div>
</template>