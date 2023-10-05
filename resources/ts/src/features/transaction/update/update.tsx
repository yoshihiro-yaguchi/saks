import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { useNavigate, useParams } from "react-router-dom"
// import { actions } from "./reducer"
// import { operations } from "./operations"

export const Update = () => {
  // ナビゲーター
  const navigate = useNavigate()
  // URLパラメーター
  const urlParams = useParams()
  // const dispatch = useAppDispatch()
  // 画面項目
  // const contactStates = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.screenState)
  // 画面コントロール
  // const contactScreenControl = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.controlState)
  // 値入力時ハンドラ
  // const onInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(contactActions.onInputHandle({ name: e.target.name, value: e.target.value }))
  // }
  return <></>
}
