<script setup lang="ts">
//interfaces
import type { loginForm, loginResponse } from "@/modules/auth/types/auth.types";

//components
import ButtonCardComponent from "@/modules/auth/components/ButtonCardComponent.vue";

//native imports
import { reactive, ref } from "vue";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { apiAuthRequest } from '@/modules/shared/helpers/api';
import { useAuthStore } from "../stores/auth.store";
import { saveUserInfo } from "@/modules/shared/helpers/auth";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { Icon } from '@iconify/vue';

//variables
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const loading = ref(false);
const form = reactive<loginForm>({
  username: "",
  password: "",
});

//submit
async function submit() {
  loading.value = true;
  const response: loginResponse = await apiAuthRequest('auth/login', { method: 'POST', body: form })
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
          :disabled="loading"
          autocomplete="on"
          id="username"
          name="username"
          required
          type="text"
          v-model="form.username"
        />
      </div>
      <div class="block group">
        <label for="userPassword" class="flex gap-[0.6rem] p-[0.1rem] mb-1">
          <img class="block" src="/auth/password.svg" alt="" />
          <span class="group-hover:translate-x-1 duration-500">Contraseña</span>
        </label>
        <Password
          :disabled="loading"
          :feedback="false"
          :input-props="{ autocomplete: 'off' }"
          autocomplete="off"
          input-id="userPassword"
          name="userPassword"
          required
          toggleMask
          v-model="form.password"
        />
      </div>
      <button
        :disabled="loading"
        class="local-shadow bg-[#15395A] py-2 rounded-sm hover:-translate-y-[2px] button-transition flex justify-center"
        type="submit"
      > 
        <Transition name="fade-auth" mode="out-in">
          <span v-if="!loading">Ingresar</span>
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
    <div
     class="flex w-full justify-around p-5">
      <ButtonCardComponent
        title="Regístrate"
        img="/auth/signup.svg"
        path="/sesion/registro"
        class="transition-all duration-200 ease-in-out"
        :class="{ 'opacity-60 pointer-events-none': loading }"
      />
      <ButtonCardComponent
        title="Modo invitado"
        img="/auth/guest.svg"
        path=""
        class="transition-all duration-200 ease-in-out"
        :class="{ 'opacity-60 pointer-events-none': loading }"
      />
    </div>
    <!-- link buttons -->
  </div>
</template>

<style>
.button-transition {
  transition: transform .3s ease-in-out;
}

.fade-auth-enter-active,
.fade-auth-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-auth-enter-from,
.fade-auth-leave-to {
  opacity: 0;
}

</style>