<script lang="ts" setup>
//api
import { signIn } from "@/modules/auth/api/SignUpApi";

//interfaces
import type { singUpType } from "@/modules/auth/types/SingUpType";

//native imports
import { reactive } from "vue";
import InputText from 'primevue/inputtext';

//variables
const form = reactive<singUpType>({
  username: "",
  password: "",
  passwordconfirm: "",
});

//submit
function submit() {
  signIn(form);
}
</script>

<template>
  <div class="flex flex-col gap-8 w-full lg:max-w-80 2xl:max-w-96">
    <!-- title -->
    <div class="text-center">
      <span class="text-[1.5rem] | lg:text-[2.5rem]"> Regístrate </span>
    </div>
    <!-- end title -->
    <!-- form -->
    <form @submit.prevent="submit" class="flex flex-col gap-8">
      <div class="block group">
        <label class="flex gap-[0.6rem] p-[0.1rem] mb-1">
          <img class="block" src="/auth/user.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Nombre de usuario</span>
        </label>
        <InputText
          type="text"
          name="createName"
          id="createName"
          v-model="form.username"
        />
      </div>
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem] mb-1">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">crear Contraseña</span>
        </div>
        <InputText
          type="password"
          name="createPassword"
          id="createPassword"
          v-model="form.password"
        />
      </div>
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem] mb-1">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Confirmar contraseña</span>
        </div>
        <InputText
          type="password"
          name="createPasswordConfirm"
          id="createPasswordConfirm"
          v-model="form.passwordconfirm"
        />
      </div>
      <button class="local-shadow bg-[#15395A] py-2 rounded-sm" type="submit">Ingresar</button>
    </form>
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
