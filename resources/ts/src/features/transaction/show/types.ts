import { DetailRow, TaxInfo, TaxInfos } from "../TransactionTypes"

export interface ShowTransactionState {
  common: Common
  transactionHead: TransactionHead
  detailRows: Array<DetailRow>
  taxInfos: TaxInfos
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
  subtotal: 0,
  taxInclude: 0,
  total: 0,
}

// 初期処理API型
export interface ApiDoInit {
  transactionData: TransactionData
}
export interface TransactionData {
  transactionHead: TransactionHead
  detailRows: Array<DetailRow>
  taxInfos: TaxInfos
}
