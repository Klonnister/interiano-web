<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Icon } from '@iconify/vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { useFilterStore } from '../stores/filterStore';
import ToggleButton from 'primevue/togglebutton';
import { useWindowSize } from '@vueuse/core';

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { width } = useWindowSize();
const filterStore = useFilterStore();
</script>

<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    :content-transition="width < 640 ? 'vfm-fade' : 'vfm-slide-right'"
    @closed="emit('close')"
  > 
    <div
      class="fixed bottom-0 sm:top-0 right-0 bg-[#0E2032] h-[88vh] w-full sm:w-[24rem] 2xl:w-[25rem] sm:min-h-screen rounded-t-2xl sm:rounded-none sm:rounded-s-2xl overflow-y-scroll hide-scroll-bar"
    > 
      <!-- Modal title -->
      <div class="fixed w-full sm:w-[24rem] 2xl:w-[25rem] bg-[#071524] px-8 py-4 overflow-hidden rounded-t-2xl sm:rounded-none sm:rounded-tl-2xl z-30">
        <button @click="emit('close')" class="fixed right-6">
          <Icon
            icon="iconamoon:close-bold"
            class="w-7 h-7 text-white"
          />
        </button>
        <p class="text-2xl text-center text-white sm:text-start">Filtros</p>
      </div>

      <!-- Modal body -->
      <div class="flex flex-col px-4 pt-[4.5rem] pb-[8rem]">
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
                  <Transition name="fade">
                    <Icon
                      icon="mdi:check-bold"
                      class="text-[#6AAD41] w-[1.1rem] h-[1.1rem] opacity-60"
                      v-if="
                        filterStore.orderBy !== 'price' || 
                        filterStore.orderType !== 'asc'
                      "
                    />
                  </Transition>
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
          class="mx-auto w-44 mt-4 mb-4 quepex"
          aria-label="Mostrar solo ofertas"
        />
        <ToggleButton
          input-id="onlyStock"
          name="onlyStock"
          v-model="filterStore.onlyStock"
          onLabel="Ocultar sin existencias"
          offLabel="Mostrar sin existencias"
          onIcon="pi pi-eye-slash"
          offIcon="pi pi-eye"
          class="mx-auto w-60"
          aria-label="Mostrar sin existencias"
        />
      </div> 
      
      <FiltersButtons />
    </div>
  </VueFinalModal>
</template>