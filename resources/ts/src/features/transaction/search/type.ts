export interface TransactionSearch {
  items: Items
}

export interface Items {
  samp: string
}
export const initItems: Items = {
  samp: "",
}

export const initTransactionSearch: TransactionSearch = {
  items: initItems,
}
