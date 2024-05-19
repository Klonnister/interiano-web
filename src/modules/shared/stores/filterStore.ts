import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Trademark } from "../types/trademark.interface";
import type { Category } from "../types/category.interface";

export const useFilterStore = defineStore('filterStore', () => {
  // Store applicable filters
  const trademarks: Ref<Trademark[]> = ref([]);
  const categories: Ref<Category[]> = ref([]);
  
  // Filters to apply
  const search: Ref<string> = ref('');
  const selectedCategories: Ref<number[]> = ref([]);
  const selectedTrademarks: Ref<number[]> = ref([]);
  const priceMin: Ref<number|null> = ref(null);
  const priceMax: Ref<number|null> = ref(null);
  const sale: Ref<Boolean> = ref(false);


  return {
    trademarks, categories, search,
    selectedTrademarks, selectedCategories,
    priceMin, priceMax, sale,
  }
})