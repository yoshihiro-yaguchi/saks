import { useNavigate } from "react-router-dom"

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
}
