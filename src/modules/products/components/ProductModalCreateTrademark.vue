<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { Icon } from '@iconify/vue';
import InputText from 'primevue/inputtext';
import { ref, type Ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import { apiUrl, apiImageRequest, apiRequest } from '../../shared/helpers/api';
import { type ImageResponse } from '../../shared/types/image.interface';
import { type FileUploadUploaderEvent } from 'primevue/fileupload';
import type { TrademarkResponse } from '@/modules/shared/types/trademark.interface';

const emit = defineEmits<{
  (e: 'resetTrademark') :void
  (e: 'close') :void
  (e: 'resetInfo') :void
  (e: 'setTrademark', id: number) :void
}>();

const trademarkName: Ref<string|null> = ref(null);
const trademarkImage: Ref<string|null> = ref(null);

const onImageUpload = async(event: FileUploadUploaderEvent): Promise<void> => {
  const response: ImageResponse = await apiImageRequest('trademarks/images', {
    images: event.files[0],
    previousImage: trademarkImage.value,
  });

  if (!response.statusCode)
    trademarkImage.value = response.path
}

const createTrademark = async(event: Event) => {
  event.preventDefault();
  const response: TrademarkResponse = await apiRequest('trademarks', {
    method: 'POST',
    body: {
      name: trademarkName.value,
      image: trademarkImage.value
    }
  });

  if ( !response.statusCode ) {
    emit('resetInfo');
    emit('setTrademark', response.id);
    emit('close');
  }
}
</script>

<template>
  <vue-final-modal
    @before-open="emit('resetTrademark')"
    content-transition="scale"
    overlay-transition="fade"
    class="flex justify-center items-center"
    content-class="py-4 px-5 bg-[#10273d] rounded-lg shadow-md shadow-black max-w-xs w-full sm:max-w-sm h-max sm:p-6 max-h-[90vh]"
  >
    <div class="w-full h-full relative">
      <button @click="emit('close')" class="absolute -right-2 -top-2">
        <Icon
          icon="ic:round-close"
          class="w-[1.4rem] h-[1.4rem] text-white"
        />
      </button>
      
      <h3 class="text-xl sm:text-[1.4rem] font-semibold text-center mb-4 sm:mb-3">Crear marca</h3>

      <form class="w-full flex flex-col items-center justify-stretch" @submit="createTrademark">
        <div class="flex flex-col gap-2 group mb-3 sm:mb-5 w-full">
          <label
            for="productCreateTrademarkModal"
            class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
          >
            Nombre *
          </label>
          <InputText
            name="productCreateTrademarkModal"
            autocomplete="off"
            id="productCreateTrademarkModal"
            placeholder="Acondicionadores"
            required
            type="text"
            v-model="trademarkName"
          />
        </div>
        
        <div class="w-full flex flex-col gap-2 mb-6 group">
          <span
            id="createProductImage"
            class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
          >
            Imagen (opcional)
          </span>
          <FileUpload
            :auto="true"
            :choose-label="trademarkImage ? 'Escoger otra' : 'Subir'"
            :maxFileSize="2 * 1024 * 1024"
            @uploader="onImageUpload"
            aria-labelledby="createproductImage"
            accept=".jpeg,.jpg,.png,.webp,.svg"
            class="local-shadow hover:-translate-y-px text-sm"
            custom-upload
            invalid-file-size-message="Seleccione una imagen menos pesada."
            mode="basic"
          />
        </div>

        <Transition name="fade">
          <div
            v-if="trademarkImage"
            class="max-h-40 mb-4"
          >
            <img
              :src="`${apiUrl}${trademarkImage}`"
              alt=""
              class="w-full lg:max-w-xs max-h-40 object-contain"
            >
          </div>
        </Transition>
        
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