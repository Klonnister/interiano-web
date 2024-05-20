<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Icon } from '@iconify/vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { useFilterStore } from '../stores/filterStore';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import ToggleButton from 'primevue/togglebutton';
import { useWindowSize } from '@vueuse/core';

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { width } = useWindowSize();
const filterStore = useFilterStore();
const { priceMin, priceMax } = storeToRefs(filterStore);

watch(priceMin, (newValue) => {
  if(newValue) {
    priceMin.value = Number(newValue.toFixed(2));
  }
})

watch(priceMax, (newValue) => {
  if(newValue) {
    priceMax.value = Number(newValue.toFixed(2));
  }
})
</script>

<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    :content-transition="width < 640 ? 'vfm-fade' : 'vfm-slide-right'"
    @closed="emit('close')"
  > 
    <div
      class="fixed bottom-0 sm:top-0 right-0 bg-[#0E2032] h-[88vh] w-full sm:w-[22rem] 2xl:w-[25rem] sm:min-h-screen rounded-t-2xl sm:rounded-none sm:rounded-s-2xl overflow-y-scroll hide-scroll-bar"
    > 
      <div class="fixed w-full sm:w-[22rem] 2xl:w-[25rem] bg-[#071524] px-8 py-4 overflow-hidden rounded-t-2xl sm:rounded-none sm:rounded-tl-2xl z-30">
        <button @click="emit('close')" class="fixed right-6">
          <Icon
            icon="iconamoon:close-bold"
            class="w-7 h-7 text-white"
          />
        </button>
        <p class="text-2xl text-center text-white sm:text-start">Filtros</p>
      </div>
      
      <div class="flex flex-col px-4 pt-[4.5rem] pb-[5rem]">
        <Accordion>
          <AccordionTab>
              <template #header>
                  <div class="w-full flex items-center gap-4">
                      <span>Categorias</span>
                      <Transition name="fade">
                        <Icon
                          icon="mdi:check-bold"
                          class="text-[#6AAD41] w-[1.1rem] h-[1.1rem] opacity-60"
                          v-if="filterStore.selectedCategories.length"
                        />
                      </Transition>
                  </div>
              </template>
              <CategoriesFilter />
          </AccordionTab>
          <AccordionTab>
              <template #header>
                <div class="w-full flex items-center gap-4">
                  <span>Marcas</span>
                  <Transition name="fade">
                    <Icon
                      icon="mdi:check-bold"
                      class="text-[#6AAD41] w-[1.1rem] h-[1.1rem] opacity-60"
                      v-if="filterStore.selectedTrademarks.length"
                    />
                  </Transition>
                </div>
              </template>
              <TrademarksFilter />
          </AccordionTab>
          <AccordionTab>
              <template #header>
                <div class="w-full flex items-center gap-4">
                  <span>Por precio</span>
                  <Transition name="fade">
                    <Icon
                      icon="mdi:check-bold"
                      class="text-[#6AAD41] w-[1.1rem] h-[1.1rem] opacity-60"
                      v-if="filterStore.priceMin || filterStore.priceMax"
                    />
                  </Transition>
                </div>
              </template>
              <PriceFilter />
          </AccordionTab>
          <AccordionTab>
              <template #header>
                <div class="w-full flex items-center gap-4">
                  <span>Orden</span>
                </div>
              </template>
              <OrderFilter />
          </AccordionTab>
        </Accordion>
        <ToggleButton
          input-id="sale"
          name="sale"
          v-model="filterStore.sale"
          onLabel="Solo ofertas"
          offLabel="Mostrar todos"
          onIcon="pi pi-tag"
          offIcon="pi pi-box"
          class="mx-auto w-44 my-4 quepex"
          aria-label="Mostrar solo ofertas"
        />
      </div> 
      <div class=" bg-[#0E2032] fixed bottom-0 py-5 flex justify-center gap-3 w-full sm:w-[22rem] 2xl:w-[25rem] sm:rounded-bl-2xl">
        <button class="bg-[#722A2A] py-2.5 w-36 rounded-lg local-shadow uppercase text-sm font-medium">
          Limpiar
        </button>
        <button class="bg-[#15395A] py-2 w-36 rounded-lg local-shadow uppercase text-sm font-medium">
          Aplicar
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>