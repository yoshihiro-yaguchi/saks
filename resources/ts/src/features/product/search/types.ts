export interface SearchProduct {
  input: Inputs
  searchResults: Array<SearchResult>
  paginate: Paginate
}

export interface Inputs {
  [key: string]: string | number
  productionCode: string
  productionName: string
  taxDivision: string
  taxRate: string
}

export const initInputs: Inputs = {
  productionCode: "",
  productionName: "",
  taxDivision: "0",
  taxRate: "0",
}

export interface ApiDoInitResult {
  count: number
  products: Array<SearchResult>
}

export interface SearchResult {
  [key: string]: string | number
  productionCode: string
  productionName: string
  unitPrice: number
  taxDivision: string
  taxRate: string
}

export interface Paginate {
  [key: string]: number | undefined
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
