<script setup lang="ts">

//api
import {logIn} from '@/modules/auth/api/LogInApi'

//interfaces
import type { logInType } from "@/modules/auth/types/LogInType";

//components
import ButtonCardComponent from "@/modules/auth/components/ButtonCardComponent.vue";

//native imports
import { reactive } from "vue";
import InputText from 'primevue/inputtext';

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
  <div class="flex flex-col gap-8 w-full lg:max-w-80 2xl:max-w-96">
    <!-- title -->
    <div class="text-center">
      <span class="text-[1.6rem] | lg:text-[2.5rem]"> Inicia sesión </span>
    </div>
    <!-- end title -->
    <!-- form -->
    <form @submit.prevent="submit" class="flex flex-col gap-8 mb-10 lg:mb-2">
      <div class="block group">
        <label for="username" class="flex gap-[0.6rem] p-[0.1rem] mb-1">
          <img class="block" src="/auth/user.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Usuario</span>
        </label>
        <InputText
          type="text"
          id="username"
          v-model="form.username"
        />
      </div>
      <div class="block group">
        <label for="password" class="flex gap-[0.6rem] p-[0.1rem] mb-1">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Contraseña</span>
        </label>
        <InputText
          type="password"
          name="password"
          id="password"
          v-model="form.password"
        />
      </div>
      <button class="local-shadow bg-[#15395A] py-2 rounded-sm" type="submit" >
        Ingresar
      </button>
    </form>
    <!-- end form -->
    <!-- link buttons -->
    <div class="flex w-full justify-around p-5">
      <ButtonCardComponent
        title="Regístrate"
        img="/auth/signup.svg"
        path="/sesion/registro"
      />
      <ButtonCardComponent title="Modo invitado" img="/auth/guest.svg" path="" />
    </div>
    <!-- link buttons -->
  </div>
</template>
