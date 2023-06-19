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
  voucharState: string
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
  voucharState: "1",
  rows: [],
}

/**
 * deliverySlip画面コントロール
 */

/**
 * deliverySlip画面コントロール初期化
 */
