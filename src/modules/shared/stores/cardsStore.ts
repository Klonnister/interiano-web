import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useCardsStore = defineStore('cardsStore', () => {
  const openProduct: Ref<number|null> = ref(null);

  const resetCards = () => {
    openProduct.value = null;
  }

  return { openProduct, resetCards }
})