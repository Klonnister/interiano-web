<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-8">
      <CardsViewHeader
        title="productos"
        :filters-button="true"
        add-button-type="button"
      />

      <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8 lg:gap-10 2xl:gap-14 min-h-96">
        <ProductCard />
      </div>
  </div>
</template>