<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useProductCreateStore } from '../stores/productCreateStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '@/modules/shared/helpers/api';

const createStore = useProductCreateStore();
const router = useRouter();

const restart = async() => {
  createStore.loading = true;
  if (createStore.image) {
    await apiRequest('images', {
      method: 'DELETE',
      body: {
        image: createStore.image,
      }
    })
  }
  createStore.resetProductCreate();
  router.push({ name: 'product-create-main' })
  createStore.loading = false;
}

const mainInfoValidation = computed(() => ({
  'border-white': createStore.currentView === 1,
  'border-[#A8B7EA00]': createStore.currentView !== 1,
  'pointer-events-none': createStore.loading || createStore.currentView === 1,
  'opacity-70 hover:opacity-100': createStore.currentView !== 1 && !createStore.loading,
  'opacity-40': createStore.loading && createStore.currentView !== 1,
}));

const secondaryInfoValidation = computed(() => ({
  'border-white': createStore.currentView === 2,
  'border-[#A8B7EA00]': createStore.currentView !== 2,
  'pointer-events-none': createStore.loading || createStore.currentView === 2,
  'opacity-70 hover:opacity-100': createStore.currentView !== 2 && !createStore.loading,
  'opacity-40': createStore.loading && createStore.currentView !== 2,
}));

const priceValidation = computed(() => ({
  'border-white': createStore.currentView === 3,
  'border-[#A8B7EA00]': createStore.currentView !== 3,
  'pointer-events-none': createStore.loading || createStore.currentView === 3,
  'opacity-70 hover:opacity-100': createStore.currentView !== 3 && !createStore.loading,
  'opacity-40': createStore.loading && createStore.currentView !== 3,
}));

const designValidation = computed(() => ({
  'border-white': createStore.currentView === 4,
  'border-[#A8B7EA00]': createStore.currentView !== 4,
  'pointer-events-none': createStore.loading || createStore.currentView === 4,
  'opacity-70 hover:opacity-100': createStore.currentView !== 4 && !createStore.loading,
  'opacity-40': createStore.loading && createStore.currentView !== 4,
}));

const tabIndexLink = computed(() => createStore.loading ? '-1' : '0')

const ariaDisabledProps = computed(() => ({
  main: Boolean(createStore.loading || createStore.currentView === 1),
  secondary: Boolean(createStore.loading || createStore.currentView === 2),
  price: Boolean(createStore.loading || createStore.currentView === 3),
  design: Boolean(createStore.loading || createStore.currentView === 4),
}))

const ariaCurrentProps = computed(() => ({
  main: createStore.currentView === 1 ? 'step' : 'false',
  secondary: createStore.currentView === 2 ? 'step' : 'false',
  price: createStore.currentView === 3 ? 'step' : 'false',  
  design: createStore.currentView === 4 ? 'step' : 'false',
}))
</script>

<template>
  <header class="w-full flex flex-col gap-5 sm:gap-6 relative">
    <h1 class="text-center uppercase text-2xl sm:text-3xl 2xl:text-4xl font-semibold">
      Crear Producto
    </h1>

    <ProductCreateHeaderTitle class="sm:hidden"/>

    <div role="menu" class="hidden sm:flex w-full justify-center gap-8">
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-white border-b relative"
        :class="mainInfoValidation"
        :tabindex="tabIndexLink"
        :aria-disabled="ariaDisabledProps.main"
        :aria-current-value="ariaCurrentProps.main"
        :to="{ name: 'product-create-main' }"
      >
        <span>Info. Principal</span>
        <Transition name="fade">
          <Icon
            v-if="createStore.category && createStore.trademark && createStore.name && createStore.image"
            icon="mdi:check-bold"
            class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2"
          />
        </Transition>
      </router-link>
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-white border-b relative"
        :class="secondaryInfoValidation"
        :tabindex="tabIndexLink"
        :aria-current-value="ariaCurrentProps.secondary"
        :aria-disabled="ariaDisabledProps.secondary"
        :to="{ name: 'product-create-secondary' }"
      >
        <span>Info. Secundaria</span>
        <Transition name="fade">
          <Icon
            v-if="typeof createStore.stock === 'number' && !String(createStore.stock).includes('.')"
            icon="mdi:check-bold"
            class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2"
          />
        </Transition>
      </router-link>
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-white border-b relative"
        :class="priceValidation"
        :tabindex="tabIndexLink"
        :aria-current-value="ariaCurrentProps.price"
        :aria-disabled="ariaDisabledProps.price"
        :to="{ name: 'product-create-price' }"
      >
        <span>Precio</span>    
        <Transition name="fade">
          <Icon
            v-if="createStore.price"
            icon="mdi:check-bold"
            class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2"
          />
        </Transition>
      </router-link>
      <router-link
        class="px-4 py-1 transition-all duration-300 ease-in-out text-white border-b relative"
        :class="designValidation"
        :tabindex="tabIndexLink"
        :aria-current-value="ariaCurrentProps.design"
        :aria-disabled="ariaDisabledProps.design"
        :to="{ name: 'product-create-design' }"
      >
        <span>Diseño</span>
        <Transition name="fade">
          <Icon
            v-if="createStore.design"
            icon="mdi:check-bold"
            class="w-4 h-4 text-[#468222] absolute top-1.5 -right-2"
          />
        </Transition>
      </router-link>
    </div>

    <Transition name="fade" mode="out-in">
      <div
        v-if="createStore.loading"
        class="absolute top-1 right-4 md:right-20 lg:right-0 xl:right-20 2xl:right-36 opacity-80"
      >
        <Icon
          icon="mingcute:loading-fill"
          class="animate-spin h-5 w-5"
        />
      </div>
      <button
        v-else
        class="local-shadow absolute top-1 right-4 sm:right-8 md:right-24 lg:right-0 xl:right-14 2xl:right-36 bg-[#061321] rounded-md p-0.5 hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
        type="button"
        aria-label="Reiniciar creación de producto"
        @click="restart"
      >
        <Icon
          icon="solar:restart-bold"
          class="h-4 w-4 sm:h-5 sm:w-5"
        />
      </button>
    </Transition>
  </header>
</template>