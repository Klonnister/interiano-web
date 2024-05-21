import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Trademark } from "../types/trademark.interface";
import type { Category } from "../types/category.interface";
import { useStorage } from "@vueuse/core";

export const useFilterStore = defineStore('filterStore', () => {
  // Store applicable filters
  const trademarks: Ref<Trademark[]> = ref([]);
  const categories: Ref<Category[]> = ref([]);
  
  // Filters to apply
  const search: Ref<string> = useStorage('search', '');
  const selectedCategories: Ref<number[]> = useStorage('selectedCategories', []);
  const selectedTrademarks: Ref<number[]> = useStorage('selectedTrademarks', []);
  const priceMin: Ref<number|null> = useStorage('priceMin', null);
  const priceMax: Ref<number|null> = useStorage('priceMax', null);
  const orderBy: Ref<string> = useStorage('orderBy', 'price');
  const orderType: Ref<string> = useStorage('orderType', 'asc');
  const sale: Ref<boolean> = useStorage('sale', false);
  const onlyStock: Ref<boolean> = useStorage('onlyStock', false);


  const clearFilters = () => {
    search.value = '';
    selectedCategories.value = [];
    selectedTrademarks.value = [];
    priceMin.value = null;
    priceMax.value = null;
    orderBy.value = 'price';
    orderType.value = 'asc';
    sale.value = false;
    onlyStock.value = false;
  }

  const clearCategories = () => {
    selectedCategories.value = [];
  }
  const clearTrademarks = () => {
    selectedTrademarks.value = [];
  }
  const clearPrices = () => {
    priceMin.value = null;
    priceMax.value = null;
  }
  const resetOrder = () => {
    orderBy.value = 'price';
    orderType.value = 'asc';
  }

  return {
    trademarks, categories, search, sale, onlyStock,
    selectedTrademarks, selectedCategories,
    priceMin, priceMax, orderBy, orderType,
    clearFilters, clearCategories, clearTrademarks,
    clearPrices, resetOrder,
  }
})