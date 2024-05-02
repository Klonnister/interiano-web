import type { logInType } from '@/modules/auth/interfaces/LogInType'

import { useToast } from 'vue-toastification'

// @a123456a

export async function logIn(data: logInType) {
  const toast = useToast()

  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'token'
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
      console.log(responseJson)
      if (responseJson.statusCode === 404) {
        toast.error(responseJson.message)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
