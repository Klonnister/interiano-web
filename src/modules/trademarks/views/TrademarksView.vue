<script setup lang="ts">
import { useOrderByDefaults } from '@/modules/shared/composables/orderByDeafults';
import { apiRequest } from '@/modules/shared/helpers/api';
import { useCardsStore } from '@/modules/shared/stores/cardsStore';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import { useLayoutStore } from '@/modules/shared/stores/layoutStore';
import type { Meta, MetaInfo } from '@/modules/shared/types/apiResponse.interface';
import type { Trademark } from '@/modules/shared/types/trademark.interface';
import { storeToRefs } from 'pinia';
import Paginator, { type PageState } from 'primevue/paginator';
import { reactive, ref, watch, type Ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import type { TrademarksResponse } from '../../shared/types/trademark.interface';

// Stores to use
const router = useRouter();
const cardsStore = useCardsStore();
const layoutStore = useLayoutStore();
const filterStore = useFilterStore();
const orderByDefaults = useOrderByDefaults();

// Page variables
const { applyFilters, search } = storeToRefs(filterStore);
const trademarks: Ref<Trademark[]> = ref([]);
const searchTrademark: Ref<number> = ref(0);
const metaInfo: MetaInfo = reactive({
  total: undefined,
  perPage: undefined,
  lastPage: undefined,
})

const updatePages = (pagesInfo: Meta) => {
  metaInfo.total = pagesInfo.total;
  metaInfo.perPage = pagesInfo.perPage;
  metaInfo.lastPage = pagesInfo.lastPage;
  filterStore.page = pagesInfo.currentPage;
}

filterStore.updateVisibleFilters({
  order: true,
});
filterStore.orderByOptions = orderByDefaults.categoriesAndTrademarks;

const getTrademarks = async () => {
  // Categories request
  filterStore.loading = true;
  layoutStore.resetLayout();
  cardsStore.resetCards();

  const { queries } = filterStore.getQueries();
  const trademarksResponse: TrademarksResponse = await apiRequest(`trademarks${queries}`);
  if (!trademarksResponse.statusCode) {
    trademarks.value = trademarksResponse.data;
    updatePages(trademarksResponse.meta);
  }

  applyFilters.value = false;
  filterStore.loading = false;
}

getTrademarks();

const paginate = (pageState: PageState) => {
  const selectedPage = pageState.page + 1;
  if (selectedPage !== filterStore.page) {
    filterStore.page = selectedPage;
    filterStore.first = pageState.first;
    getTrademarks();
  }
}

const updateTrademarkSearch = (id: number) => {
  searchTrademark.value = id;
  router.push({ name: 'products' })
}

watch(search, (newSearch) => {
  if (!newSearch) getTrademarks();
})

watch(applyFilters, (apply) => {
  if (apply) getTrademarks();
})

onBeforeRouteLeave((to) => {
  if (!to.fullPath.includes('trademarks')) 
    filterStore.clearFilters();

  if (searchTrademark.value)
    filterStore.selectedTrademarks.push(searchTrademark.value)
})
</script>

<template>
   <div class="flex flex-col gap-8">
    <SharedCardsViewHeader
      title="marcas"
      :createModal="true"
    /> 

    <Transition name="fade" mode="out-in">
        <div v-if="trademarks.length && !filterStore.loading" class="w-full min-h-[40vh] lg:min-h-[70vh] 2xl:min-h-[35rem] flex flex-col justify-between">
          <ul class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 2xl:gap-10">
            <TrademarksCard
              v-for="trademark in trademarks"
              :trademark="trademark"
              :key="trademark.id"
              @view-trademark-products="updateTrademarkSearch"
            />
          </ul>
          <Paginator
            v-if="metaInfo.total && metaInfo.lastPage"
            :template="{
                '640px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
            }"
            v-model:first="filterStore.first"
            current-page-report-template="({currentPage} de {totalPages})"
            :rows="metaInfo.perPage"
            :totalRecords="metaInfo.total"
            class="w-max mx-auto mt-10"
            @page="paginate"
          />
        </div>

        <div v-else-if="filterStore.loading">
          <CategoriesCardSkeleton />
        </div>
  
        <div v-else class="min-h-[40vh] lg:min-h-[65vh] flex justify-center items-center w-full">
          <p class="lg:text-xl 2xl:text-2xl opacity-70">No hay productos para mostrar</p>
        </div>
      </Transition>
  </div>
</template>