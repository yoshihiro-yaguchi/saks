/**
 * メイン画面フォーム
 */
export interface transactionState {
  transactionInfo: transactionInfo
  customerInfo: customerInfo
}

/**
 * 取引情報
 */
export interface transactionInfo {
  /** 件名 */
  transactionTitle: string
  /** 取引区分 */
  transactionDivision: string
  /** 取引日付 */
  transactionDate: string
  /** 取引支店 */
  transactionBranch: string
  /** 担当者 */
  transactionPic: string
  /** 取引備考 */
  transactionNote: string
}

export const initTransactionInfo: transactionInfo = {
  transactionTitle: "",
  transactionDivision: "1",
  transactionDate: "",
  transactionBranch: "1",
  transactionPic: "",
  transactionNote: "",
}

/**
 * お客様情報
 */
export interface customerInfo {
  /** 法人区分 */
  corporationDivision: string
  /** 会社名 */
  customerCompany: string
  /** 支店名 */
  customerBranch: string
  /** インボイス登録番号 */
  invoiceNumber: string
  /** お名前 */
  customerName: string
  /** 電話番号 */
  customerPhoneNumber: string
  /** 郵便番号 */
  zipCode: string
  /** 住所1 都道府県 */
  customerAddress1: string
  /** 住所2 市町村区 */
  customerAddress2: string
  /** 住所3 町・番地 */
  customerAddress3: string
  /** 住所4 建物名等 */
  customerAddress4: string
}
export const initCustomerInfo: customerInfo = {
  corporationDivision: "1",
  customerCompany: "",
  customerBranch: "",
  invoiceNumber: "",
  customerName: "",
  customerPhoneNumber: "",
  zipCode: "",
  customerAddress1: "",
  customerAddress2: "",
  customerAddress3: "",
  customerAddress4: "",
}
