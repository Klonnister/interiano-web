<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full">
    <header>
      <img alt="Interiano logo" src="/interiano-logo-shadowed.svg"/>
    </header>
  
    <RouterView />
  </div>
</template>