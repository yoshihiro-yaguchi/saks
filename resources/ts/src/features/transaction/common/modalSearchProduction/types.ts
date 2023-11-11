// 商品検索モーダル
export interface ModalSearchProductionState {
  isOpen: boolean
  searchCondition: SearchCondition
  searchResult: Array<SearchResult>
  input: Input
  paginate: Paginate
  receive: Receive
}
// 入力項目
export interface Input {
  [key: string]: string | number
  productionCode: string
  productionName: string
  quantity: number
  unitPrice: number
  unit: string
  taxRate: number
}
export const initInput: Input = {
  productionCode: "",
  productionName: "",
  quantity: 1,
  unitPrice: 0,
  unit: "",
  taxRate: 10,
}
// 検索条件
export interface SearchCondition {
  productionCode: string
  productionName: string
}
export const initSearchCondition: SearchCondition = {
  productionCode: "",
  productionName: "",
}
// ページネーション
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
  itemsPerPage: 25,
}
// 検索結果
export interface SearchResult {
  productionCode: string
  productionName: string
  unitPrice: number
  unit: string
  taxRate: number
}
// 返却用ステート
export interface Receive {
  index: number
}
export const initReceive: Receive = {
  index: 0,
}

// ステート初期値
export const initModalSearchProductionState: ModalSearchProductionState = {
  isOpen: false,
  searchCondition: initSearchCondition,
  searchResult: [],
  input: initInput,
  paginate: initPaginate,
  receive: initReceive,
}
// API検索結果
export interface ApiSearchResult {
  count: number
  products: Array<SearchResult>
}
