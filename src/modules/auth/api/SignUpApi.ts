import type { singUpType } from '@/modules/auth/interfaces/SingUpType'

import { useToast } from 'vue-toastification'

// @a123456a

export async function signIn(data: singUpType) {
  const toast = useToast()

  fetch('http://localhost:3000/auth/register', {
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
      if (response.status === 200 || response.status === 403) {
        return response.json()
      }
      throw new Error('error ' + response.status)
    })
    .then((responseJson) => {
      toast.error(responseJson.message)
    })
    .catch((error) => {
      console.log(error)
    })
}
