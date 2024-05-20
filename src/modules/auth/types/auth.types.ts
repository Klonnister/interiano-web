export interface loginForm {
  username: string,
  password: string
}

export interface loginResponse {
  token: string,
  username: string,
  image: string,
}

export interface signUpForm {
  username: string
  password: string
  passwordconfirm: string
}