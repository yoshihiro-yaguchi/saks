export interface RegisterContractTypes {
  inputState: InputState
}

export interface InputState {
  contractCompanyName: string
  contractersName: string
  invoiceNumber: string
  hqPhoneNumber: string
  contractZipcode: string
  contractAddress1: string
  contractAddress2: string
  contractAddress3: string
  contractAddress4: string
}

export const initInputItems: InputState = {
  contractCompanyName: "",
  contractersName: "",
  contractZipcode: "",
  contractAddress1: "",
  contractAddress2: "",
  contractAddress3: "",
  contractAddress4: "",
  invoiceNumber: "",
  hqPhoneNumber: "",
}

export const initRegisterContractTypes: RegisterContractTypes = {
  inputState: initInputItems,
}
