<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useWindowSize } from '@vueuse/core';
import { useLayoutStore } from '@/modules/shared/stores/layoutStore';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { computed, ref, type Ref } from 'vue';
import { apiRequest } from '@/modules/shared/helpers/api';
import { useToast } from 'vue-toastification';
import { useFilterStore } from '@/modules/shared/stores/filterStore';
import InputText from 'primevue/inputtext';
import { useProductCreateStore } from '@/modules/products/stores/productCreateStore';
import type { FileUploadUploaderEvent } from 'primevue/fileupload';
import type { ImageResponse } from '@/modules/shared/types/image.interface';
import { apiImageRequest, apiUrl } from '@/modules/shared/helpers/api';
import FileUpload from 'primevue/fileupload';
import type { TrademarkResponse } from '@/modules/shared/types/trademark.interface';

const { width } = useWindowSize();
const toast = useToast();
const layoutStore = useLayoutStore();
const filterStore = useFilterStore();
const productCreateStore = useProductCreateStore();

const loading = ref(false);
const name: Ref<string> = ref('');
const nameLength = computed(() => name.value.length)

const image: Ref<string> = ref('');
const imageLabel = computed(() => image.value ? 'Escoger otra' : 'Subir')
const imageUrl = computed(() => `${apiUrl}${image.value}`)

const onImageUpload = async(event: FileUploadUploaderEvent) => {
  const response: ImageResponse = await apiImageRequest('trademarks/images', {
    images: event.files[0],
    previousImage: image.value,
  });

  if( !response.statusCode ) 
    image.value = response.path;
}

const setLoading = () => {
  loading.value = true;
};
const resetLoading = () => {
  loading.value = false;
}

const submit = async(event: Event) => {
  event.preventDefault();
  loading.value = true;
  layoutStore.loading = true;

  const response: TrademarkResponse = await apiRequest('trademarks', {
      method: 'POST',
      body: {
        name: name.value,
        image: image.value,
      }
  })

  if (!response.statusCode) {
    toast.success('Marca creada con éxito');
    productCreateStore.createdTrademarkId = response.id;
    filterStore.applyFilters = true;
    layoutStore.resetLayout();
  } else {
    loading.value = false;
    layoutStore.loading = false;
  }

}
</script>

<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    :content-transition="width < 640 ? 'vfm-slide-down' : 'vfm-slide-right'"
    @closed="layoutStore.resetLayout"
    class="flex items-end sm:justify-end"
    content-class="bg-[#0E2032] h-[88vh] w-full sm:w-[24rem] 2xl:w-[25rem] sm:min-h-screen rounded-t-2xl sm:rounded-none sm:rounded-s-2xl overflow-y-scroll hide-scroll-bar"
  >
    <div>
      <!-- Modal title -->
      <div class="fixed w-full sm:w-[24rem] 2xl:w-[25rem] bg-[#071524] px-8 py-4 overflow-hidden rounded-t-2xl sm:rounded-none sm:rounded-tl-2xl z-30">
        <button
          @click="layoutStore.resetLayout"
          :disabled="loading"
          class="fixed right-6"
          type="button"
          aria-label="Cancelar creación de marca"
        >
          <Icon
            icon="iconamoon:close-bold"
            class="w-7 h-7 text-white"
          />
        </button>
        <p class="text-2xl text-center text-white sm:text-start">Crear marca</p>
      </div>

      <!-- Modal body -->
       <form class="flex flex-col px-8 pt-[5.5rem] pb-4 gap-6" @submit="submit">
        <div class="flex flex-col gap-2 group relative">
          <label
            for="trademarkCreateName"
            class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
          >
            Nombre *
          </label>
          <span class="text-[#A8B7EA] text-sm absolute top-0 right-0">
            ({{ nameLength }}/35)
          </span>
          <InputText
            :disabled="loading"
            autocomplete="on"
            id="trademarkCreateName"
            maxlength="35"
            name="trademarkCreateName"
            placeholder="Pantene"
            required
            v-model="name"
          />
        </div>

        <div class="flex flex-col gap-2 group">
          <span
            id="trademarkCreateImage"
            class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
          >
            Imagen (opcional)
          </span>
          <FileUpload
            :auto="true"
            :choose-label="imageLabel"
            :maxFileSize="2 * 1024 * 1024"
            @uploader="onImageUpload"
            @progress="setLoading"
            @upload="resetLoading"
            :disabled="loading"
            aria-labelledby="trademarkCreateImage"
            accept=".jpeg,.jpg,.png,.webp,.svg"
            class="local-shadow hover:-translate-y-px text-sm"
            custom-upload
            invalid-file-size-message="Seleccione una imagen menos pesada."
            mode="basic"
          />
        </div>
    
        <Transition name="fade">
          <div
            class="mx-auto lg:col-span-2"
            v-if="image"
          >
            <img
              :src="imageUrl"
              alt=""
              class="w-full lg:max-w-xs lg:max-h-[32rem] object-contain"
            >
          </div>
        </Transition>

        <div class="w-full flex justify-center">
          <button
            class="w-max bg-[#15395A] py-2 px-4 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#205485] flex items-center disabled:opacity-60 disabled:pointer-events-none gap-2"
            :disabled="loading"
            type="submit"
          >
            Crear
            <Icon
              icon="material-symbols:label"
              class="w-5 h-5"
            />
          </button>
        </div>
       </form>
    </div>
  </VueFinalModal>
</template>