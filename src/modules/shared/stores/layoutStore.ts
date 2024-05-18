import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useLayoutStore = defineStore('layoutStore', () => {
  const showMenu: Ref<boolean> = ref(false);
  const openMenu = () => {
    showMenu.value = true;
  }

  const showProductsMenu = ref(false);

  const resetLayout = () => {
    showMenu.value = false;
    showProductsMenu.value = false;
  }
  
  return {
    showMenu, openMenu, resetLayout, showProductsMenu
  }
})
