import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useLayoutStore = defineStore('layoutStore', () => {
  const showMenu = ref(false);
  const openMenu = () => {
    showMenu.value = true;
  }
  const closeMenu = () => {
    showMenu.value = false;
  }

  const showAddButton = ref(false);
  const addButtonType: Ref<'button' | 'link' | null> = ref(null);
  const addButtonPath: Ref<string | null> = ref(null);
  const addButtonLinks = ref([]);

  const showAddMenu = ref(false);
  const openAddMenu = () => {
    showAddMenu.value = true;
  }
  const closeAddMenu = () => {
    showAddMenu.value = false;
  }

  const resetLayout = () => {
    showMenu.value = false;
    showAddButton.value = false;
    addButtonType.value = null;
    addButtonPath.value = null;
    addButtonLinks.value = [];
  }

  return {
    showMenu, openMenu, closeMenu,
    showAddButton, addButtonType, addButtonPath, addButtonLinks,
    showAddMenu, openAddMenu, closeAddMenu,
    resetLayout
  }
})