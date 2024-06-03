<script setup lang="ts">
import { reactive, ref, watch, type Ref } from 'vue';
import type { Meta, MetaInfo, Product, ProductsResponse } from '../../shared/types/product.interface';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import { apiRequest } from '@/modules/shared/helpers/api';
import type { Category } from '@/modules/shared/types/category.interface';
import Paginator, { type PageState } from 'primevue/paginator';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/modules/shared/stores/cardsStore';
import { useLayoutStore } from '@/modules/shared/stores/layoutStore';

// Stores to use
const layoutStore = useLayoutStore();
const cardsStore = useCardsStore();
const filterStore = useFilterStore();

// Page Information
const { applyFilters } = storeToRefs(filterStore);
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

// Set loading to false for when coming from auth page
layoutStore.loading = false;

const getProducts = async () => {
  // Products request
  filterStore.loading = true;
  layoutStore.resetLayout();
  cardsStore.resetCards();
  const { queries } = filterStore.getQueries();
  const productsResponse: ProductsResponse = await apiRequest(`products${queries}`);
  if (!productsResponse.statusCode) {
    products.value = productsResponse.data;
    filterStore.updateTrademarks(productsResponse.trademarks);
    updatePages(productsResponse.meta);

    // Categories request
    if (!filterStore.categories.length) {
      const categories: Category[] = await apiRequest('categories?raw=true');
      filterStore.categories = categories;
    }
  }

  applyFilters.value = false;
  filterStore.loading = false;
}
getProducts();

const paginate = (pageState: PageState) => {
  const selectedPage = pageState.page + 1;
  if (selectedPage !== filterStore.page) {
    filterStore.page = selectedPage;
    getProducts();
  }
}

watch(applyFilters, (apply) => {
  if (apply) getProducts();
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <SharedCardsViewHeader
      title="productos"
      :filters-button="true"
      :modal-button="true"
    />

    <main class="w-full min-h-[40vh] lg:min-h-[5vh]">
      <Transition name="fade" mode="out-in">
        <div v-if="products.length && !filterStore.loading" class="w-full">
          <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 lg:gap-10 2xl:gap-14 min-h-[40vh] lg:min-h-[55vh]">
            <ProductsCard
              v-for="product in products"
              :product="product"
              :key="product.id"
            />
          </div>
          <Paginator
            v-if="metaInfo.total && metaInfo.lastPage"
            :template="{
                '640px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
            }"
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