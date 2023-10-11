/**
 * 税額情報
 */
export interface TaxInfo {
  /** 税率 */
  taxRate: number
  /** 税率対象額 */
  taxableAmount: number
  /** 税額 */
  taxAmount: number
}
export const initTaxInfo: TaxInfo = {
  taxRate: 0,
  taxableAmount: 0,
  taxAmount: 0,
}
export interface TaxInfos {
  [key: string]: TaxInfo
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
  /** 単位 */
  unit: string
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
  unit: "",
}
