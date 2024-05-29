import type { Category } from "@/modules/shared/types/category.interface";
import type { Trademark } from "@/modules/shared/types/trademark.interface";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";


export const useProductCreateStore = defineStore('productCreateStore', () => {
  // View info
  const currentView = ref(1);
  const loading = ref(false);
  const categories: Ref<Category[]> = ref([]);
  const trademarks: Ref<Trademark[]> = ref([]);

  // Form inputs
  const name: Ref<string|null> = useStorage('productCreateName', null);
  const category: Ref<number|null> = useStorage('productCreateCategory', null);
  const trademark: Ref<number|null> = useStorage('productCreateTrademark', null);
  const image: Ref<string|null> = useStorage('productCreateImage', null);

  return {
    currentView, loading,
    categories, trademarks,
    name, category, trademark, image,
  }
})