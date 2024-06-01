<script setup lang="ts">
import { ref, watch } from 'vue';
import InputSwitch from 'primevue/inputswitch';
import { useFilterStore } from '../stores/filterStore';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  id: number,
  name: string,
}>()

const filterStore = useFilterStore();
const { selectedTrademarks } = storeToRefs(filterStore)

const checked = ref(filterStore.selectedTrademarks.includes(props.id));

watch(checked, () => {
  if(checked.value) {
    filterStore.selectedTrademarks.push(props.id);
  } else {
    filterStore.selectedTrademarks.splice(
      filterStore.selectedTrademarks.indexOf(props.id),
      1
    );
  }
})

watch(selectedTrademarks, (selectedTrademarks) => {
  checked.value = selectedTrademarks.includes(props.id);
})
</script>

<template>
  <div class="flex items-center">
    <InputSwitch
      v-model="checked"
      :binary="true"
      :inputId="props.name"
      :name="props.name"
      class="min-w-10"
    />
    <label
      :for="props.name"
      class="ml-4 cursor-pointer"
      :class="props.name.length > 25 ? 'text-[0.8rem] my-1 lg:my-0' : 'text-[0.9rem]'"
    >
      {{ props.name }}
    </label>
  </div>
</template>