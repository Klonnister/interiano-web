<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useLayoutStore } from '../stores/layoutStore';
import sidebarLinks from '../helpers/sidebarLinks';
import { apiUrl } from '../helpers/api';
import { computed, type Ref } from 'vue';
import { useStorage } from '@vueuse/core';

const username: Ref<string> = useStorage('userName', '');
const userImage: Ref<string> = useStorage('userImage', '');
const links = sidebarLinks;
const layoutStore = useLayoutStore();

const imagePath = computed(() => {
  return userImage ? `${apiUrl}${userImage.value}` : '/other/user-template.webp';  
})


// Computed properties
const tabIndexAttr = computed(
  () => layoutStore.showMenu && !layoutStore.loading ? '0' : '-1'
)
const unfocusableOption = computed(() => layoutStore.loading || !layoutStore.showMenu)

const hiddenOption = computed(() => !layoutStore.showMenu)

const unfocusableByMouse = computed(() => ({
  'pointer-events-none opacity-50': layoutStore.loading || !layoutStore.showMenu
}))
</script>

<template>
  <div
    class="fixed top-0 left-0 overflow-hidden flex items-center justify-center z-40"
    :class="{ 
      'h-screen w-full': layoutStore.showMenu,
      'h-0 w-0 -translate-y-full delay-700': !layoutStore.showMenu, 
    }"
    role="menu"
    :aria-hidden="!layoutStore.showMenu"
  >
    <button
      class="absolute top-6 left-5 z-40"
      aria-label="Cerrar menú de navegación"
      @click="layoutStore.resetLayout"
    >
      <Icon icon="iconamoon:close-bold" class="w-7 h-7 sm:w-10 sm:h-10 text-[#D0D9F6]"/>
    </button>
    <div
      class="bg-[#09141F] fixed rounded-full transition-all ease-in-out duration-[900ms]"
      :class="{ 
        'w-[250vh] h-[250vh] -top-[63vh] -left-[63vh]': layoutStore.showMenu,
        'w-0 h-0 top-8 left-8': !layoutStore.showMenu,
      }"
    >
      <nav
        class="fixed top-0 left-0 h-screen w-full flex flex-col justify-center items-center transition-all ease-in-out duration-500"
        :class="{
          'opacity-100': layoutStore.showMenu,
          'opacity-0': !layoutStore.showMenu,
        }"
      >

        <RouterLink
          :aria-disabled="unfocusableOption"
          :aria-hidden="hiddenOption"
          :tabindex="tabIndexAttr"
          :class="unfocusableByMouse"
          aria-label="Mi perfil"
          class="flex flex-col gap-4 justify-center items-center mb-5 local-menu-fix hover:scale-105 transition-all duration-300 ease-in-out"
          to="/"
          
        >
          <img
            :src="imagePath"
            alt=""
            class="w-20 h-20 object-cover rounded-full"
          >
          <p class="text-xl font-semibold">{{ username }}</p>
        </RouterLink>

        <div
          class="flex flex-col local-link-borders overflow-y-scroll hide-scroll-bar"
          aria-label="Navegación entre páginas"
        >
          <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.path"
          class="flex gap-3 items-center justify-start py-6 px-16 hover:scale-105 transition-all duration-300 ease-in-out"
          :class="unfocusableByMouse"
          :aria-disabled="unfocusableOption"
          :aria-hidden="hiddenOption"
          :tabindex="tabIndexAttr"
          >
            <Icon
              :icon="link.icon"
              class="w-6 h-6"
            />
            <span>{{ link.name }}</span >
          </RouterLink>
        </div>
      </nav>
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