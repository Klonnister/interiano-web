import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useLayoutStore = defineStore('layoutStore', () => {
  const showMenu: Ref<boolean> = ref(false);
  const openMenu = () => {
    showMenu.value = true;
  }
  const closeMenu = () => {
    showMenu.value = false;
  }

  const resetLayout = () => {
    showMenu.value = false;
  }

  return {
    showMenu, openMenu, closeMenu, resetLayout
  }
})
