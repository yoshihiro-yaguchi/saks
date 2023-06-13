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
}

export const initScreenState: screenState = {
  voucharState: "1"
}

/**
 * deliverySlip画面コントロール
 */

/**
 * deliverySlip画面コントロール初期化
 */
