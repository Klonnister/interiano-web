<script setup lang="ts">

//interfaces
import type { logInType } from "@/typings/interfaces/Auth/LogInType";

//components
import ButtonCardComponent from "@/modules/auth/components/ButtonCardComponent.vue"


//native imports
import { reactive } from "vue";

//variables
const form = reactive<logInType>({
  name: "",
  password: "",
});

//submit
function submit() {
  console.log(form);
}
</script>

<template>
  <div>
    <!-- title -->
    <div>
      <span> Inicia sesión </span>
    </div>
    <!-- end title -->
    <!-- form -->
    <div>
      <input type="text" name="name" id="name" v-model="form.name" />
      <input type="password" name="password" id="password" v-model="form.password" />
      <button type="submit" @click="submit">Add</button>
    </div>
    <!-- end form -->
    <!-- link buttons -->
    <div>
      <ButtonCardComponent title="regístrate" img="" />
      <ButtonCardComponent title="Modo invitado" img="" />
    </div>
    <!-- link buttons -->
  </div>
</template>
