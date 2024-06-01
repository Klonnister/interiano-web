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
  const search: Ref<string> = useStorage('filterSearch', '');
  const selectedCategories: Ref<number[]> = useStorage('filterSelectedCategories', []);
  const selectedTrademarks: Ref<number[]> = useStorage('filterSelectedTrademarks', []);
  const priceMin: Ref<number|null> = useStorage('filterPriceMin', null);
  const priceMax: Ref<number|null> = useStorage('filterPriceMax', null);
  const orderBy: Ref<string> = useStorage('filterOrderBy', 'trademark');
  const orderType: Ref<string> = useStorage('filterOrderType', 'asc');
  const sale: Ref<boolean> = useStorage('filterSale', false);
  const stock: Ref<string> = useStorage('filterStock', '');
  const discontinued: Ref<string> = useStorage('filterDiscontinued', '');
  const page: Ref<number> = useStorage('filterPage', 1);

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
    orderBy.value = 'trademark';
    orderType.value = 'asc';
    sale.value = false;
    stock.value = '';
    discontinued.value = '';
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
    orderBy.value = 'trademark';
    orderType.value = 'asc';
  }

  const resetStatus = () => {
    stock.value = '';
    discontinued.value = '';
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

    if(orderBy.value !== 'trademark' || orderType.value !== 'asc')
      queryParamsArr.push(`order=${orderBy.value},${orderType.value}`)

    if (sale.value) 
      queryParamsArr.push('sale=true')

    if (stock.value) 
      queryParamsArr.push(`stock=${stock.value}`)

    if (discontinued.value) 
      queryParamsArr.push(`discontinued=${discontinued.value}`)

    if(page.value !== 1)
      queryParamsArr.push(`page=${page.value}`)

    const queries = queryParamsArr
      .map((value, index) => {
        return index === 0 ? `?${value}` : `&${value}`;
      })
      .join('')

    return { queries };
  }

  return {
    trademarks, categories, search, stock,
    selectedTrademarks, selectedCategories, page,
    priceMin, priceMax, orderBy, orderType, sale, 
    clearFilters, clearCategories, clearTrademarks,
    clearPrices, resetOrder, applyFilters, getQueries,
    updateTrademarks, loading, discontinued, resetStatus,
  }
})