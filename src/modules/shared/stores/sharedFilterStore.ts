import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useSharedFilterStore = defineStore('sharedFilterStore', () => {
  // Loading state
  const loading = ref(false);
  
  // Pagination
  const page = ref(1);
  const first = ref(0);

  // Actual filters
  const search: Ref<string> = ref('');

  // Apply filters
  const applyFilters = ref(false);

  const clearFilters = () => {
    page.value = 1;
    first.value = 0;
    search.value = '';
  }

  const getQueries = () => {
    const queryParamsArr = [];

    if (search.value) 
      queryParamsArr.push(`title=${search.value}`)

    const queries = queryParamsArr
      .map((value, index) => {
        return index === 0 ? `?${value}` : `&${value}`;
      })
      .join('')

    return { queries }
  }

  return { loading, search, page, first, applyFilters, clearFilters, getQueries }
})