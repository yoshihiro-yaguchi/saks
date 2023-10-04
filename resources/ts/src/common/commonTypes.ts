export interface CommonTypes {
  csrfToken: string
  errorArray: string[]
  errors: Object
  user: UserTypes
}

/**
 * ユーザー情報
 */
export interface UserTypes {
  name: string
}
export const initUserTypes: UserTypes = {
  name: "",
}

export const initCommonTypes: CommonTypes = {
  csrfToken: "",
  errorArray: [],
  user: initUserTypes,
  errors: [],
}

// バリデーションエラーの型
export interface ValidateError {
  [key: string]: Array<string>
}
