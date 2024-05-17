export interface loginForm {
  username: string,
  password: string
}

export interface loginResponse {
  token: string,
  username: string,
  image: string,
}