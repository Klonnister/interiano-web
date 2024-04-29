<script lang="ts" setup>
import type { singUpType } from "@/typings/interfaces/Auth/SingUpType";
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
  <div>
    <!-- title -->
    <div>
      <span>Regístrate</span>
    </div>
    <!-- end title -->
    <!-- form -->
    <div>
      <input type="text" name="name" id="name"  v-model="form.name">
      <input type="password" name="password" id="password" v-model="form.password">
      <input type="password" name="passwordConfirm" id="passwordConfirm" v-model="form.passwordConfirm">
      <button type="submit" @click="submit ">Registrarse</button>
    </div>
    <!-- end form -->
    <!-- link buttons -->
    <div>
      <button type="submit" >Volver</button>
    </div>
     <!-- end link buttons -->
  </div>
</template>