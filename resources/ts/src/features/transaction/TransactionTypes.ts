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
