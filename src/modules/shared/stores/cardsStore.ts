import { defineStore } from "pinia";
import { reactive, ref, type Ref } from "vue";
import type { Category } from "../types/category.interface";

export const useCardsStore = defineStore('cardsStore', () => {
  const openCard: Ref<number|null> = ref(null);

  const editCategory: Category = reactive({
    id: 0,
    name: ''
  });

  const resetCards = () => {
    openCard.value = null;
  }

  const resetCategoryEdit = () => {
    editCategory.id = 0;
    editCategory.name = '';
  }

  return { 
    openCard, resetCards, editCategory, resetCategoryEdit,
  }
})