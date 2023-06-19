/**
 * メイン画面フォーム
 */
export interface transactionState {
  screenState: screenState
}

/**
 * deliverySlip画面ステート
 */
export interface screenState {
  voucherState: string
  rows: indexRow[]
}

export interface indexRow {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  taxRate: number
  totalPrice: number
}

export const initScreenState: screenState = {
  voucherState: "1",
  rows: [],
}

/**
 * deliverySlip画面コントロール
 */

/**
 * deliverySlip画面コントロール初期化
 */
