<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
import sidebarLinks from '../helpers/sidebarLinks';
import { useLayoutStore } from '../stores/layoutStore';
import { ModalsContainer } from 'vue-final-modal'

const links = sidebarLinks;
const { width } = useWindowSize();
const layoutStore = useLayoutStore();
</script>

<template>
  <div>
    <!-- Small screen layout -->
    <div v-if="width < 1024">
      <aside>
        <div
          class="w-full py-5 sm:py-6 mx-auto fixed top-0 left-0 right-0 flex items-center justify-between px-5 backdrop-blur-lg"
        >
          <button @click="layoutStore.openMenu" class="z-20">
            <Icon
              icon="mi:menu"
              class="w-7 h-7 sm:w-10 sm:h-10 text-[#D0D9F6]"
            />
          </button>

        </div>

        <NavBar />
        <img
          src="/interiano-logo-shadowed.svg"
          alt=""
          class="fixed top-0 left-0 right-0 mx-auto pt-3 sm:pt-4 hover:scale-110 hover:-rotate-2 transition-all ease-in-out duration-700 z-30"
          :class="layoutStore.showMenu ? 'w-48 sm:w-56 translate-y-[3vh]' : 'w-36 sm:w-48'"
        >
      </aside>

      <div class="mt-24 sm:mt-28">
        <RouterView />
      </div>
    </div>
    
    <!-- Large screen layout -->
    <div
      v-else
    >
      <div class="h-screen flex items-center fixed">
        <aside class="flex flex-col gap-[5vh] 2xl:gap-12 p-5 h-max">
          <RouterLink :to="'/'" class="flex items-center gap-3 2xl:gap-5 py-2 px-6 rounded-lg hover:bg-[#72838F]/15 transition-all ease-in-out duration-150 link-shadow hover:-translate-x-1">
            <img src="/user-template.webp" alt="" class="w-10 2xl:w-14">
            <span class="text-xl 2xl:text-2xl">User</span>
          </RouterLink>
  
          <div class="flex flex-col gap-[2vh] 2xl:gap-6">
            <RouterLink
              v-for="link in links"
              :key="link.name"
              :to="link.path"
              class="flex gap-4 2xl:gap-5 items-center py-2 px-6 rounded-lg hover:bg-[#7BAED2]/20 transition-all ease-in-out duration-150 link-shadow hover:-translate-x-1"
            >
              <Icon
                :icon="link.icon"
                class="w-8 h-8 2xl:w-10 2xl:h-10"
              />
              <span class="text-lg 2xl:text-xl">{{ link.name }}</span >
            </RouterLink>
          </div>
  
          <img src="/interiano-logo-shadowed.svg" alt="" class="w-40 2xl:w-48 ps-6 hover:scale-110 hover:-rotate-2 transition-all ease-in-out duration-150">
        </aside>
      </div>

      <div class="pt-14 2xl:pt-24 ps-72 2xl:ps-80">
        <RouterView />
      </div>
    </div>

    <!-- Vue final modal container -->
    <ModalsContainer />
  </div>
</template>

<style scoped>
@media screen and (min-width: 1024px) {
  .router-link-exact-active {
    background-color: #72838F20;
    box-shadow: 3px 4px 4px rgba(0,0,0, 0.25);
  }
  
  .link-shadow:hover {
    box-shadow: 2px 3px 4px rgba(0,0,0, 0.35);
  }
  
  .router-link-exact-active:hover {
    box-shadow: 5px 6px 4px rgba(0,0,0, 0.25);
  }
}
</style>