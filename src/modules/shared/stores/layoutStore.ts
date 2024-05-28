import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useLayoutStore = defineStore('layoutStore', () => {
  const loading = ref(false);

  const showMenu: Ref<boolean> = ref(false);
  const openMenu = () => {
    showMenu.value = true;
  }

  const showProductsMenu = ref(false);
  const showFilters = ref(false);

  const resetLayout = () => {
    showMenu.value = false;
    showProductsMenu.value = false;
    showFilters.value = false;
  }
  
  return {
    showMenu, openMenu, resetLayout, showProductsMenu,
    showFilters, loading
  }
})
