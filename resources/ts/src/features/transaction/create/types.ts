/**
 * メイン画面フォーム
 */
export interface transactionState {
  _token: string
  common: Common
  transactionInfo: TransactionInfo
  customerInfo: CustomerInfo
  detailRows: DetailRow[]
  treasurerInfo: TreasurerInfo
  taxInfos: TaxInfo[]
}

/**
 * 共通
 */
export interface Common {
  baseUrl: string
}
export const initCommon: Common = {
  baseUrl: "",
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
  /** 担当者(姓) */
  transactionPicLastName: string
  /** 担当者(姓) */
  transactionPicFirstName: string
  /** 取引備考 */
  transactionNote: string
}

export const initTransactionInfo: TransactionInfo = {
  transactionTitle: "",
  transactionDivision: "1",
  transactionDate: "",
  transactionBranch: "1",
  transactionPicLastName: "",
  transactionPicFirstName: "",
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
  /** お名前(姓) */
  customerLastName: string
  /** お名前(名) */
  customerFirstName: string
  /** 電話番号 */
  customerPhoneNumber: string
  /** 郵便番号 */
  zipCode: string
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
  corporationDivision: "1",
  customerCompany: "",
  customerBranch: "",
  invoiceNumber: "",
  customerLastName: "",
  customerFirstName: "",
  customerPhoneNumber: "",
  zipCode: "",
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

/**
 * 会計情報
 */
export interface TreasurerInfo {
  /** 小計 */
  subtotal: number
  /** 内消費税 */
  taxInclude: number
  /** 合計 */
  total: number
}
export const initTreasurerInfo: TreasurerInfo = {
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
