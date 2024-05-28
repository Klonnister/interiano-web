import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { validateToken } from '@/modules/shared/helpers/auth'
import { invalidateToken } from '../../shared/helpers/auth';

export const useAuthStore = defineStore('auth', () => {
  const isLogged = ref(false);

  function logOut(){
    invalidateToken();
    localStorage.clear;
    isLogged.value = false;
    router.push({ name: 'login' })
  }
  
  function setSession(): void {
    const isValidToken = validateToken();

    if (isValidToken) {
      isLogged.value = true;
    } else {
      logOut()
    }
  }

  return {
    setSession,
    isLogged,
    logOut,
  }
})
