<script setup lang="ts">
import { apiRequest } from '@/modules/shared/helpers/api';
import { useSharedFilterStore } from '@/modules/shared/stores/sharedFilterStore';
import type { CategoriesResponse, Category } from '@/modules/shared/types/category.interface';
import type { Meta, MetaInfo } from '@/modules/shared/types/product.interface';
import Paginator from 'primevue/paginator';
import { reactive, ref, type Ref } from 'vue';

const filterStore = useSharedFilterStore();
const categories: Ref<Category[]> = ref([]);
const metaInfo: MetaInfo = reactive({
  total: undefined,
  perPage: undefined,
  lastPage: undefined,
})

const updatePages = (pagesInfo: Meta) => {
  metaInfo.total = pagesInfo.total;
  metaInfo.perPage = pagesInfo.perPage;
  metaInfo.lastPage = pagesInfo.lastPage;
  // filterStore.page = pagesInfo.currentPage;
}

const getCategories = async () => {
  const categoriesResponse: CategoriesResponse = await apiRequest('categories');
  if (!categoriesResponse.statusCode) {
    categories.value = categoriesResponse.data;
    updatePages(categoriesResponse.meta);
  }  
}

getCategories();
</script>

<template>
  <div class="flex flex-col gap-8">
    <SharedCardsViewHeader
      title="Categorías"
      :add-button-path="{ name: 'dev' }"
    /> 

    <Transition name="fade" mode="out-in">
        <div v-if="categories.length && !filterStore.loading" class="w-full min-h-[40vh] lg:min-h-[70vh] 2xl:min-h-[35rem] flex flex-col justify-between">
          <ul class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 2xl:gap-10">
            <CategoriesCard
              v-for="category in categories"
              :category="category"
              :key="category.id"
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
            
          />
          <!-- @page="paginate" -->
        </div>

        <div v-else-if="filterStore.loading">
          <ProductsCardSkeleton />
        </div>
  
        <div v-else class="min-h-[40vh] lg:min-h-[65vh] flex justify-center items-center w-full">
          <p class="lg:text-xl 2xl:text-2xl opacity-70">No hay productos para mostrar</p>
        </div>
      </Transition>
  </div>
</template>