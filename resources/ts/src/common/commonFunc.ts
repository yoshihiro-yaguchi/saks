export const commonFunc = {
  /**
   * 内税計算
   *
   * @param taxableAmount
   * @param taxRate
   * @returns
   */
  culcTaxIncludeAmount: (taxableAmount: number, taxRate: number) => {
    return Math.ceil(
      (taxableAmount / (1 + taxRate / 100)) * (taxRate / 100)
    )
  },
}
