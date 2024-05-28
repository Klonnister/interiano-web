<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { Icon } from '@iconify/vue';
import { useFilterStore } from '../stores/filterStore';

const props = defineProps<{
  id: string
}>();

const filterStore = useFilterStore();

const clearSearch = (event: Event) => {
  event.preventDefault();
  filterStore.search = '';
  filterStore.applyFilters = true;
}

const applyFilter = (event: Event) => {
  event.preventDefault();
  filterStore.page = 1;
  filterStore.applyFilters = true;
}
</script>

<template>
  <form @submit="applyFilter">
    <div class="w-full flex h-9 local-shadow rounded-lg md:min-w-96 lg:min-w-64 xl:min-w-96 hover:-translate-y-[1px] searchbar-transition relative transition-all duration-500 ease-in-out">
      <InputText
        type="text"
        :id="props.id"
        v-model="filterStore.search"
        placeholder="Buscar..."
        class="w-full text-sm lg:text-base"
      />
      <Transition name="fade">
        <button
          class="bg-white absolute top-0 bottom-0 h-max my-auto right-14"
          type="button"
          v-if="filterStore.search"
          @click="clearSearch"
        >
          <Icon
            icon="ic:round-close"
            class="text-[#676e69] text-lg"
          />
        </button>
      </Transition>
      <div class="w-1 bg-[#D0D9F6]"></div>
      <button
        type="button"
        class="bg-[#15395A] px-2 rounded-e-lg"
        @click="applyFilter"
        :disabled="filterStore.loading"
      >
        <Icon
          icon="ic:baseline-search"
          class="w-7 h-7"
        />
      </button>
    </div>
  </form>
</template>

<style scoped>
/* Inputtext */
.p-inputtext {
  padding: 0.6rem 1rem;
  background-color: white;
  color: #10273D;
  border-radius: 6px 0px 0px 6px;
  border: none;
  min-width: 0;
  box-shadow: none
}

.p-inputtext:focus {
  box-shadow: none
}

.p-inputtext:hover {
  box-shadow: none
}
</style>