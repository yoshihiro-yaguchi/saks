/**
 * 検索画面ステート
 */
export interface TransactionSearch {
  transactions: Array<TransactionData>
  inputs: Inputs
  paginate: Paginate
  offices: Array<Office>
}

/**
 * 取引データ
 */
export interface TransactionData {
  id: string
  transactionTitle: string
  transactionDivision: string
  transactionDate: string
  transactionBranch: string
  transactionPicName: string
  corporationDivision: string
  customerCompany: string
  customerName: string
}
export const initTransactionData: TransactionData = {
  id: "",
  transactionTitle: "",
  transactionDivision: "",
  transactionDate: "",
  transactionBranch: "",
  transactionPicName: "",
  corporationDivision: "",
  customerCompany: "",
  customerName: "",
}

/**
 * 入力項目
 */
export interface Inputs {
  id: string
  transactionTitle: string
  transactionDivision: string
  transactionDateFrom: string
  transactionDateTo: string
  transactionBranch: string
  transactionPicName: string
  corporationDivision: string
  customerCompany: string
  customerName: string
}
export const initInputs: Inputs = {
  id: "",
  transactionTitle: "",
  transactionDivision: "0",
  transactionDateFrom: "",
  transactionDateTo: "",
  transactionBranch: "0",
  transactionPicName: "",
  corporationDivision: "0",
  customerCompany: "",
  customerName: "",
}

export interface Paginate {
  count: number
  maxPages: number
  pages: number
  itemsPerPage: number
}
export const initPaginate: Paginate = {
  count: 0,
  maxPages: 0,
  pages: 1,
  itemsPerPage: 10,
}

export interface Office {
  officeCode: string
  officeName: string
}

export interface ApiInitResult {
  count: number
  transactions: Array<TransactionData>
  offices: Array<Office>
}

/**
 * 検索API戻り値型
 */
export interface ApiSearchResult {
  count: number
  transactions: Array<TransactionData>
}
