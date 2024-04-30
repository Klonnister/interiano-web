<script lang="ts" setup></script>
<template>
  <div class="flex flex-col items-center justify-center | lg:flex-row lg-justify-around">
    <div
      class="flex p-[1.25rem] flex text-sm items-center justify-center | sm:text-base | lg:h-[37.5rem] border-[#9FA7C3] lg:border-r lg:w-[50%] h-full"
    >
      <div class="flex flex-col | lg:w-[31.25rem] gap-[1.875rem]">
        <img alt="Interiano logo" src="/interiano-logo-shadowed.svg" />
        <p>
          Administra la disponibilidad de tus productos y exporta tu catálogo en formato
          PDF.
        </p>
        <p>
          Inicia sesión para ingresar al administrador o realiza una prueba en modo
          invitado.
        </p>
      </div>
    </div>
    <div class="lg:h-dvh" />
    <div
      class="flex p-[1.25rem] items-center justify-center | border-[#9FA7C3] lg:h-[37.5rem] lg:border-l lg:w-[50%] h-full"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
