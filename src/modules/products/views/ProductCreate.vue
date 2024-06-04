<script setup>
import { useToast } from 'vue-toastification';
import { useProductCreateStore } from '../stores/productCreateStore';

const toast = useToast();
const createStore = useProductCreateStore();
if (createStore.name || createStore.category || createStore.trademark || createStore.image)
  toast('Se recuperó información de un producto que se estaba creando anteriormente.')
</script>

<template>
  <div class="w-full flex flex-col gap-10 sm:px-6">
    <ProductCreateHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>