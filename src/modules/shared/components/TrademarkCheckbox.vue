<script setup lang="ts">
import { ref, watch } from 'vue';
import InputSwitch from 'primevue/inputswitch';
import { useFilterStore } from '../stores/filterStore';

const props = defineProps<{
  id: number,
  name: string,
}>()

const filterStore = useFilterStore();

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