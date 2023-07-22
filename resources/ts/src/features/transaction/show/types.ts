export interface ShowTransactionState {
  common: Common
  transactionInfo: TransactionInfo
  customerInfo: CustomerInfo
  detailRows: DetailRow[]
  amountInfo: AmountInfo
  taxInfos: TaxInfo[]
}

export interface Common {
  token: string
  baseUrl: string
  contractId: string
  transactionId: string
}
export const initCommon: Common = {
  token: "",
  baseUrl: "",
  contractId: "",
  transactionId: "",
}

/**
 * 取引情報
 */
export interface TransactionInfo {
  /** 件名 */
  transactionTitle: string
  /** 取引区分 */
  transactionDivision: string
  /** 取引日付 */
  transactionDate: string
  /** 取引支店 */
  transactionBranch: string
  /** 担当者 */
  transactionPicName: string
  /** 取引備考 */
  transactionNote: string
}
export const initTransactionInfo: TransactionInfo = {
  transactionTitle: "",
  transactionDivision: "",
  transactionDate: "",
  transactionBranch: "",
  transactionPicName: "",
  transactionNote: "",
}

/**
 * お客様情報
 */
export interface CustomerInfo {
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
  customerZipCode: string
  /** 住所1 都道府県 */
  customerAddress1: string
  /** 住所2 市区町村 */
  customerAddress2: string
  /** 住所3 町・番地 */
  customerAddress3: string
  /** 住所4 建物名等 */
  customerAddress4: string
}
export const initCustomerInfo: CustomerInfo = {
  corporationDivision: "",
  customerCompany: "",
  customerBranch: "",
  invoiceNumber: "",
  customerName: "",
  customerPhoneNumber: "",
  customerZipCode: "",
  customerAddress1: "",
  customerAddress2: "",
  customerAddress3: "",
  customerAddress4: "",
}

/**
 * 明細行
 */
export interface DetailRow {
  /** 商品番号 */
  productNo: string
  /** 商品名 */
  productName: string
  /** 数量 */
  quantity: number
  /** 単価 */
  unitPrice: number
  /** 税率 */
  taxRate: number
  /** 金額 */
  totalPrice: number
}
export const initDetailRow: DetailRow = {
  productNo: "",
  productName: "",
  quantity: 0,
  unitPrice: 0,
  taxRate: 0,
  totalPrice: 0,
}

/**
 * 金額情報
 */
export interface AmountInfo {
  /** 小計 */
  subtotal: number
  /** 内消費税 */
  taxInclude: number
  /** 合計 */
  total: number
}
export const initAmountInfo: AmountInfo = {
  subtotal: 0,
  taxInclude: 0,
  total: 0,
}

/**
 * 税額情報
 */
export interface TaxInfo {
  /** 税率 */
  taxRate: number
  /** 税率対象額 */
  taxableAmout: number
  /** 税額 */
  taxAmout: number
}
export const initTaxInfo: TaxInfo = {
  taxRate: 0,
  taxableAmout: 0,
  taxAmout: 0,
}
