<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
import sidebarLinks from '../helpers/sidebarLinks';
import { useLayoutStore } from '../stores/layoutStore';
import { useModal } from 'vue-final-modal';
import ProductsModal from '@/modules/products/components/ProductsModal.vue';
import { storeToRefs } from 'pinia';
import { watch, type Ref } from 'vue';
import FiltersModal from '../components/FiltersModal.vue';
import { apiRequest, apiUrl } from '../helpers/api';
import type { ProfileInfo } from '../types/profile.interface';
import { useStorage } from '@vueuse/core';

const layoutStore = useLayoutStore();
const links = sidebarLinks;

const username: Ref<string|null> = useStorage('userName', null);
const userImage: Ref<string|null> = useStorage('userImage', null);

const getUserProfile = async() => {
  const userResponse: ProfileInfo = await apiRequest('profile');
  if (userResponse) {
    username.value = userResponse.username;
    userImage.value = userResponse.image;
  }
}

if(!username.value) getUserProfile();

const { showMenu, showProductsMenu, showFilters } = storeToRefs(layoutStore);

const addProductModal = useModal({
  component: ProductsModal,
})

const filtersModal = useModal({
  component: FiltersModal,
})

watch(showProductsMenu, (newValue) => {
  newValue 
    ? addProductModal.open()
    : addProductModal.close()
})

watch(showFilters, (newValue) => {
  newValue 
    ? filtersModal.open()
    : filtersModal.close()
})

watch(showMenu, (newValue) => {
  newValue 
    ? document.body.classList.add("overflow-y-hidden")
    : document.body.classList.remove("overflow-y-hidden")
})

</script>

<template>
  <div class="flex flex-col lg:flex-row lg:py-12 2xl:py-16 lg:gap-8 xl:gap-12 2xl:gap-20 lg:justify-center lg:px-4">
    <aside>
      <div
        class="w-full pt-6 pb-6 mx-auto fixed top-0 left-0 right-0 flex items-center justify-between px-5 bg-[#0E1D2C] z-40 lg:hidden"
      >
        <button @click="layoutStore.openMenu" class="z-20">
          <Icon
            icon="mi:menu"
            class="w-7 h-7 sm:w-9 sm:h-9 text-[#D0D9F6]"
          />
        </button>
        <img
          src="/interiano-logo-shadowed.svg"
          alt=""
          class="fixed top-0 left-0 right-0 mx-auto pt-3 hover:scale-110 hover:-rotate-2 transition-all ease-in-out duration-700 z-50"
          :class="layoutStore.showMenu ? 'w-48 sm:w-56 translate-y-[3vh]' : 'w-40 sm:w-48'"
        >
        <SharedNavBar />
      </div>

      <div class="hidden lg:flex flex-col justify-center gap-[5vh] 2xl:gap-12 p-5 ps-0 sticky top-14 py-8 lg:h-[82vh] 2xl:h-max 2xl:-ms-8">
        <RouterLink :to="'/'" class="flex items-center gap-3 2xl:gap-4 py-2 px-6 2xl:py-3 2xl:px-8 rounded-lg hover:bg-[#72838F]/15 transition-all ease-in-out duration-150 link-shadow hover:-translate-x-1">
          <img
            :src="userImage
              ? `${apiUrl}${userImage}`
              : '/other/user-template.webp'
            "
            alt=""
            class="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full object-cover"
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
      </div>
    </aside>

    <div class="pt-[6.5rem] pb-12 sm:pt-28 lg:p-0 lg:w-[45rem] xl:w-[58rem] 2xl:min-w-[70rem]">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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