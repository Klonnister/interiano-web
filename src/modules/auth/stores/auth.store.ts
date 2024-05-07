import router from '@/router'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const headers = ref({
    Authorization: '',
    'Content-Type': 'application/json'
  })
  const isLogin = ref(false)

  const toast = useToast()

  // ? global function

  function getToken() {
    const token: any = document.cookie
      .split(';')
      .map((cookie) => cookie.split('='))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value)
        }),
        {}
      )

    if (!token.token) {
      return null
    } else {
      return token.token
    }
  }

  function setSession(): void {
    const token = getToken()
    const userName = localStorage.getItem('userName')

    if (token) {
      isLogin.value = true
      headers.value.Authorization = 'Bearer ' + token
      toast.success('Bienvenido(a) ' + userName)
    } else {
      isLogin.value = false
      router.push('/sesion/inicio')
    }
  }

  function tokenError(): boolean {
    return (isLogin.value = false)
  }

  function authError(error: string): void {
    toast.error(error)
  }

  function logOut(){
    const token = getToken()
    isLogin.value = false;
    localStorage.clear;
    if(token){
      document.cookie = 'token=' + ';'
    }
    
  }
  // ! end global function

  // ? login view

  function saveToken(token: string): void {
    const date = new Date()
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000)

    const expires = 'expires=' + date.toUTCString() + ';'
    const sameSiteLax = 'SameSite=Lax'
    
    // const httpOnly = 'HttpOnly;'
    // const sameSiteStrict = 'SameSite=Strict;'
    // const secure = 'Secure;'

    document.cookie = 'token=' + token + ';' + expires + 'path=/ ;' + sameSiteLax
  }

  function saveAuthInfo(username: string, image: string): void {
    localStorage.setItem('userName', username)
    localStorage.setItem('userImage', image)
  }

  function logInTrigger() {
    setSession()
    router.push({ path: '/' })
  }

  // ! end login view

  return {
    headers,
    saveToken,
    saveAuthInfo,
    logInTrigger,
    authError,
    setSession,
    isLogin,
    tokenError,
    logOut,
  }
})
