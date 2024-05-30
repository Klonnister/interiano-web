import type { loginResponse } from "@/modules/auth/types/auth.types";

export  function getToken() {
  const cookies: any = document.cookie
    .split(';')
    .map((cookie) => cookie.split('='))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value)
      }),
      {}
    )

  return cookies.token;
}

export  function validateToken(): boolean {
  const cookies: any = document.cookie
    .split(';')
    .map((cookie) => cookie.split('='))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value)
      }),
      {}
    )

  if (!cookies.token || !cookies.token_expiration) return false;

  const expiration = Date.parse(cookies.token_expiration);
  const actualDate = new Date().getTime();

  if ( expiration <= actualDate) return false;
  
  return true;
}

export function saveUserInfo(userInfo: loginResponse): void {
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
  const expiration = date.toUTCString();

  const expires = 'expires=' + expiration + ';'
  const sameSiteLax = 'SameSite=Lax;'
  
  // const httpOnly = 'HttpOnly=true;'
  // const sameSiteStrict = 'SameSite=Strict;'
  // const secure = 'Secure;'

  document.cookie = 'token=' + userInfo.token + ';' + expires + 'path=/;' + sameSiteLax;
  document.cookie = `token_expiration=${expiration};`+ 'path=/;' + sameSiteLax;
  localStorage.setItem('userName', userInfo.username)
  localStorage.setItem('userImage', userInfo.image)
}

export function invalidateToken(): void {
  document.cookie = 'token=;'+ 'path=/;' + 'SameSite=Lax;'
  document.cookie = 'token_expiration=;' + 'path=/;' +'SameSite=Lax;'
}


