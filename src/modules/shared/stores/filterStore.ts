import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore('filterStore', () => {
  const search = ref();

  return {
    search,
  }
})