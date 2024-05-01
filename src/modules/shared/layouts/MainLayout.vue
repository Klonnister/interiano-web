<script setup>
import { useWindowSize } from '@vueuse/core';
import { RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import sidebarLinks from '../helpers/sidebarLinks';

const links = sidebarLinks;

const { width } = useWindowSize();
const showAddButton = ref(true);
const addButtonType = ref('button');
// const openAddMenu = ref(false);
const openMenu = ref(false);
const toggleMenu = () => {
  openMenu.value = !openMenu.value
}
</script>

<template>
  <div>
    <!-- Small screen layout -->
    <div v-if="width < 1024">
      <aside>
        <div
          class="bg-[#09141F] w-full py-5 sm:py-6 mx-auto fixed top-0 left-0 right-0 flex items-center justify-between px-5"
        >
          <button @click="toggleMenu">
            <Icon
              icon="mi:menu"
              class="w-7 h-7 sm:w-10 sm:h-10 text-[#D0D9F6]"
            />
          </button>
  
          <button
            v-if="showAddButton && addButtonType === 'button'"            
          >
            <Icon
              icon="ic:round-plus"
              class="w-7 h-7 sm:w-10 sm:h-10 text-[#D0D9F6]"
            />
          </button>
          <a v-if="showAddButton && addButtonType === 'link'" href="/">
            <Icon icon="ic:round-plus" class="w-7 h-7 sm:w-10 sm:h-10 text-[#D0D9F6]" />
          </a>
        </div>

        <!-- Navbar modal -->
        <div
          class="fixed top-0 left-0 h-screen w-full bg-[#09141F] flex flex-col justify-center items-center"
          :class="openMenu ? '' : '-translate-y-full'"
        > 
          <button class="absolute top-5 left-5" @click="toggleMenu">
            <Icon icon="iconamoon:close-bold" class="w-7 h-7 sm:w-10 sm:h-10 text-[#D0D9F6]"/>
          </button>

          <div class="flex flex-col gap-4 justify-center items-center mb-5 local-menu-fix">
            <img src="/user-template.webp" alt="" class="w-20 h-20 object-contain rounded-full">
            <p class="text-xl font-semibold">Patty</p>
          </div>

          <nav class="flex flex-col local-link-borders overflow-scroll">
            <RouterLink
              v-for="link in links"
              :key="link.name"
              :to="link.path"
              class="flex gap-3 items-center justify-start py-6 px-16"
            >
              <Icon
                :icon="link.icon"
                class="w-6 h-6"
              />
              <span>{{ link.name }}</span >
            </RouterLink>
          </nav>
        </div>
        <img
          src="/interiano-logo-shadowed.svg"
          alt=""
          class="fixed top-0 left-0 right-0 mx-auto pt-3 sm:pt-4 hover:scale-110 hover:-rotate-2 transition-all ease-in-out duration-300 z-50"
          :class="openMenu ? 'w-48 sm:w-56 translate-y-[3vh]' : 'w-36 sm:w-48'"
        >
      </aside>

      <div class="mt-24 sm:mt-32">
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
  </div>
</template>

<style scoped>
.local-link-borders > a:not(:last-child) {
  border-bottom: 1px solid #D0D9F675;
}

@media screen and (max-height: 725px) {
  .local-menu-fix {
    margin-top: 6rem;
  }
}

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
  
  .x {
    background-image: linear-gradient(to bottom, #10273D, #09141F);
  }
}
</style>