<script setup>
import { useWindowSize } from '@vueuse/core';
import { RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import sidebarLinks from '../helpers/sidebarLinks';

const links = sidebarLinks;

const { width } = useWindowSize();
const showAddButton = ref(true);
const addButtonType = ref('link');
// const openAddMenu = ref(false);
</script>

<template>
  <div>
    <!-- Small screen layout -->
    <div v-if="width < 1024">
      <aside
        class="w-full py-6 flex items-center justify-between"
      >
        <button>
          <Icon
            icon="mi:menu"
            class="w-8 h-8 text-[#D0D9F6]"
          />
        </button>

        <img
          src="/interiano-logo-shadowed.svg"
          alt=""
          class="w-40 sm:w-44 absolute top-0 left-0 right-0 mx-auto pt-4"
        >

        <div v-if="showAddButton">
          <button
            v-if="addButtonType === 'button'"            
          >
            <Icon icon="ic:round-plus" class="w-8 h-8 text-[#D0D9F6]" />
          </button>
          <a v-if="addButtonType === 'link'" href="/">
            <Icon icon="ic:round-plus" class="w-8 h-8 text-[#D0D9F6]" />
          </a>
        </div>
      </aside>

      <RouterView />
    </div>
    
    <!-- Large screen layout -->
    <div
      v-else
    >
      <div class="h-screen flex items-center fixed">
        <aside class="flex flex-col gap-9 p-5 h-max">
          <RouterLink :to="'/'" class="flex items-center gap-3 py-2 px-6 rounded-lg hover:bg-[#72838F]/15 transition-all ease-in-out duration-150 link-shadow hover:-translate-x-1">
            <img src="/user-template.webp" alt="" class="w-10">
            <span class="text-xl">User</span>
          </RouterLink>
  
          <div class="flex flex-col gap-3">
            <RouterLink
              v-for="link in links"
              :key="link.name"
              :to="link.path"
              class="flex gap-2 items-center py-2 px-6 rounded-lg hover:bg-[#7BAED2]/20 transition-all ease-in-out duration-150 link-shadow hover:-translate-x-1"
            >
              <Icon
                :icon="link.icon"
                class="w-8 h-8"
              />
              <span class="text-lg">{{ link.name }}</span >
            </RouterLink>
          </div>
  
          <img src="/interiano-logo-shadowed.svg" alt="" class="w-40 ps-6 hover:scale-125 hover:-rotate-2 transition-all ease-in-out duration-150">
        </aside>
      </div>

      <div class="pt-10 ps-60">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>