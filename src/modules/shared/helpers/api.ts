import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { getToken } from "./auth";
import { useToast } from "vue-toastification";
import router from "@/router";

const authStore = useAuthStore();
const toast = useToast();

export const apiUrl = 'http://localhost:3000';

export const apiRequest = async(path: string, params?: apiParams) => {
  return await fetch(`${apiUrl}/${path}`, {
    method: params?.method || 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(params?.body)
  })
    .then(async(rawResponse) => {
      const response = await rawResponse.json();

      switch(rawResponse.status) {
        case 401: 
          authStore.logOut()
          break;
        case 200:
          return response;
        case 201:
          return response;
        default: 
          if (typeof response.message === 'string') {
            toast.error(response.message)
          } else {
            response.message.forEach((message: string) => {
              toast.error(message);
            })
          }
          
          return response;
      }
    })
    .catch(() => {
      router.push({ name: 'dev' });
      return { statusCode: 503 };
    })
}

export const apiAuthRequest = async(path: string, params: apiParams) => {
  return await fetch(`${apiUrl}/${path}`, {
    method: params.method || 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params.body)
  })
    .then(async(rawResponse) => {
      const response = await rawResponse.json();

      switch(rawResponse.status) {
        case 200:
          return response;
        case 201:
          return response;
        default: 
          if (typeof response.message === 'string') {
            toast.error(response.message)

          } else {
            response.message.forEach((message: string) => {
              toast.error(message);
            })
          }
          return;
      }
    })
}

interface apiParams {
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  body?: object;
}