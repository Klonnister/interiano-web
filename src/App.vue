<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen max-w-lg sm:container px-6 mx-auto">  
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Vue final modal container -->
    <ModalsContainer />
  </div>
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>