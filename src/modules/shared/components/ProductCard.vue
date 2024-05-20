<script setup lang="ts">
import { useCardsStore } from '@/modules/shared/stores/cardsStore';
import type { Product } from '@/modules/shared/types/product.interface';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useCatalogStore } from '../stores/catalogStore';
import { useToast } from 'vue-toastification';
import { apiUrl } from '../helpers/api';

const props = defineProps<{
  product: Product,
}>()

const toast = useToast();
const cardsStore = useCardsStore();
const catalogStore = useCatalogStore();

const { openProduct } = storeToRefs(cardsStore)
const { catalog } = storeToRefs(catalogStore);

const showMenu = ref(false);

const openMenu = () => {
  openProduct.value = props.product.id;
}

watch(openProduct, (newId) => {
  showMenu.value = newId === props.product.id;
})

const closeMenu = () => {
  openProduct.value = null;
}

const toggleMenu = () => {
  !showMenu.value
    ? openProduct.value = props.product.id
    : openProduct.value = null
}


const inCatalog = ref(catalog.value.includes(props.product.id));

watch(catalog.value, (newCatalog: number[]) => {
  inCatalog.value = newCatalog.includes(props.product.id);
})

const addToCatalog = () => {
  catalog.value.push(props.product.id);
  toast.success('Producto agregado al catálogo.')
}

const deleteFromCatalog = () => {
  catalog.value.splice(
    catalog.value.indexOf(props.product.id),
    1
  );
  toast.success('Producto eliminado del catálogo.')
}
</script>

<template>
  <div
    class="h-[12rem] | sm:h-[13rem] | xl:h-[14rem] 2xl:h-[16rem] bg-white w-full relative rounded-xl overflow-hidden pt-4 px-4 pb-2 mx-auto select-none cursor-pointer hover:scale-[101%] custom-shadow transition-all duration-[.4s] ease-in-out">
    <div class="h-[78%] flex items-center justify-center">
      <img :src="`${apiUrl}${props.product.image}`" alt="" class="h-full w-full object-contain">
    </div>

    <!-- Product title -->
    <p class="absolute bottom-2 right-0 left-0 text-center text-[0.82rem] lg:text-sm leading-4 lg:leading-[18px] z-30 h-[17%] overflow-hidden px-2 text-white max-w-[24ch] mx-auto"
      @click="toggleMenu">
      {{ props.product.title }}
    </p>

    <!-- Card bottom shadow -->
    <div class="absolute bottom-0 left-0 black-gradient w-full h-[60%] z-10"></div>

    <!-- Prices -->
    <p v-if="!props.product.sale"
      class="absolute top-2 right-2 font-hind text-[#534949] font-medium text-sm sm:text-base transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0': showMenu }">
      Q{{ Number(props.product.price).toFixed(2) }}
    </p>
    <p v-if="props.product.sale"
      class="absolute top-2 right-2 font-hind text-[#46941f] font-medium animated-text text-sm sm:text-base transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0': showMenu }">
      Q{{ Number(props.product.sale_price).toFixed(2) }}
    </p>

    <!-- Stock -->
    <span
      class="absolute top-2 left-3 font-hind text-[#534949] font-medium animated-text text-sm sm:text-base bg-[#ccc8c8] px-2 rounded-md lg:rounded-sm transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0': showMenu }">
      {{ props.product.stock }}
    </span>

    <!-- Open menu layer -->
    <div v-if="!showMenu" class="absolute bottom-0 left-0 w-full h-full z-20" @click="openMenu"></div>

    <!-- Menu layer -->
    <Transition name="fade">
      <div v-if="showMenu" class="absolute top-0 left-0 h-full w-full z-20">
        <div class="absolute bottom-0 left-0 w-full h-full z-20 bg-black opacity-40" @click="closeMenu"></div>

        <div
          class="absolute inset-0 w-32 sm:w-36 h-max flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mx-auto my-auto">

          <RouterLink :to="{ name: 'home' }" class="z-30 rounded-md">
            <CardButtonBase background="bg-[#15395A]" icon="ri:edit-2-fill" />
          </RouterLink>

          <RouterLink :to="{ name: 'home' }" class="z-30 rounded-md">
            <CardButtonBase background="bg-[#383838]" icon="mdi:eye" />
          </RouterLink>

          <button class="z-30 rounded-md">
            <CardButtonBase background="bg-[#722A2A]" icon="ic:baseline-delete" />
          </button>

          <RouterLink :to="{ name: 'home' }" class="z-30 rounded-md">
            <CardButtonBase background="bg-[#522965]" icon="solar:box-bold" />
          </RouterLink>

          <div class="z-30 w-[2.05rem] lg:w-[2.30rem] h-[2.05rem] lg:h-[2.30rem]  relative">
            <Transition name="swipe-up" mode="out-in">
              <button class="rounded-md absolute" v-if="!inCatalog" @click="addToCatalog">
                <CardButtonBase background="bg-[#3A5F34]" icon="mdi:file-plus" />
              </button>

              <button class="rounded-md absolute" v-else @click="deleteFromCatalog">
                <CardButtonBase background="bg-[#813651]" icon="mdi:file-minus" />
              </button>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.black-gradient {
  background-image: linear-gradient(to bottom, #00000000, #0c152dcc);
}

.custom-shadow {
  box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.35);
}

.custom-shadow:hover {
  box-shadow: 5px 8px 2px rgba(0, 0, 0, 0.35);
}
</style>