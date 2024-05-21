<script lang="ts" setup>
//native imports
import { reactive } from "vue";
import InputText from 'primevue/inputtext';
import { apiAuthRequest } from "@/modules/shared/helpers/api";
import { saveUserInfo } from "@/modules/shared/helpers/auth";
import { useAuthStore } from "../stores/auth.store";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import type { loginResponse, signUpForm } from "../types/auth.types";

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

//variables
const form = reactive<signUpForm>({
  username: "",
  password: "",
  passwordconfirm: "",
});

//submit
async function submit() {
  const response: loginResponse = await apiAuthRequest('auth/register', { method: 'POST', body: form })
  if ( response ) {
    saveUserInfo(response)
    authStore.setSession();
    toast.success(`Bienvenido(a) ${response.username}`)
    router.push({ name: 'products' })
  }
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
          required
          v-model="form.username"
          autocomplete="on"
        />
      </div>
      <div class="block group">
        <div class="flex gap-[0.6rem] p-[0.1rem] mb-1">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Crear contraseña</span>
        </div>
        <InputText
          type="password"
          name="createPassword"
          id="createPassword"
          required
          minlength="6"
          pattern="^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
          title="Debe contener al menos 1 letra mayúscula, 1 carácter especial y un número"
          v-model="form.password"
          autocomplete="off"
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
          required
          minlength="6"
          pattern="^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
          title="Debe contener al menos 1 letra mayúscula, 1 carácter especial y un número"
          v-model="form.passwordconfirm"
          autocomplete="off"
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
