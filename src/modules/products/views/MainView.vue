<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-6 h-[200vh]">
      <CardsViewHeader
        title="productos"
        :filters-button="true"
        add-button-type="button"
      />

      <div class="grid grid-cols-2 gap-3">
        <ProductCard />
        <ProductCard />
      </div>
  </div>
</template>