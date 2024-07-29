<script setup lang="ts">
import { reactive, ref, watch, type Ref } from 'vue';
import type { Product, ProductsResponse } from '../../shared/types/product.interface';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import { apiRequest } from '@/modules/shared/helpers/api';
import type { RawCategoriesResponse } from '@/modules/shared/types/category.interface';
import Paginator, { type PageState } from 'primevue/paginator';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/modules/shared/stores/cardsStore';
import { useLayoutStore } from '@/modules/shared/stores/layoutStore';
import { onBeforeRouteLeave } from 'vue-router';
import type { Meta, MetaInfo } from '@/modules/shared/types/apiResponse.interface';
import { useOrderByDefaults } from '@/modules/shared/composables/orderByDeafults';

// Stores to use
const orderByDefaults = useOrderByDefaults();
const layoutStore = useLayoutStore();
const cardsStore = useCardsStore();
const filterStore = useFilterStore();

// Page Information
const products: Ref<Product[]> = ref([]);
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

// Filters configuration
const { applyFilters, search } = storeToRefs(filterStore);
filterStore.updateVisibleFilters({
  categories: true,
  trademarks: true,
  price: true,
  order: true,
  sale: true,
  status: true,
});
filterStore.orderByOptions = orderByDefaults.products;

const getProducts = async () => {
  // Configure page loading, layour and cards.
  layoutStore.loading = false;
  filterStore.loading = true;
  layoutStore.resetLayout();
  cardsStore.resetCards();

  // Apply filters and send request  
  const { queries } = filterStore.getQueries();
  const productsResponse: ProductsResponse = await apiRequest(`products${queries}`);
  const categoriesResponse: RawCategoriesResponse = await apiRequest('categories?raw=true');

  if (!productsResponse.statusCode && !categoriesResponse.statusCode ) {
    products.value = productsResponse.data;
    filterStore.categories = categoriesResponse.data;
    filterStore.updateTrademarks(productsResponse.trademarks);
    updatePages(productsResponse.meta);
  }

  applyFilters.value = false;
  filterStore.loading = false;
}
getProducts();

const paginate = (pageState: PageState) => {
  const selectedPage = pageState.page + 1;
  if (selectedPage !== filterStore.page) {
    filterStore.page = selectedPage;
    filterStore.first = pageState.first;
    getProducts();
  }
}

watch(search, (newSearch) => {
  if (!newSearch) getProducts();
})

watch(applyFilters, (apply) => {
  if (apply) getProducts();
})

onBeforeRouteLeave((to) => {
  if (!to.fullPath.includes('productos')) 
    filterStore.resetFilters();
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <SharedCardsViewHeader
      title="productos"
    />

    <main class="w-full min-h-[40vh] lg:min-h-[5vh]">
      <Transition name="fade" mode="out-in">
        <div v-if="products.length && !filterStore.loading" class="w-full">
          <ul class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 lg:gap-10 2xl:gap-14 min-h-[40vh] lg:min-h-[55vh]">
            <ProductsCard
              v-for="product in products"
              :product="product"
              :key="product.id"
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
          <ProductsCardSkeleton />
        </div>
  
        <div v-else class="min-h-[40vh] lg:min-h-[65vh] flex justify-center items-center w-full">
          <p class="lg:text-xl 2xl:text-2xl opacity-70">No hay productos para mostrar</p>
        </div>
      </Transition>
    </main>
  </div>
</template>