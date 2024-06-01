<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Icon } from '@iconify/vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { useFilterStore } from '../stores/filterStore';
import { useWindowSize } from '@vueuse/core';
import { useLayoutStore } from '../stores/layoutStore';
import ToggleButton from 'primevue/togglebutton';

const { width } = useWindowSize();
const filterStore = useFilterStore();
const layoutStore = useLayoutStore();
</script>

<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    :content-transition="width < 640 ? 'vfm-slide-down' : 'vfm-slide-right'"
    @closed="layoutStore.resetLayout"
    class="flex items-end sm:justify-end"
    content-class="bg-[#0E2032] h-[88vh] w-full sm:w-[24rem] 2xl:w-[25rem] sm:min-h-screen rounded-t-2xl sm:rounded-none sm:rounded-s-2xl overflow-y-scroll hide-scroll-bar"
  > 
    <div> 
      <!-- Modal title -->
      <div class="fixed w-full sm:w-[24rem] 2xl:w-[25rem] bg-[#071524] px-8 py-4 overflow-hidden rounded-t-2xl sm:rounded-none sm:rounded-tl-2xl z-30">
        <button @click="layoutStore.resetLayout" class="fixed right-6">
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
                  <span>Estado</span>
                  <Transition name="fade">
                    <Icon
                      icon="mdi:check-bold"
                      class="text-[#6AAD41] w-[1.1rem] h-[1.1rem] opacity-60"
                      v-if="filterStore.stock || filterStore.discontinued"
                    />
                  </Transition>
                </div>
              </template>
              <FilterStatus />
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
                        filterStore.orderBy !== 'trademark' || 
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
          offLabel="Sin filtro de ofertas"
          onIcon="pi pi-tag"
          offIcon="pi pi-box"
          class="mx-auto w-52 mt-4 mb-4 quepex"
          aria-label="Mostrar solo ofertas"
        />
      </div> 
     
      <FiltersButtons />
    </div>
  </VueFinalModal>
</template>