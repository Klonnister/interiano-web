import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useLayoutStore = defineStore('layoutStore', () => {
  const loading = ref(false);

  const showMenu: Ref<boolean> = ref(false);
  const openMenu = () => {
    showMenu.value = true;
  }

  const showProductsMenu = ref(false);
  const showCategoriesModal = ref(false);
  const showFilters = ref(false);

  const resetLayout = () => {
    showMenu.value = false;
    showProductsMenu.value = false;
    showCategoriesModal.value = false;
    showFilters.value = false;
    loading.value = false;
  }
  
  return {
    showMenu, openMenu, resetLayout, showProductsMenu,
    showFilters, loading, showCategoriesModal
  }
})
