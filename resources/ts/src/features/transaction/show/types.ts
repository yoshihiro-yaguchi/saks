import { DetailRow, TaxInfo } from "../TransactionTypes"

export interface ShowTransactionState {
  common: Common
  transactionHead: TransactionHead
  detailRows: Array<DetailRow>
  taxInfos: Array<TaxInfo>
}

export interface Common {
  token: string
  contractId: string
  transactionId: string
}
export const initCommon: Common = {
  contractId: "",
  transactionId: "",
  token: "",
}

/**
 * 取引ヘッダーデータ
 */
export interface TransactionHead {
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
  /** 小計 */
  subtotal: number
  /** 内消費税 */
  taxInclude: number
  /** 合計 */
  total: number
}
export const initTransactionHead: TransactionHead = {
  transactionTitle: "",
  transactionDivision: "",
  transactionDate: "",
  transactionBranch: "",
  transactionPicName: "",
  transactionNote: "",
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
  subtotal: 0,
  taxInclude: 0,
  total: 0,
}
