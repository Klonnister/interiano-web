<script lang="ts" setup></script>
<template>
  <div
    class="flex flex-col container mx-auto min-h-screen items-center justify-center | lg:flex-row lg-justify-around max-w-72 | sm:max-w-80 lg:max-w-none"
  >
  <!-- layout -->
    <div class="flex justify-center py-10 | lg:w-[50%]">
      <div
        class="flex flex-col gap-8 w-full text-justify last-center lg:max-w-80 2xl:max-w-96"
      >
        <img
          class="max-w-60 lg:max-w-80 2xl:max-w-96 mx-auto"
          alt="Interiano logo"
          src="/interiano-logo-shadowed.svg"
        />
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
    <!-- layout -->
    <div
      class="hidden | lg:block h-[30rem] min-h-[1em] w-px bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"
    ></div>
    <!-- view component -->
    <div class="lg:w-[50%] items-center justify-center flex pt-6 pb-10 lg:pb-0">
      <router-view v-slot="{ Component }">
        <transition name="fade-5" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
        <!-- view component -->
  </div>
</template>