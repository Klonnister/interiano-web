<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import { useLayoutStore } from '../stores/layoutStore';

interface Props {
  title: string
  filtersButton?: boolean
  addButtonType: 'button' | 'link'
  addButtonPath?: RouteLocationRaw
}

const props = withDefaults(defineProps<Props>(), {
  filtersButton: false,
  addButtonType: 'button'
})

const layoutStore = useLayoutStore();

const open = () => {
  if(props.title === 'productos') {
    layoutStore.showProductsMenu = true;
  }
}

const openFilters = () => {
  if(props.filtersButton) {
    layoutStore.showFilters = true;
  }
}
</script>

<template>
  <div class="md:hidden">
    <h1
      class="uppercase font-semibold text-2xl sm:text-3xl text-center mb-4 sm:mb-6"
    >
      {{ props.title }}
    </h1>
    <div class="flex flex-col gap-4">
      <SearchBar id="search1" />
      <div class="flex gap-3 sm:gap-6">
        <CardsViewButton
          v-if="props.filtersButton"
          name="Filtros"
          icon="solar:filter-bold"
          @click="openFilters"
        />
        <CardsViewButton
          v-if="props.addButtonType === 'button'"
          name="Agregar"
          icon="mingcute:add-fill"
          @click="open"
        />
        <RouterLink
          v-if="addButtonPath && addButtonType === 'link'"
          :to="addButtonPath"
          class="w-full"
        >
          <CardsViewButton
            name="Agregar"
            icon="mingcute:add-fill"
          />
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="hidden md:block lg:hidden">
    <h1
      class="uppercase font-semibold text-3xl text-center mb-6"
    >
      {{ props.title }}
    </h1>
      
    <div class="flex gap-6">
      <CardsViewButton
        v-if="props.filtersButton"
        name="Filtros"
        icon="solar:filter-bold"
        @click="openFilters"
      />

      <SearchBar id="search2" :class="{ 'md:w-96': !props.filtersButton }" />

      <CardsViewButton
        v-if="props.addButtonType === 'button'"
        name="Agregar"
        icon="mingcute:add-fill"
        @click="open"
      />
      <RouterLink
        v-if="addButtonPath && addButtonType === 'link'"
        :to="addButtonPath"
        :class="{'w-full': props.filtersButton} "
      >
        <CardsViewButton
          name="Agregar"
          icon="mingcute:add-fill"
        />
      </RouterLink>
    </div>
  </div>

  <div class="hidden lg:flex items-center">
    <h1
      class="uppercase font-semibold text-3xl 2xl:text-4xl text-center me-auto pe-8"
    >
      {{ props.title }}
    </h1>

    <div class="flex gap-4 xl:gap-4 items-stretch">
      <CardsViewButton
        v-if="props.filtersButton"
        name="Filtros"
        icon="solar:filter-bold"
        @click="openFilters"
      />

      <SearchBar id="search3" />
  
      <CardsViewButton
        v-if="props.addButtonType === 'button'"
        icon="mingcute:add-fill"
        :shrink="true"
        @click="open"
      />
      
      <RouterLink
        v-if="addButtonPath && addButtonType === 'link'"
        :to="addButtonPath"
      >
        <CardsViewButton
          icon="mingcute:add-fill"
          :shrink="true"
        />
      </RouterLink>
    </div>

  </div>
</template>