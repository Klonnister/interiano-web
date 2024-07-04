<script setup lang="ts">
import { ref, watch } from 'vue';
import { type Category } from '../../shared/types/category.interface';
import { useLayoutStore } from '@/modules/shared/stores/layoutStore';
import { useCardsStore } from '@/modules/shared/stores/cardsStore';
import { storeToRefs } from 'pinia';
const props = defineProps<{
  category: Category,
}>();

const cardsStore = useCardsStore();
const layoutStore = useLayoutStore();
const { openProduct } = storeToRefs(cardsStore)

const showMenu = ref(cardsStore.openProduct === props.category.id);
watch(openProduct, (newId) => {
  showMenu.value = newId === props.category.id;
})


const openMenu = () => {
  openProduct.value = props.category.id;
}

const closeMenu = () => {
  openProduct.value = null;
}

const toggleMenu = () => {
  !showMenu.value
    ? openProduct.value = props.category.id
    : openProduct.value = null
}
</script>

<template>
  <li 
    class="bg-[#102A41] w-full h-[7.5rem] | sm:h-[8.5rem] | xl:h-[8.5rem] 2xl:h-[10rem] relative rounded-xl overflow-hidden py-4 px-4 mx-auto select-none cursor-pointer hover:scale-[102%] custom-shadow transition-all duration-[.4s] ease-in-out"
  >
    <p 
      class="absolute text-center inset-0 w-max h-max m-auto text-[0.9rem] sm:text-base lg:text-lg transition-all duration-300 ease-in-out"
      :class="{ '-top-12 sm:-top-14 z-30': showMenu }"
      @click="toggleMenu"
    >
      {{ props.category.name }}
    </p>

    <!-- Open menu layer -->
    <button v-if="!showMenu" class="absolute bottom-0 left-0 w-full h-full z-20 rounded-xl" @click="openMenu" aria-label="Abrir menú de opciones del producto" type="button"></button>

    <!-- Menu layer -->
    <Transition name="fade">
      <div v-if="showMenu" class="absolute top-0 left-0 h-full w-full z-20">
        <button class="absolute bottom-0 left-0 w-full h-full z-20 bg-black opacity-40 rounded-xl" @click="closeMenu" aria-label="Cerrar menú de opciones del producto" type="button"></button>

        <!-- Toggleable menu -->
        <div
          class="absolute inset-0 w-32 sm:w-36 h-max flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 top-6 mx-auto my-auto">

          <RouterLink
            :to="{ name: 'dev' }"
            class="z-30 rounded-md"
            aria-label="Editar producto"
          >
            <SharedCardButtonBase background="bg-[#15395A]" icon="ri:edit-2-fill" />
          </RouterLink>
          
          <RouterLink
            :to="{ name: 'dev' }"
            class="z-30 rounded-md"
            aria-label="Editar existencias"
          >
            <SharedCardButtonBase background="bg-[#383838]" icon="fluent:box-search-16-filled" />
          </RouterLink>
          
          <button
            class="z-30 rounded-md"
            aria-label="Eliminar producto"
            :disabled="layoutStore.loading"
          >
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