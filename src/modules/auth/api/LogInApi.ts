import type { logInType } from '@/modules/auth/types/LogInType'

import { useAuthStore } from '@/modules/auth/stores/auth.store'

// @a123456a

export async function logIn(data: logInType) {
  const store = useAuthStore()

  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 201 || response.status === 404) {
        return response.json()
      }
      throw new Error('error ' + response.status)
    })
    .then((responseJson) => {
      if (responseJson.statusCode === 404) {
        store.authError(responseJson.message);
      } else {
        store.saveToken(responseJson.token)
        store.saveAuthInfo(responseJson.username, responseJson.image)
        store.logInTrigger();
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
