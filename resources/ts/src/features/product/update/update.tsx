import { H1 } from "@resource/ts/src/common/Component/Typo"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { useEffect } from "react"
import { operations } from "./operations"
// import { actions } from './reducer'

export const Update = () => {
  const dispatch = useAppDispatch()
  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  return (
    <>
      <H1>更新</H1>
    </>
  )
}
