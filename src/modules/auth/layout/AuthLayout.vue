<script lang="ts" setup></script>
<template>
  <div
    class="flex flex-col container mx-auto flex min-w-full min-h-screen items-center justify-center | lg:flex-row lg-justify-around"
  >
    <div class="flex justify-center p-10 | lg:w-[50%]">
      <div
        class="flex flex-col gap-8 text-center w-[13.5rem] | sm:w-[18.75rem] | lg:w-[20rem] | xl:w-[21rem] | 2xl:w-[23rem]"
      >
        <img class="" alt="Interiano logo" src="/interiano-logo-shadowed.svg" />
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
    <div
      class="hidden | lg:block h-[30rem] min-h-[1em] w-px bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"
    ></div>
    <div class="lg:w-[50%] items-center justify-center flex">
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
