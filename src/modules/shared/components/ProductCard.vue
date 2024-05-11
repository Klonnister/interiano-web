<script setup lang="ts">
import { ref } from 'vue';

const product = {
  category_id: 1,
  trademark_id: 2,
  title: "Shampoo Control Caída, Bambú Nutre y Crece",
  image: "https://walmartgt.vtexassets.com/arquivos/ids/296269/Shampoo-Hair-Food-De-Nutrici-n-Garnier-Fructis-Aguacate-300ml-2-38894.jpg?v=637974381717770000",
  size: "400ml",
  description: "El mejor shampoo para la caída de cabello, nutre desde raíz a puntas y ayuda al fortalecimiento completo del cabello",
  stock: 1,
  extra_props: {
      "linea": "Pro-V"
  },
  price: 65.00,
  sale: false,
  sale_price: 0,
  design: 1
}

const showMenu = ref(false);
const inCatalog = ref(true);

const openMenu = () => {
  showMenu.value = true;
}

const closeMenu = () => {
  showMenu.value = false;
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
}

const toggleCatalog = () => {
  inCatalog.value = !inCatalog.value;
}
</script>

<template>
  <div class="h-[12rem] | sm:h-[13rem] | xl:h-[14rem] 2xl:h-[16rem] bg-white w-full relative rounded-xl overflow-hidden pt-4 px-4 pb-2 mx-auto select-none cursor-pointer hover:scale-[101%] custom-shadow transition-all duration-[.4s] ease-in-out">
    <div class="h-[78%] flex items-center justify-center">
      <img
        :src="product.image"
        alt=""
        class="h-full w-full object-contain"
      >
    </div>
    
    <!-- Product title -->
    <p
      class="absolute bottom-2 right-0 left-0 text-center text-sm leading-4 2xl:leading-5 z-30 h-[17%] overflow-hidden px-2 text-white max-w-[24ch] mx-auto"
      @click="toggleMenu"
    >
      {{ product.title }}
    </p>

    <!-- Card bottom shadow -->
    <div class="absolute bottom-0 left-0 black-gradient w-full h-[60%] z-10"></div>

    <!-- Prices -->
    <p
      v-if="!product.sale"
      class="absolute top-2 right-2 font-hind text-[#534949] font-medium text-sm sm:text-base transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0': showMenu }"
    >
      Q{{ product.price.toFixed(2) }}
    </p>
    <p
      v-if="product.sale"
      class="absolute top-2 right-2 font-hind text-[#46941f] font-medium animated-text text-sm sm:text-base transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0': showMenu }"
    >
      Q{{ product.sale_price.toFixed(2) }}
    </p>

    <!-- Stock -->
    <span
      class="absolute top-2 left-3 font-hind text-[#534949] font-medium animated-text text-sm sm:text-base bg-[#ccc8c8] px-2 rounded-md lg:rounded-sm transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0': showMenu }"
    >
      {{ product.stock }}
    </span>

    <!-- Open menu layer -->
    <div
      v-if="!showMenu"
      class="absolute bottom-0 left-0 w-full h-full z-20"
      @click="openMenu"
    ></div>

    <!-- Menu layer -->
    <Transition name="fade">
      <div
        v-if="showMenu"
        class="absolute top-0 left-0 h-full w-full z-20"
      >
        <div
          class="absolute bottom-0 left-0 w-full h-full z-20 bg-black opacity-40"
          @click="closeMenu"
        ></div>
        <div class="absolute inset-0 w-32 sm:w-36 h-max flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mx-auto my-auto">

          <button class="z-30 rounded-md">
            <CardButtonBase 
              background="bg-[#15395A]"
              icon="ri:edit-2-fill"
            />
          </button>
    
          <button class="z-30 rounded-md">
            <CardButtonBase 
              background="bg-[#383838]"
              icon="mdi:eye"
            />
          </button>
    
          <button class="z-30 rounded-md">
            <CardButtonBase 
              background="bg-[#722A2A]"
              icon="ic:baseline-delete"
            />
          </button>
    
          <button class="z-30 rounded-md">
            <CardButtonBase 
              background="bg-[#522965]"
              icon="solar:box-bold"
            />
          </button>
          
          <div class="z-30 w-[2.05rem] lg:w-[2.30rem] h-[2.05rem] lg:h-[2.30rem]  relative">
            <Transition name="fade-button" mode="out-in">
              <button
                class="rounded-md absolute"
                v-if="!inCatalog"
                @click="toggleCatalog"
              >
                <CardButtonBase 
                  background="bg-[#3A5F34]"
                  icon="mdi:file-plus"
                />
              </button>
        
              <button
                class="rounded-md absolute"
                v-else
                @click="toggleCatalog"
              >
                <CardButtonBase 
                  background="bg-[#813651]"
                  icon="mdi:file-minus"
                />
              </button>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.black-gradient {
  background-image: linear-gradient(to bottom, #00000000, #0c152dcc);
}

.custom-shadow {
  box-shadow: 3px 5px 2px rgba(0,0,0, 0.35);
}

.custom-shadow:hover {
  box-shadow: 5px 8px 2px rgba(0,0,0, 0.35);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-button-enter-active,
.fade-button-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-button-enter-from {
  opacity: 0;
  transform: translateY(25%)
}

.fade-button-leave-to {
  opacity: 0;
  transform: translateY(-25%)
}

</style>