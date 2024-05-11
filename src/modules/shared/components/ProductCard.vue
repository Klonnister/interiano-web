<script setup lang="ts">

const product = {
  category_id: 1,
  trademark_id: 2,
  title: "Shampoo Control Caída, Bambú Nutre y Crece",
  image: "https://media.justo.mx/products/1_20671_Shampoo_Garnier_Hair_Food_Aguacate_350ml_7509552844214.jpg",
  size: "400ml",
  description: "El mejor shampoo para la caída de cabello, nutre desde raíz a puntas y ayuda al fortalecimiento completo del cabello",
  stock: 1,
  extra_props: {
      "linea": "Pro-V"
  },
  price: 65,
  sale: true,
  sale_price: 55,
  design: 1
}
</script>

<template>
  <div class="bg-white w-full h-[12rem] relative rounded-lg overflow-hidden p-1 mx-auto">
    <div class="h-[78%] flex items-center justify-center">
      <img
        :src="product.image"
        alt=""
        class="h-full w-full object-contain"
      >
    </div>
    
    <p class="absolute bottom-2 right-0 left-0 text-center text-sm leading-4 z-20 h-[17%] overflow-hidden px-2 text-white max-w-[26ch] mx-auto">
      {{ product.title }}
    </p>
    <div class="absolute bottom-0 left-0 black-gradient w-full h-[60%] z-10">
    </div>
  </div>
</template>

<style scoped>
.black-gradient {
  background-image: linear-gradient(to bottom, #00000000, #0c152dcc);
}
</style>