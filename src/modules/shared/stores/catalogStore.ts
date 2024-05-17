import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useCatalogStore = defineStore('catalogStore', () => {
  const catalog: Ref<number[]> = ref([]);

  return { catalog }
})