<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useLayoutStore } from '../stores/layoutStore';
import sidebarLinks from '../helpers/sidebarLinks';
import { apiUrl } from '../helpers/api';

const username = localStorage.getItem('userName');
const userImage = localStorage.getItem('userImage');
const links = sidebarLinks;
const layoutStore = useLayoutStore();
</script>

<template>
  <div
    class="fixed top-0 left-0 overflow-hidden flex items-center justify-center z-40"
    :class="layoutStore.showMenu ? 'h-screen w-full' : 'h-0 w-0 -translate-y-full delay-700'"
  > 
    <div
      class="bg-[#09141F] fixed rounded-full transition-all ease-in-out duration-[900ms]"
      :class="layoutStore.showMenu ? 'w-[250vh] h-[250vh] -top-[63vh] -left-[63vh]' : 'w-0 h-0 top-8 left-8'"
    >
      <div
        class="fixed top-0 left-0 h-screen w-full flex flex-col justify-center items-center transition-all ease-in-out duration-500"
        :class="layoutStore.showMenu ? 'opacity-100' : 'opacity-0'"
      >
        <button
          class="absolute top-6 left-5"
          @click="layoutStore.resetLayout"
          :disabled="!layoutStore.showMenu"
        >
          <Icon icon="iconamoon:close-bold" class="w-7 h-7 sm:w-10 sm:h-10 text-[#D0D9F6]"/>
        </button>

        <RouterLink
          aria-label="Mi perfil"
          class="flex flex-col gap-4 justify-center items-center mb-5 local-menu-fix hover:scale-105 transition-all duration-300 ease-in-out"
          to="/"
        >
          <img
            :src="userImage
              ? `${apiUrl}${userImage}`
              : '/other/user-template.webp'
            "
            alt=""
            class="w-20 h-20 object-cover rounded-full"
          >
          <p class="text-xl font-semibold">{{ username }}</p>
        </RouterLink>

        <nav
          class="flex flex-col local-link-borders overflow-y-scroll hide-scroll-bar"
          aria-label="Navegación entre páginas"
        >
          <RouterLink
            v-for="link in links"
            :key="link.name"
            :to="link.path"
            class="flex gap-3 items-center justify-start py-6 px-16 hover:scale-105 transition-all duration-300 ease-in-out"
            :class="layoutStore.showMenu ? '' : 'pointer-events-none'"
          >
            <Icon
              :icon="link.icon"
              class="w-6 h-6"
            />
            <span>{{ link.name }}</span >
          </RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-height: 700px) {
  .local-menu-fix {
    margin-top: 6rem;
  }
}
</style>