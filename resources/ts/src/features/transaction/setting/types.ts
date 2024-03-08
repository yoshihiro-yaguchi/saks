export interface TransactionSetting {
  inputs: TransactionSettingInputs
}

/**
 * 取引設定の入力項目
 */
export interface TransactionSettingInputs {
  showTransactionNote: boolean
  showCustomerInfo: boolean
  sumAnRecipt: boolean
}
export const initTransactionSettingInputs: TransactionSettingInputs = {
  showTransactionNote: false,
  showCustomerInfo: false,
  sumAnRecipt: false,
}
