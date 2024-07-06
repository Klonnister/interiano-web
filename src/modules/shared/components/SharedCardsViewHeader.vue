<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import { useLayoutStore } from '../stores/layoutStore';
import { useWindowSize } from '@vueuse/core';

const props = defineProps<{
  title: string;
  addButtonPath?: RouteLocationRaw;
}>()

const { width } = useWindowSize();
const layoutStore = useLayoutStore();

const open = () => {
  if(props.title === 'productos') {
    layoutStore.showProductsMenu = true;
  }
}

const openFilters = () => {
  layoutStore.showFilters = true;
}
</script>

<template>
  <header class="md:hidden">
    <h1 class="uppercase font-semibold text-2xl sm:text-3xl text-center mb-4 sm:mb-6">
      {{ props.title }}
    </h1>
    <div class="flex flex-col gap-4">
      <FiltersSearchBar id="search1" />
      <div class="flex gap-3 sm:gap-6">

        <SharedCardsViewButton
          name="Filtros"
          icon="solar:filter-bold"
          @click="openFilters"
        />

        <RouterLink
          v-if="addButtonPath"
          :to="addButtonPath"
          class="w-full"
        >
          <SharedCardsViewButton
            name="Agregar"
            icon="icon-park-outline:plus"
          />
        </RouterLink>

        <SharedCardsViewButton
          v-else
          name="Opciones"
          icon="tabler:menu-deep"
          @click="open"
        />
      </div>
    </div>
  </header>

  <header class="hidden md:block lg:flex lg:items-center lg:gap-4">
    <h1 class="uppercase font-semibold text-[2.3rem] 2xl:text-4xl text-center mb-6 lg:mb-0 lg:me-auto lg:pe-8">
      {{ props.title }}
    </h1>
      
    <div class="flex gap-6 lg:gap-4 xl:gap-4 lg:-mt-1">
      <SharedCardsViewButton
        name="Filtros"
        icon="solar:filter-bold"
        @click="openFilters"
      />

      <FiltersSearchBar id="search2" />

      <RouterLink
        v-if="addButtonPath"
        :to="addButtonPath"
        class="w-full"
      >
        <SharedCardsViewButton
          :name="width < 1024 ? 'Agregar' : null"
          icon="icon-park-outline:plus"
          class="h-full"
        />
      </RouterLink>

      <SharedCardsViewButton
        v-else
        :name="width < 1024 ? 'Opciones' : null"
        icon="tabler:menu-deep"
        @click="open"
      />

    </div>
  </header>
</template>