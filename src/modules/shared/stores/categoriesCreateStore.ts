import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useCategoriesCreateStore = defineStore('categoriesCreateStore', () => {

  const newCategoryId: Ref<number> = ref(0);

  return { newCategoryId };
}); 