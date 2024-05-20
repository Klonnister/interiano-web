<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFilterStore } from '../stores/filterStore';
import InputSwitch from 'primevue/inputswitch';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  id: number,
  name: string,
}>()

const filterStore = useFilterStore();
const { selectedCategories } = storeToRefs(filterStore);

const checked = ref(filterStore.selectedCategories.includes(props.id));

watch(checked, () => {
  if(checked.value) {
    filterStore.selectedCategories.push(props.id);
  } else {
    filterStore.selectedCategories.splice(
      filterStore.selectedCategories.indexOf(props.id),
      1
    );
  }
})

watch(selectedCategories, (categories) => {
  checked.value = categories.includes(props.id);
})
</script>

<template>
  <div class="flex items-center">
    <InputSwitch
      v-model="checked"
      :binary="true"
      :inputId="props.name"
      :name="props.name"
    />
    <label
      :for="props.name"
      class="ml-4 text-[0.9rem]"
    >
      {{ props.name }}
    </label>
  </div>
</template>