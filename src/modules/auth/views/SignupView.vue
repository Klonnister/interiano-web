<script lang="ts" setup>
//native imports
import { reactive, ref } from "vue";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { apiAuthRequest } from "@/modules/shared/helpers/api";
import { saveUserInfo } from "@/modules/shared/helpers/auth";
import { useAuthStore } from "../stores/auth.store";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import type { loginResponse, signUpForm } from "../types/auth.types";
import { Icon } from '@iconify/vue';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

//variables
const pattern = '^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$';
const loading = ref(false);
const form = reactive<signUpForm>({
  username: "",
  password: "",
  passwordconfirm: "",
});

//submit
async function submit() {
  loading.value = true;
  const response: loginResponse = await apiAuthRequest('auth/register', { method: 'POST', body: form })
  if ( response ) {
    saveUserInfo(response)
    authStore.setSession();
    toast.success(`Bienvenido(a) ${response.username}`)
    router.push({ name: 'products' })
  }
  loading.value = false;
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
        <label class="flex gap-[0.6rem] p-[0.1rem] mb-1" for="createName">
          <img class="block" src="/auth/user.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Nombre de usuario</span>
        </label>
        <InputText
          :disabled="loading"
          type="text"
          name="createName"
          id="createName"
          required
          v-model="form.username"
          autocomplete="on"
        />
      </div>
      <div class="block group">
        <label class="flex items-center gap-[0.6rem] p-[0.1rem] mb-1 w-full" for="createPassword">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Crear contraseña</span>
        </label>
        <Password
          :disabled="loading"
          :feedback="false"
          :input-props="{
            minlength: '6',
            pattern,
            title: 'La contraseña debe contener al menos 1 letra mayúscula, 1 carácter especial y un número',
            autocomplete: 'off',

          }"
          autocomplete="off"
          input-id="createPassword"
          name="createPassword"
          required
          toggleMask
          v-model="form.password"
        />
      </div>
      <div class="block group">
        <label class="flex gap-[0.6rem] p-[0.1rem] mb-1" for="createPasswordConfirm">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Confirmar contraseña</span>
        </label>
        <Password
          :disabled="loading"
          :feedback="false"
          :input-props="{
            autocomplete: 'off',
            minlength: '6',
            pattern,
            title: 'La contraseña debe contener al menos 1 letra mayúscula, 1 carácter especial y un número',
          }"
          autocomplete="off"
          input-id="createPasswordConfirm"
          name="createPasswordConfirm"
          required
          toggleMask
          v-model="form.passwordconfirm"
        />
      </div>
      <button
        :disabled="loading"
        class="local-shadow bg-[#15395A] py-2 rounded-sm flex justify-center transition-all duration-300 ease-in-out"
        type="submit"
      >
        <Transition name="fade-auth" mode="out-in">
          <span v-if="!loading">Registrarse</span>
          <Icon
            v-else
            icon="mingcute:loading-fill"
            class="animate-spin w-6 h-6"
          />
        </Transition>
      </button>
    </form>
    <!-- end form -->
    <!-- link buttons -->
    <RouterLink
      to="/sesion/inicio"
      class="transition-all duration-200 ease-in-out"
      :class="{ 'opacity-60 pointer-events-none': loading }"
    >
      <div class="text-center underline">
        <span>Volver</span>
      </div>
    </RouterLink>
    <!-- link buttons -->
  </div>
</template>

<style scoped>
.fade-auth-enter-active,
.fade-auth-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-auth-enter-from,
.fade-auth-leave-to {
  opacity: 0;
}

</style>