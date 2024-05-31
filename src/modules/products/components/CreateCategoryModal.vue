<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { apiRequest } from '../../shared/helpers/api';
import { Icon } from '@iconify/vue';

const emit = defineEmits<{
  (e: 'resetCategory'):void,
  (e: 'resetInfo'):void,
  (e: 'setCategory', id: number): void
  (e: 'close'):void,
}>();

const categoryName = ref(null);

const createCategory = async(event: Event) => {
  event.preventDefault();
  const response: CategoryResponse = await apiRequest('categories', {
    method: 'POST',
    body: { name: categoryName.value }
  })

  if(!response.statusCode) {
    emit('resetInfo');
    emit('close');
    emit('setCategory', response.id);
  }
}
</script>

<template>
  <vue-final-modal
    @before-open="emit('resetCategory')"
    content-transition="scale"
    overlay-transition="fade"
    class="flex items-center justify-center"
    content-class="max-w-xs w-full sm:max-w-sm h-max py-4 px-5 sm:p-6 rounded-lg shadow-md shadow-black bg-[#10273d]"
  >
    <div class="w-full h-full relative">
      <button @click="emit('close')" class="absolute -right-2 -top-2">
        <Icon
          icon="ic:round-close"
          class="w-[1.4rem] h-[1.4rem] text-white"
        />
      </button>
      
      <h3 class="text-xl sm:text-[1.4rem] font-semibold text-center mb-4 sm:mb-3">Crear categoría</h3>

      <form class="w-full flex flex-col items-center justify-stretch" @submit="createCategory">
        <div class="flex flex-col gap-2 group mb-4 sm:mb-5 w-full">
          <label
            for="productCreateCategoryModal"
            class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
          >
            Nombre *
          </label>
          <InputText
            name="productCreateCategoryModal"
            autocomplete="off"
            id="productCreateCategoryModal"
            placeholder="Acondicionadores"
            required
            type="text"
            v-model="categoryName"
          />
        </div>
  
        <button
          class="py-1 px-5 bg-[#15395A] rounded-md font-medium font-asap w-max local-shadow transition-all duration-300 ease-in-out hover:-translate-y-0.5"
          type="submit"
        >
          Crear
        </button>
      </form>
    </div>
  </vue-final-modal>
</template>