import { useNavigate } from "react-router-dom"
import { DetailRow, TaxInfo } from "../features/transaction/TransactionTypes"

export const commonFunc = {
  /**
   * 内税計算
   *
   * @param taxableAmount
   * @param taxRate
   * @returns
   */
  culcTaxIncludeAmount: (taxableAmount: number, taxRate: number): number => {
    return Math.ceil((taxableAmount / (1 + taxRate / 100)) * (taxRate / 100))
  },

  /**
   * null空判定
   *
   * @param data
   * @returns
   */
  isNullEmpty: (data: any): boolean => {
    if (data === null || data === "") {
      return true
    } else {
      return false
    }
  },

  /**
   * 郵便番号にハイフンを入れる
   * @param zipCode
   * @returns
   */
  zipCodeHyphen: (zipCode: string): string => {
    if (zipCode.length > 3) {
      return zipCode.slice(0, 3) + "-" + zipCode.slice(3)
    }
    return zipCode
  },

  /**
   * 取引金額計算
   *
   * @param detailRows
   * @returns
   */
  transactionCulcTax: (detailRows: Array<DetailRow>) => {
    const taxInfos: TaxInfo[] = []

    detailRows.forEach((detailRow) => {
      if (detailRow.taxRate in taxInfos) {
        taxInfos[detailRow.taxRate].taxableAmount += Math.floor(
          detailRow.totalPrice
        )
      } else {
        const taxInfo: TaxInfo = {
          taxRate: Math.floor(detailRow.taxRate),
          taxableAmount: Math.floor(detailRow.totalPrice),
          taxAmount: 0,
        }
        taxInfos[detailRow.taxRate] = taxInfo
      }
    })

    console.log(taxInfos)

    taxInfos.forEach((taxInfo) => {
      taxInfo.taxAmount = commonFunc.culcTaxIncludeAmount(
        taxInfo.taxableAmount,
        taxInfo.taxRate
      )
    })
    return taxInfos
  },

  getDivisionName: (key: string, value: string) => {},
}
