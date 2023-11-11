import { DetailRow, TaxInfo } from "../TransactionTypes"

/**
 * メイン画面フォーム
 */
export interface StoreTransactionState {
  token: string
  common: Common
  transactionInfo: TransactionInfo
  detailRows: Array<DetailRow>
  amountInfo: AmountInfo
  taxInfos: Array<TaxInfo>
  offices: Array<Office>
}

export interface Office {
  officeCode: string
  officeName: string
}

export interface InitApiResult {
  offices: Array<Office>
}

/**
 * 共通
 */
export interface Common {
  errors: Object
  errorArray: string[]
}
export const initCommon: Common = {
  errors: [],
  errorArray: [],
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
  transactionDivision: "1",
  transactionDate: "",
  transactionBranch: "1",
  transactionPicName: "",
  transactionNote: "",
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
 * 初期表示reducerパラメーター
 */
export interface initHandle {
  csrfToken: string
  errors: string[]
  datas: BackendData
}

// バックエンドからのデータ
export interface BackendData {
  transactionInfo: TransactionInfo
  detailRows: DetailRow[]
  amountInfo: AmountInfo
  taxInfo: TaxInfo[]
}
export const initBackendData: BackendData = {
  transactionInfo: initTransactionInfo,
  detailRows: [],
  amountInfo: initAmountInfo,
  taxInfo: [],
}

export interface ApiGetProductByCode {
  product: ApiGetProduct | null
}

export interface ApiGetProduct {
  productionCode: string
  productionName: string
  unitPrice: number
  unit: string
  taxRate: number
}

// バリデーションエラーの型
export interface ValidateError {
  [key: string]: Array<string>
}
