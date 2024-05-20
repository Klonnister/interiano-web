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
      class="fixed bottom-0 sm:top-0 right-0 bg-[#0E2032] h-max w-full sm:w-[22rem] 2xl:w-[25rem] sm:min-h-screen rounded-t-2xl sm:rounded-none sm:rounded-s-2xl overflow-hidden"
    > 
      <div class="bg-[#071524] px-8 py-4 overflow-hidden rounded-t-2xl sm:rounded-none">
        <button @click="emit('close')" class="fixed right-6">
          <Icon
            icon="iconamoon:close-bold"
            class="w-7 h-7 text-white"
          />
        </button>
        <p class="text-2xl text-center text-white sm:text-start">Filtros</p>
      </div>
      
      <div class="flex flex-col px-4 pt-2 pb-4">
        <Accordion>
          <AccordionTab class="bg-white">
              <template #header>
                  <div class="w-full flex items-center gap-4">
                      <span>Categorias</span>
                      <Transition name="fade">
                        <Icon
                          icon="mdi:check-bold"
                          class="text-[#6AAD41] w-[1.1rem] h-[1.1rem] opacity-80"
                          v-if="filterStore.selectedCategories.length"
                        />
                      </Transition>
                  </div>
              </template>
              <div
                class="flex flex-col gap-4"
                v-if="filterStore.categories.length"
              >
                <CategoryCheckbox
                  v-for="category in filterStore.categories"
                  :key="category.id"
                  :name="category.name"
                  :id="category.id"
                />
              </div>
              <p v-else class="text-sm">
                No hay categorías para mostrar
              </p>
          </AccordionTab>
          <AccordionTab>
              <template #header>
                <div class="w-full flex items-center gap-4">
                  <span>Marcas</span>
                  <Icon
                    icon="mdi:check-bold"
                    class="text-[#6AAD41]"
                    v-if="filterStore.selectedTrademarks.length"
                  />
                </div>
              </template>
              <div
                class="flex flex-col gap-4"
                v-if="filterStore.trademarks.length"
              >
                <TrademarkCheckbox
                  v-for="trademark in filterStore.trademarks"
                  :key="trademark.id"
                  :name="trademark.name"
                  :id="trademark.id"
                />
              </div>
              <p v-else class="text-sm">
                No hay categorías para mostrar
              </p>
          </AccordionTab>
          <AccordionTab>
              <template #header>
                <div class="w-full flex items-center gap-4">
                  <span>Por precio</span>
                  <Icon
                    icon="mdi:check-bold"
                    class="text-[#6AAD41]"
                    v-if="filterStore.priceMin || filterStore.priceMin"
                  />
                </div>
              </template>
              <div
                class="flex flex-col gap-4"
              > 
                <div class="flex flex-col gap-2">
                  <label for="priceMin" class="text-[0.90rem]">Precio mínimo</label>
                  <div class="local-money-input">
                    <input
                      id="priceMin"
                      name="priceMin"
                      v-model="filterStore.priceMin"
                      type="number"
                      class="local-inset-shadow"
                      step="0.01"
                      placeholder="1"
                    />
                    <span>Q</span>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="priceMin" class="text-[0.90rem]">Precio máximo</label>
                  <div class="local-money-input">
                    <input
                      id="priceMax"
                      name="priceMax"
                      v-model="filterStore.priceMax"
                      type="number"
                      class="local-inset-shadow"
                      step="0.01"
                      placeholder="9999"
                    />
                    <span>Q</span>
                  </div>
                </div>
              </div>
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
    </div>
  </VueFinalModal>
</template>