<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useLayoutStore } from '@/modules/shared/stores/layoutStore';
import { useCardsStore } from '@/modules/shared/stores/cardsStore';
import { storeToRefs } from 'pinia';
import { apiRequest, apiUrl } from '@/modules/shared/helpers/api';
import { useToast } from 'vue-toastification';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import { useModal } from 'vue-final-modal';
import CategoriesDeleteModal from '@/modules/categories/components/CategoriesDeleteModal.vue';
import type { Trademark, TrademarkResponse } from '@/modules/shared/types/trademark.interface';

const props = defineProps<{
  trademark: Trademark,
}>();

const emit = defineEmits<{
  (e: 'viewTrademarkProducts', id: number): void
}>();

const toast = useToast();
const cardsStore = useCardsStore();
const filterStore = useFilterStore();
const layoutStore = useLayoutStore();
const { openCard } = storeToRefs(cardsStore)

const imageUrl = computed(() => `${apiUrl}${props.trademark.image}`)

const showMenu = ref(cardsStore.openCard === props.trademark.id);
watch(openCard, (newId) => {
  showMenu.value = newId === props.trademark.id;
})


const openMenu = () => {
  openCard.value = props.trademark.id;
}

const closeMenu = () => {
  openCard.value = null;
}

const toggleMenu = () => {
  !showMenu.value
    ? openCard.value = props.trademark.id
    : openCard.value = null
}

// const openEditModal = () => {
//   cardsStore.editCategory = props.trademark;
//   layoutStore.showCategoriesEditModal = true;
// }

// const deleteTrademark = async () => {
//   layoutStore.loading = true;
//   const response: TrademarkResponse = await apiRequest(
//     `trademarks/${props.trademark.id}`, {
//       method: 'DELETE',
//     }
//   );

//   if (!response.statusCode) {
//     layoutStore.loading = false;
//     toast.success('Marca eliminada con éxito');
//     filterStore.applyFilters = true;
//   } else {
//     layoutStore.loading = false;
//   }
// }

// const deleteModal = useModal({
//   component: CategoriesDeleteModal,
//   attrs: {
//     name: props.trademark.name,
//     onConfirm: () => {
//       deleteModal.close();
//       deleteTrademark();
//     },
//     onCancel: () => {
//       deleteModal.close();
//     }
//   },
// });

// const openDeleteModal = () => {
//   deleteModal.open();
// }
</script>

<template>
  <li 
    class="w-full h-[7.5rem] | sm:h-[8.5rem] | xl:h-[8.5rem] 2xl:h-[10rem] relative rounded-xl overflow-hidden p-4 mx-auto select-none cursor-pointer hover:scale-[102%] custom-shadow transition-all duration-[.4s] ease-in-out"
    :class="{
      'bg-white': props.trademark.image,
      'bg-[#102A41]': !props.trademark.image,
    }"
  >
    <img
      v-if="props.trademark.image"
      :src="imageUrl"
      alt=""
      class="h-full w-full object-contain"
    >
    <p 
      class="absolute text-center inset-0 w-max h-max m-auto text-[0.9rem] sm:text-base lg:text-lg transition-all duration-300 ease-in-out"
      :class="{
        '-top-12 sm:-top-14 z-30': showMenu,
        'hidden': props.trademark.image,
      }"
      @click="toggleMenu"
    >
      {{ props.trademark.name }}
    </p>

    <!-- Open menu layer -->
    <button v-if="!showMenu" class="absolute bottom-0 left-0 w-full h-full z-20 rounded-xl" @click="openMenu" aria-label="Abrir menú de opciones del producto" type="button"></button>

    <!-- Menu layer -->
    <Transition name="fade">
      <div v-if="showMenu" class="absolute top-0 left-0 h-full w-full z-20">
        <button
          class="absolute bottom-0 left-0 w-full h-full z-20 bg-black  rounded-xl"
          :class="{
            'opacity-40': !props.trademark.image,
            'opacity-60': props.trademark.image,
          }"
          @click="closeMenu"
          aria-label="Cerrar menú de opciones del producto"
          type="button"
        ></button>

        <p
          v-if="props.trademark.image"
          class="absolute top-1.5 left-2 text-gray-300 text-sm z-30 mx-auto"
          @click="closeMenu"
        >
          {{ props.trademark.name }}
        </p>

        <!-- Toggleable menu -->
        <div
          class="absolute inset-0 w-32 sm:w-36 h-max flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mx-auto my-auto"
          :class="{
            'top-6': !props.trademark.image,
          }"
        >
          <button
            class="z-30 rounded-md"
            aria-label="Editar producto"
            type="button"
            >
            <!-- @click="openEditModal" -->
            <SharedCardButtonBase
              background="bg-[#15395A]"
              icon="ri:edit-2-fill"
            />
          </button>
          
          <button
            class="z-30 rounded-md"
            aria-label="Ver todos los productos de esta categoría"
            type="button"
            @click="emit('viewTrademarkProducts', props.trademark.id)"
          >
            <SharedCardButtonBase background="bg-[#383838]" icon="fluent:box-search-16-filled" />
          </button>
          
          <button
            class="z-30 rounded-md"
            aria-label="Eliminar producto"
            :disabled="layoutStore.loading"
            type="button"
            >
            <!-- @click="openDeleteModal" -->
            <SharedCardButtonBase background="bg-[#722A2A]" icon="ic:baseline-delete" />
          </button>
        </div>
      </div>
    </Transition>
  </li>
</template>

<style scoped>
.custom-shadow {
  box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.35);
}

.custom-shadow:hover {
  box-shadow: 5px 8px 2px rgba(0, 0, 0, 0.35);
}
</style>
