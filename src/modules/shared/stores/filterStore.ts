import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Trademark } from "../types/trademark.interface";
import type { Category } from "../types/category.interface";
import { useStorage } from "@vueuse/core";

export const useFilterStore = defineStore('filterStore', () => {
  const loading = ref(false);

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
  const page: Ref<number> = useStorage('page', 1);

  // Get products and paginate
  const applyFilters: Ref<boolean> = ref(false);

  const updateTrademarks = (apiTrademarks: Trademark[]) => {
    selectedTrademarks.value = apiTrademarks
      .map((trademark) => {
        return trademark.id;
      })
      .filter((trademarkId) => {
        return selectedTrademarks.value.includes(trademarkId) && trademarkId != null;
        //double check this
      })
    trademarks.value = apiTrademarks;
  }


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
    page.value = 1;
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

  const getQueries = () => {
    const queryParamsArr = [];

    if (search.value) 
      queryParamsArr.push(`title=${search.value}`)

    if (selectedCategories.value.length)
      queryParamsArr.push(`categories=${selectedCategories.value.toString()}`)
    
    if (selectedTrademarks.value.length)
      queryParamsArr.push(`trademarks=${selectedTrademarks.value.toString()}`)

    if (priceMin.value) 
      queryParamsArr.push(`priceMin=${priceMin.value}`)

    if (priceMax.value) 
      queryParamsArr.push(`priceMax=${priceMax.value}`)

    if(orderBy.value !== 'price' || orderType.value !== 'asc')
      queryParamsArr.push(`order=${orderBy.value},${orderType.value}`)

    // if (orderBy.value !== 'price') 
    //   queryParamsArr.push(`orderBy=${orderBy.value}`)

    // if (orderType.value !== 'asc') 
    //   queryParamsArr.push(`orderType=${orderType.value}`)

    if (sale.value) 
      queryParamsArr.push('sale=true')

    if (onlyStock.value) 
      queryParamsArr.push('onlyStock=true')

    if(page.value !== 1)
      queryParamsArr.push(`page=${page.value}`)

    const queries = queryParamsArr
      .map((value, index) => {
        return index === 0 ? `?${value}` : `&${value}`;
      })
      .join('')

    return queries;
  }

  return {
    trademarks, categories, search, onlyStock,
    selectedTrademarks, selectedCategories, page,
    priceMin, priceMax, orderBy, orderType, sale, 
    clearFilters, clearCategories, clearTrademarks,
    clearPrices, resetOrder, applyFilters, getQueries,
    updateTrademarks, loading,
  }
})