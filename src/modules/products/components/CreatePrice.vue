<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProductCreateStore } from '../stores/productCreateStore';
import { useWindowScroll } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import ToggleButton from 'primevue/togglebutton';
import { Icon } from '@iconify/vue';

const router = useRouter();
const { y } = useWindowScroll({ behavior: 'smooth'});
const createStore = useProductCreateStore();
const { price, salePrice, sale } = storeToRefs(createStore);
createStore.currentView = 3;

watch(price, (newValue) => {
  if(newValue) price.value = Number(newValue.toFixed(2));
})

watch(salePrice, (newValue) => {
  if(newValue) salePrice.value = Number(newValue.toFixed(2));
})

watch(sale, (newValue) => {
  if(!newValue) salePrice.value = null;
})

const previousStep = (event: Event) => {
  event.preventDefault();
  y.value = 0;
  router.push({ name: 'products-create-secondary' })
}

const nextStep = (event: Event) => {
  event.preventDefault();
  y.value = 0;
  router.push({ name: 'products-create-design' })
}
</script>

<template>
   <form class="w-full max-w-md mx-auto flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:max-w-3xl 2xl:gap-y-10" @submit="nextStep" id="productCreateSecondaryForm">
    <div class="flex flex-col gap-2 group col-span-2 max-w-sm w-full mx-auto">
      <label
        for="productCreatePrice"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Precio *
      </label>
      <div class="local-money-input">
        <input
          id="productCreatePrice"
          name="productCreatePrice"
          v-model="createStore.price"
          type="number"
          required
          step="0.01"
          min="0.01"
          max="99999.99"
          class="local-inset-shadow transition-all duration-300 ease-in-out"
          placeholder="60.00"
        />
        <span>Q</span>
      </div>
    </div>

    <div class="flex flex-col items-center sm:flex-row justify-center gap-6 col-span-2 w-full mx-auto">
      <ToggleButton
        input-id="productCreateSale"
        name="productCreateSale"
        v-model="createStore.sale"
        onLabel="Ofertado"
        offLabel="Sin oferta"
        onIcon="pi pi-tag"
        offIcon="pi pi-box"
        class="w-36"
        aria-label="Mostrar solo ofertas"
      />
      <ToggleButton
        input-id="productCreateDiscontinued"
        name="productCreateDiscontinued"
        v-model="createStore.discontinued"
        onLabel="Descontinuado"
        offLabel="Vigente"
        onIcon="pi pi-times"
        offIcon="pi pi-thumbs-up-fill"
        class="w-44"
        aria-label="Mostrar solo ofertas"
      />
    </div>

    <Transition name="scale">
      <div
        class="flex flex-col gap-2 group col-span-2 max-w-sm w-full mx-auto"
        v-if="createStore.sale"
      >
        <label
          for="productCreateSalePrice"
          class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
        >
          Precio de oferta *
        </label>
        <div class="local-money-input">
          <input
            id="productCreateSalePrice"
            name="productCreateSalePrice"
            v-model="createStore.salePrice"
            type="number"
            required
            step="0.01"
            min="0.01"
            max="99999.99"
            class="local-inset-shadow transition-all duration-300 ease-in-out"
            placeholder="60.00"
          />
          <span>Q</span>
        </div>
      </div>
    </Transition>

    <div class="w-full flex justify-between col-span-2 mt-4">
      <button
        class="bg-[#1A2F25] py-2 pe-4 ps-2 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#274738] flex items-center gap-1"
        type="button"
        @click="previousStep"
      >
        <Icon
          icon="ic:round-arrow-left"
          class="w-6 h-6"
        />
        Info. Secundaria
      </button>
      <button
        class="bg-[#15395A] py-2 ps-4 pe-2 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#205485] flex items-center gap-1"
        type="submit"
      >
        Diseño
        <Icon
          icon="ic:round-arrow-right"
          class="w-6 h-6"
        />
      </button>
    </div>
  </form>
</template>