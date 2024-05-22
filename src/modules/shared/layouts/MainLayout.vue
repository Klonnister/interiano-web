<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
import sidebarLinks from '../helpers/sidebarLinks';
import { useLayoutStore } from '../stores/layoutStore';
import { useModal } from 'vue-final-modal';
import AddMenu from '@/modules/products/components/AddMenu.vue';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import FiltersModal from '../components/FiltersModal.vue';
import { apiUrl } from '../helpers/api';

const layoutStore = useLayoutStore();
const { width } = useWindowSize();
const { showMenu, showProductsMenu, showFilters } = storeToRefs(layoutStore);
const links = sidebarLinks;

const username = localStorage.getItem('userName')
const userImage = localStorage.getItem('userImage')

const addProductModal = useModal({
  component: AddMenu,
  attrs: {
    onClose: () => {
      layoutStore.resetLayout();
      addProductModal.close()
    }
  }
})

const filtersModal = useModal({
  component: FiltersModal,
})

watch(showProductsMenu, () => {
  if(showProductsMenu.value) addProductModal.open()
})

watch(showFilters, () => {
  if(showFilters.value) filtersModal.open()
  if(!showFilters.value) filtersModal.close()
})

watch(showMenu, () => {
  if(showMenu.value) document.body.classList.add("overflow-y-hidden")
  if(!showMenu.value) document.body.classList.remove("overflow-y-hidden")
})



</script>

<template>
  <div>
    <!-- Small screen layout -->
    <div v-if="width < 1024">
      <aside>
        <div
          class="w-full pt-6 pb-6 mx-auto fixed top-0 left-0 right-0 flex items-center justify-between px-5 bg-[#0E1D2C] z-40"
        >
          <button @click="layoutStore.openMenu" class="z-20">
            <Icon
              icon="mi:menu"
              class="w-7 h-7 sm:w-9 sm:h-9 text-[#D0D9F6]"
            />
          </button>

        </div>

        <NavBar />
        <img
          src="/interiano-logo-shadowed.svg"
          alt=""
          class="fixed top-0 left-0 right-0 mx-auto pt-3 hover:scale-110 hover:-rotate-2 transition-all ease-in-out duration-700 z-50"
          :class="layoutStore.showMenu ? 'w-48 sm:w-56 translate-y-[3vh]' : 'w-40 sm:w-48'"
        >
      </aside>

      <div class="pt-[6.5rem] pb-12 sm:pt-28">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    
    <!-- Large screen layout -->
    <div
      v-else
    >
      <div class="h-screen flex items-center fixed z-40">
        <aside class="flex flex-col gap-[5vh] 2xl:gap-12 p-5 ml-4 h-max">
          <RouterLink :to="'/'" class="flex items-center gap-3 2xl:gap-4 py-2 px-6 rounded-lg hover:bg-[#72838F]/15 transition-all ease-in-out duration-150 link-shadow hover:-translate-x-1">
            <img
              :src="userImage
                ? `${apiUrl}${userImage}`
                : '/other/user-template.webp'
              "
              alt=""
              class="w-10 h-10 2xl:w-14 rounded-full object-cover"
            >
            <span class="text-xl 2xl:text-2xl">{{ username }}</span>
          </RouterLink>
  
          <div class="flex flex-col gap-[2vh] 2xl:gap-6">
            <RouterLink
              v-for="link in links"
              :key="link.name"
              :to="link.path"
              class="flex gap-4 2xl:gap-5 items-center py-2 px-6 2xl:py-3 2xl:px-8 rounded-lg hover:bg-[#7BAED2]/20 transition-all ease-in-out duration-150 link-shadow hover:-translate-x-1"
            >
              <Icon
                :icon="link.icon"
                class="w-8 h-8 2xl:w-9 2xl:h-9"
              />
              <span class="text-lg 2xl:text-2xl">{{ link.name }}</span >
            </RouterLink>
          </div>
  
          <img src="/interiano-logo-shadowed.svg" alt="" class="w-40 2xl:w-48 ps-6 hover:scale-110 hover:-rotate-2 transition-all ease-in-out duration-150">
        </aside>
      </div>

      <div class="py-14 2xl:pt-24 ps-72 pe-14 2xl:ps-[21rem] 2xl:pe-12 content-center">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
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