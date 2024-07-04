import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useSharedFilterStore = defineStore('sharedFilterStore', () => {
  // Loading state
  const loading = ref(false);

  // Actual filters
  const search: Ref<string> = ref('');

  // Pagination
  const first = ref(0);

  return { loading, search, first }
})