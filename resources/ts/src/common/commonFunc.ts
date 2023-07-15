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
}
