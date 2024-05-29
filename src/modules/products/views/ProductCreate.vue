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