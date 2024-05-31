<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core';
import { useProductCreateStore } from '../stores/productCreateStore';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

// Stores and tools
const { width } = useWindowSize();
const { y } = useWindowScroll({ behavior: 'smooth'});
const router = useRouter();
const toast = useToast();
const createStore = useProductCreateStore();

// Setting view info
createStore.currentView = 2;

const showAddProp = ref(false);
const propLabel = ref(null);
const propValue = ref(null);

// Show and hide add prop inputs
const toggleShowAdd = () => {
  showAddProp.value = !showAddProp.value;
}

// Adding and deleting props methods
const addProp = (event: Event) => {
  event.preventDefault();
  if(!propLabel.value) {
    toast.error('Agrega un nombre para la propiedad.');
    return;
  }
  if(!propValue.value) {
    toast.error('Agrega un valor para la propiedad.');
    return;
  }

  createStore.extraProps[propLabel.value] = propValue.value;
  propLabel.value = null;
  propValue.value = null;
}

const deleteProp = (key: string|number) => {
  delete createStore.extraProps[key];
}

// Form submittion methods and going back to previous step

const preventNext = (event: Event) => {
  event.preventDefault();
  return;
}

const previousStep = (event: Event) => {
  event.preventDefault();
  y.value = 0;
  router.push({ name: 'products-create-main' })
}

const nextStep = (event: Event) => {
  event.preventDefault();
  y.value = 0;
  router.push({ name: 'products-create-price' })
}
</script>

<template>
  <form class="w-full max-w-md mx-auto flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:max-w-3xl 2xl:gap-y-10" @submit="nextStep" id="productCreateSecondaryForm">
    <div class="flex flex-col gap-2 group">
      <label
        for="productCreateSize"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Tamaño (opcional)
      </label>
      <InputText
        name="productCreateSize"
        autocomplete="on"
        :disabled="createStore.loading"
        id="productCreateSize"
        placeholder="650 ml"
        v-model="createStore.size"
      />
    </div>

    <div class="flex flex-col gap-2 group">
      <label
        for="productCreateStock"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Existencias *
      </label>
      <input
        id="productCreateStock"
        name="productCreateStock"
        v-model="createStore.stock"
        type="number"
        required
        step="1"
        class="local-inset-shadow transition-all duration-300 ease-in-out"
        placeholder="5"
      />
    </div>

    <div class="flex flex-col gap-2 group col-span-2 relative">
      <label
        for="productCreateDescription"
        class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
      >
        Descripción (opcional)
      </label>
      <span class="text-[#A8B7EA] text-sm absolute top-0 right-0">
        ({{ createStore.description.length }}/500)
      </span>
      <Textarea
        id="productCreateDescription"
        name="productCreateDescription"
        v-model="createStore.description"
        autoResize
        placeholder="Nuevo Shampoo Pantene, nutre desde la raíz a las puntas y ayuda al fortalecimiento completo del cabello"
        :rows="width > 1024 ? '4' : '6'"
      />
    </div>

    <div class="flex flex-col gap-4 col-span-2 w-full mt-4">
      <p class="text-2xl text-center">Otras características (Opcional)</p>
      
      <form
        id="createProductAddedProps"
        class="w-full flex flex-col max-w-sm mx-auto"
        @submit="preventNext"
      >
        <div
          class="flex items-end gap-4 py-2"
          v-for="(value, key) in createStore.extraProps"
          :key="key"
        >
          <div class="grow flex flex-col gap-1">
            <label
              :for="`productCreateProp${key}`"
              class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
            >
              {{ key }}
            </label>
            <InputText
              autocomplete="on"
              :disabled="createStore.loading"
              required
              :id="`productCreateProp${key}`"
              placeholder="Blanco"
              v-model="createStore.extraProps[key]"
            />
          </div>
          <button
            class="p-2 bg-[#722A2A] rounded-lg mb-2 local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#8f2f2f]"
            type="button"
            @click="deleteProp(key)"
          >
          <Icon
            icon="material-symbols-light:delete"
            class="w-5 h-5"
          />
        </button>
        </div>
      </form>

      <div class="w-full flex flex-col gap-2">
        <Transition name="fade">
          <form id="createProductPropForm" class="w-full flex flex-col sm:flex-row sm:items-end gap-6 px-6 py-3 mb-4" v-if="showAddProp" @submit="addProp">
            <div class="grow flex flex-col gap-2 group">
              <label
                for="productCreatePropLabel"
                class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
              >
                Característica
              </label>
              <InputText
                name="productCreatePropLabel"
                autocomplete="on"
                :disabled="createStore.loading"
                id="productCreatePropLabel"
                placeholder="Línea"
                v-model="propLabel"
              />
            </div>
            <div class="grow flex flex-col gap-2 group">
              <label
                for="productCreatePropValue"
                class="text-[#A8B7EA] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:text-[#d0d9f6]"
              >
                Valor
              </label>
              <InputText
                name="productCreatePropValue"
                autocomplete="off"
                :disabled="createStore.loading"
                id="productCreatePropValue"
                placeholder="Pro-V"
                v-model="propValue"
              />
            </div>
            <button
              class="p-2 bg-[#15395A] rounded-lg mb-2 local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#204b73] w-max mx-auto sm:mx-none"
              type="submit"
              @click="addProp"
            >
              <Icon
                icon="mingcute:add-fill"
                class="w-4 h-4"
              />
            </button>
          </form>
        </Transition>
      <button
        class="w-max hover:-translate-y-0.5 px-4 py-1 transition-all duration-300 ease-in-out mx-auto rounded-lg bg-[#15395A] local-shadow"
        type="button"
        @click="toggleShowAdd"
      >
        {{ showAddProp ? 'Esconder' : 'Agregar' }}
      </button>
      </div>
    </div>

    <div class="w-full flex justify-between col-span-2 mt-4">
      <button
        class="bg-[#1A2F25] py-2 pe-4 ps-2 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#274738] flex items-center gap-1"
        type="button"
        @click="previousStep"
      >
        <Icon
          icon="ic:round-arrow-left"
          class="w-6 h-6"
        />
        Info. Principal
      </button>
      <button
        class="bg-[#15395A] py-2 ps-4 pe-2 rounded-md local-shadow hover:-translate-y-0.5 transition-all duration-500 ease-in-out hover:bg-[#205485] flex items-center gap-1"
        type="submit"
      >
        Precio
        <Icon
          icon="ic:round-arrow-right"
          class="w-6 h-6"
        />
      </button>
    </div>
  </form>
</template>