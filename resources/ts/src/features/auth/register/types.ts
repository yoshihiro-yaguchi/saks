export interface AuthRegisterState {
  errorArray: string[]
  name: string
  email: string
}

export const initAuthRegisterState: AuthRegisterState = {
  errorArray: [],
  name: "",
  email: "",
}
