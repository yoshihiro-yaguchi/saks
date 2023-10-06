import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { useEffect } from "react"
// import { actions } from './reducer'
import { operations } from "./operation"

export const List = () => {
  const dispatch = useAppDispatch()

  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  // 画面ロード時処理
  useEffect(() => {
    console.log("init")
  }, [])

  return <></>
}
