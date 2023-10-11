import { AxiosHeaders } from "axios"

export interface CommonTypes {
  csrfToken: string
  errorArray: string[]
  errors: Object
  user: UserTypes
  processing: boolean
  isOpenDrawer: boolean
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
  processing: false,
  isOpenDrawer: false,
}

// バリデーションエラーの型
export interface ValidateError {
  [key: string]: Array<string>
}

/**
 * キーバリューのオブジェクト用型
 */
export interface keyValueObject {
  [key: string]: string
}
