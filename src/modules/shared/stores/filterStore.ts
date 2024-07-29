import { defineStore } from "pinia";
import { reactive, ref, type Ref } from "vue";
import type { Trademark } from "../types/trademark.interface";
import type { Category } from "../types/category.interface";
import { useStorage } from "@vueuse/core";
import type { DropdownOption, VisibleFilters } from "../types/filters.interface";

export const useFilterStore = defineStore('filterStore', () => {
  //? Variables

  //* Show filters in modal
  const visibleFilters = reactive({
    categories: false,
    trademarks: false,
    price: false,
    order: false,
    sale: false,
    status: false,
  });

  //* Filter states
  const applyFilters: Ref<boolean> = ref(false);
  const loading = ref(false);

  //* Store applicable filters
  const trademarks: Ref<Trademark[]> = ref([]);
  const categories: Ref<Category[]> = ref([]);
  const orderByOptions: Ref<DropdownOption[]> = ref([]);
  const orderTypeOptions: Ref<DropdownOption[]> = ref([]);
  
  //* Filters to apply
  const search: Ref<string> = useStorage('filterSearch', '');
  const selectedCategories: Ref<number[]> = useStorage('filterSelectedCategories', []);
  const selectedTrademarks: Ref<number[]> = useStorage('filterSelectedTrademarks', []);
  const priceMin: Ref<number|null> = useStorage('filterPriceMin', null);
  const priceMax: Ref<number|null> = useStorage('filterPriceMax', null);
  const orderBy: Ref<string> = useStorage('filterOrderBy', 'created_at');
  const orderType: Ref<string> = useStorage('filterOrderType', 'desc');
  const sale: Ref<boolean> = useStorage('filterSale', false);
  const stock: Ref<string> = useStorage('filterStock', '');
  const discontinued: Ref<string> = useStorage('filterDiscontinued', '');

  //* Paginator
  const page: Ref<number> = useStorage('filterPage', 1);
  const first: Ref<number> = useStorage('firstProductPaginator', 0)


  //? Methods available

  //* Update applicable filters info
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

  
  //* Update visible filters
  const updateVisibleFilters = ( newVisibleFilters: VisibleFilters ) => {
    visibleFilters.categories = 
      newVisibleFilters.categories ? newVisibleFilters.categories : false;

    visibleFilters.trademarks = 
      newVisibleFilters.trademarks ? newVisibleFilters.trademarks : false;

    visibleFilters.price = 
      newVisibleFilters.price ? newVisibleFilters.price : false;

    visibleFilters.order = 
      newVisibleFilters.order ? newVisibleFilters.order : false;

    visibleFilters.sale = 
      newVisibleFilters.sale ? newVisibleFilters.sale : false;

    visibleFilters.status = 
      newVisibleFilters.status ? newVisibleFilters.status : false;
  }

  //* Clear and reset filters methods
  const resetFilters = () => {
    search.value = '';
    selectedCategories.value = [];
    selectedTrademarks.value = [];
    priceMin.value = null;
    priceMax.value = null;
    orderBy.value = 'created_at';
    orderType.value = 'desc';
    sale.value = false;
    stock.value = '';
    discontinued.value = '';
    page.value = 1;
    first.value = 0;
    visibleFilters.categories = false;
    visibleFilters.trademarks = false;
    visibleFilters.price = false;
    visibleFilters.order = false;
    visibleFilters.sale = false;
    visibleFilters.status = false;
    orderByOptions.value = [];
    orderTypeOptions.value = [];
  }

  const clearFilters = () => {
    search.value = '';
    selectedCategories.value = [];
    selectedTrademarks.value = [];
    priceMin.value = null;
    priceMax.value = null;
    orderBy.value = 'created_at';
    orderType.value = 'desc';
    sale.value = false;
    stock.value = '';
    discontinued.value = '';
    page.value = 1;
    first.value = 0;
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
    orderBy.value = 'created_at';
    orderType.value = 'desc';
  }

  const resetStatus = () => {
    stock.value = '';
    discontinued.value = '';
  }

  //* Queries methods
  const getQueries = () => {
    const queryParamsArr = [];

    if (search.value) 
      queryParamsArr.push(`name=${search.value}`)

    if (selectedCategories.value.length)
      queryParamsArr.push(`categories=${selectedCategories.value.toString()}`)
    
    if (selectedTrademarks.value.length)
      queryParamsArr.push(`trademarks=${selectedTrademarks.value.toString()}`)

    if (priceMin.value) 
      queryParamsArr.push(`priceMin=${priceMin.value}`)

    if (priceMax.value) 
      queryParamsArr.push(`priceMax=${priceMax.value}`)

    if(orderBy.value !== 'created_at' || orderType.value !== 'desc')
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
    trademarks, categories, search, stock, first,
    selectedTrademarks, selectedCategories, page,
    priceMin, priceMax, orderBy, orderType, sale, 
    clearFilters, clearCategories, clearTrademarks,
    clearPrices, resetOrder, applyFilters, getQueries,
    updateTrademarks, loading, discontinued, resetStatus,
    visibleFilters, updateVisibleFilters, resetFilters,
    orderTypeOptions, orderByOptions,
  }
})