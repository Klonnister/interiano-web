<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

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
</script>

<template>
  <div class="md:hidden">
    <h1
      class="uppercase font-semibold text-2xl text-center mb-3"
    >
      {{ props.title }}
    </h1>
    <div class="flex flex-col gap-3">
      <SearchBar />
      <div class="flex gap-2">
        <CardsViewButton
          v-if="props.filtersButton"
          name="Filtros"
          icon="solar:filter-bold"
        />
        <CardsViewButton
          v-if="props.addButtonType === 'button'"
          name="Agregar"
          icon="mingcute:add-fill"
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
      class="uppercase font-semibold text-2xl text-center mb-3"
    >
      {{ props.title }}
    </h1>
      
    <div class="flex gap-2">
      <CardsViewButton
        v-if="props.filtersButton"
        name="Filtros"
        icon="solar:filter-bold"
      />

      <SearchBar />

      <CardsViewButton
        v-if="props.addButtonType === 'button'"
        icon="mingcute:add-fill"
      />
      <RouterLink
        v-if="addButtonPath && addButtonType === 'link'"
        :to="addButtonPath"
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
      class="uppercase font-semibold text-3xl text-center me-auto"
    >
      {{ props.title }}
    </h1>

    <div class="flex gap-2 items-stretch">
      <CardsViewButton
        v-if="props.filtersButton"
        name="Filtros"
        icon="solar:filter-bold"
      />

      <SearchBar />
  
      <CardsViewButton
        v-if="props.addButtonType === 'button'"
        icon="mingcute:add-fill"
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