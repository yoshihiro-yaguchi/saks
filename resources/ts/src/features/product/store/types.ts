export interface StoreProduct {
  inputState: InputState
}

export interface InputState {
  [key: string]: string | number
  productionCode: string
  productionName: string
  unitPrice: number
  taxDivision: string
  taxRate: number
  unit: string
}

export const initInputState: InputState = {
  productionCode: "",
  productionName: "",
  unitPrice: 0,
  taxDivision: "1",
  taxRate: 10,
  unit: "",
}

export interface ApiDoStore {
  status: string
  id: string
}
