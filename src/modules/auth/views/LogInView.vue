<script setup lang="ts">
//interfaces
import type { loginForm, loginResponse } from "@/modules/auth/types/auth.types";

//components
import ButtonCardComponent from "@/modules/auth/components/ButtonCardComponent.vue";

//native imports
import { reactive} from "vue";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { apiAuthRequest } from '@/modules/shared/helpers/api';
import { useAuthStore } from "../stores/auth.store";
import { saveUserInfo } from "@/modules/shared/helpers/auth";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { Icon } from '@iconify/vue';
import { useLayoutStore } from "@/modules/shared/stores/layoutStore";

//variables
const authStore = useAuthStore();
const layoutStore = useLayoutStore();
const toast = useToast();
const router = useRouter();

const form = reactive<loginForm>({
  username: "",
  password: "",
});

//submit
async function submit() {
  layoutStore.loading = true;
  const response: loginResponse = await apiAuthRequest('auth/login', { method: 'POST', body: form })
  if ( response ) {
    saveUserInfo(response)
    authStore.setSession();
    router.push({ name: 'products' })
    toast.success(`Bienvenido(a) ${response.username}`)
  } else {
    layoutStore.loading = false;
  }
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
          :disabled="layoutStore.loading"
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
          :disabled="layoutStore.loading"
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
        :disabled="layoutStore.loading"
        class="local-shadow bg-[#15395A] py-2 rounded-sm hover:-translate-y-[2px] flex justify-center transition-all duration-300 ease-in-out"
        type="submit"
      > 
        <Transition name="fade" mode="out-in">
          <span v-if="!layoutStore.loading">Ingresar</span>
          <div v-else>
            <Icon
              icon="mingcute:loading-fill"
              class="animate-spin w-6 h-6"
            />
          </div>
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
        :class="{ 'opacity-60 pointer-events-none': layoutStore.loading }"
      />
      <ButtonCardComponent
        title="Modo invitado"
        img="/auth/guest.svg"
        path=""
        class="transition-all duration-200 ease-in-out"
        :class="{ 'opacity-60 pointer-events-none': layoutStore.loading }"
      />
    </div>
    <!-- link buttons -->
  </div>
</template>