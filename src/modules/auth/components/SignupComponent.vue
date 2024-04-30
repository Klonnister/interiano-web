<script lang="ts" setup>
//interfaces
import type { singUpType } from "@/typings/interfaces/Auth/SingUpType";

//native imports
import { reactive } from "vue";

//variables
const form = reactive<singUpType>({
  name: "",
  password: "",
  passwordConfirm: "",
});

//submit
function submit() {
  console.log(form);
}
</script>

<template>
  <div class="flex flex-col gap-[3rem] | sm:w-[18.75rem] | lg:w-[25rem]">
    <!-- title -->
    <div class="text-center">
      <span class="text-[1.5rem] | lg:text-[2.5rem]"> Regístrate </span>
    </div>
    <!-- end title -->
    <!-- form -->
    <div class="flex flex-col gap-[3rem]">
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem]">
          <img class="block" src="/auth/user.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Nombre de usuario</span>
        </div>
        <input
          class="local-inset-shadow w-full"
          type="text"
          name="createName"
          id="createName"
          v-model="form.name"
        />
      </div>
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem]">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">crear Contraseña</span>
        </div>
        <input
          class="local-inset-shadow w-full"
          type="password"
          name="createPassword"
          id="createPassword"
          v-model="form.password"
        />
      </div>
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem]">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Confirmar contraseña</span>
        </div>
        <input
          class="local-inset-shadow w-full"
          type="password"
          name="createPasswordConfirm"
          id="createPasswordConfirm"
          v-model="form.passwordConfirm"
        />
      </div>
      <button class="local-shadow bg-[#15395A]" type="submit" @click="submit">
        Ingresar
      </button>
    </div>
    <!-- end form -->
    <!-- link buttons -->
    <RouterLink to="/sesion/inicio">
      <div class="text-center underline">
        <span>Volver</span>
      </div>
    </RouterLink>
    <!-- link buttons -->
  </div>
</template>
