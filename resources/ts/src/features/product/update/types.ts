export interface UpdateProduct {
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

export interface ApiDoGetProduct {
  count: number
  product: InputState
}
export interface ApiDoUpdate {
  status: string
  id: string
}
