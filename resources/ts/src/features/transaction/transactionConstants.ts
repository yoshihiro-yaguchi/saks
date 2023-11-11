import { keyValueObject } from "../../common/commonTypes"

export const transactionConstants = {
  TRANSACTION_DIV_PURCHASE: "1",
  TRANSACTION_DIV_SALE: "2",
  CORPORATION_DIV_INDIVIDUAL: "1",
  CORPORATION_DIV_CORPORATE: "2",
}

export const transactionDivName: keyValueObject = {
  1: "買取",
  2: "販売",
}

export const corporationDivName: keyValueObject = {
  1: "個人",
  2: "法人",
}
