<script setup lang="ts">

//api
import {logIn} from '@/modules/auth/api/LogInApi'

//interfaces
import type { logInType } from "@/modules/auth/interfaces/LogInType";

//components
import ButtonCardComponent from "@/modules/auth/components/ButtonCardComponent.vue";

//native imports
import { reactive } from "vue";

//variables
const form = reactive<logInType>({
  username: "",
  password: "",
});

//submit
function submit() {
  logIn(form);
}
</script>

<template>
  <div class="flex flex-col gap-[3rem] | sm:w-[18.75rem] | lg:w-[20rem] | xl:w-[21rem] | 2xl:w-[23rem]">
    <!-- title -->
    <div class="text-center">
      <span class="text-[1.5rem] | lg:text-[2.5rem]"> Inicia sesión </span>
    </div>
    <!-- end title -->
    <!-- form -->
    <form @submit.prevent="submit" class="flex  flex-col gap-[3rem] px-5">
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem]">
          <img class="block" src="/auth/user.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Usuario</span>
        </div>
        <input
          class="local-inset-shadow w-full"
          type="text"
          name="name"
          id="name"
          v-model="form.username"
        />
      </div>
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem]">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Contraseña</span>
        </div>
        <input
          class="local-inset-shadow w-full"
          type="password"
          name="password"
          id="password"
          v-model="form.password"
        />
      </div>
      <button class="local-shadow bg-[#15395A]" type="submit" >
        Ingresar
      </button>
    </form>
    <!-- end form -->
    <!-- link buttons -->
    <div class="flex w-full justify-around p-5">
      <ButtonCardComponent
        title="regístrate"
        img="/auth/signup.svg"
        path="/sesion/registro"
      />
      <ButtonCardComponent title="Modo invitado" img="/auth/guest.svg" path="" />
    </div>
    <!-- link buttons -->
  </div>
</template>
