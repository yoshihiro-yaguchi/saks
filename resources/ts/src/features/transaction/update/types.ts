import { DetailRow, TaxInfo } from "../TransactionTypes"

/**
 * メイン画面フォーム
 */
export interface StoreTransactionState {
  token: string
  common: Common
  transactionHead: TransactionHead
  detailRows: Array<DetailRow>
  taxInfos: Array<TaxInfo>
  offices: Array<Office>
  modal: ModalState
}

/**
 * 取引ヘッダーデータ
 */
export interface TransactionHead {
  [key: string]: string | number
  /** 取引 */
  transactionId: string
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
  /** 小計 */
  subtotal: number
  /** 内消費税 */
  taxInclude: number
  /** 合計 */
  total: number
}
export const initTransactionHead: TransactionHead = {
  transactionId: "",
  transactionTitle: "",
  transactionDivision: "1",
  transactionDate: "",
  transactionBranch: "",
  transactionPicName: "",
  transactionNote: "",
  subtotal: 0,
  taxInclude: 0,
  total: 0,
}

export interface Office {
  officeCode: string
  officeName: string
}

export interface InitApiResult {
  detailRows: DetailRow[]
  offices: Office[]
  taxInfos: TaxInfo[]
  transactionHead: TransactionHead
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
  errors: string[]
  datas: BackendData
}

// バックエンドからのデータ
export interface BackendData {
  transactionHead: TransactionHead
  detailRows: DetailRow[]
  taxInfo: TaxInfo[]
}

// バリデーションエラーの型
export interface ValidateError {
  [key: string]: Array<string>
}

// モーダルステート
export interface ModalState {
  isOpen: boolean
  searchCondition: ModalSearchCondition
  searchResult: Array<ModalSearchResult>
  input: ModalInput
  paginate: ModalPaginate
}
export interface ModalInput {
  [key: string]: string | number
  productionCode: string
  productionName: string
  quantity: number
  unitPrice: number
  unit: string
  taxRate: number
}
export const initModalInput: ModalInput = {
  productionCode: "",
  productionName: "",
  quantity: 1,
  unitPrice: 0,
  unit: "",
  taxRate: 10,
}
export interface ModalSearchCondition {
  productionCode: string
  productionName: string
}
export const initModalSearchCondition: ModalSearchCondition = {
  productionCode: "",
  productionName: "",
}

export interface ModalPaginate {
  count: number
  maxPages: number
  pages: number
  itemsPerPage: number
}
export const initModalPaginate: ModalPaginate = {
  count: 0,
  maxPages: 0,
  pages: 1,
  itemsPerPage: 25,
}
export interface ModalSearchResult {
  productionCode: string
  productionName: string
  unitPrice: number
  unit: string
  taxRate: number
}
export const initModal: ModalState = {
  isOpen: false,
  searchCondition: initModalSearchCondition,
  searchResult: [],
  input: initModalInput,
  paginate: initModalPaginate,
}

export interface ModalApiSearchResult {
  count: number
  products: Array<ModalSearchResult>
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
