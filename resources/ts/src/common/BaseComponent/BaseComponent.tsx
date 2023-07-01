import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { RootState, store } from "src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
import { Box, BoxProps, Typography } from "@mui/material"
// import logo from "../../../public/image-logo.svg"

export const BaseComponent = (props: BoxProps) => {
  const { children } = props
  const dispatch = useAppDispatch()
  // 画面項目
  // const contactStates = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.screenState)
  // 画面コントロール
  // const contactScreenControl = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.controlState)
  // 値入力時ハンドラ
  // const onInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(contactActions.onInputHandle({ name: e.target.name, value: e.target.value }))
  // }
  return (
    <>
      <Box>
        {/* ヘッダー */}
        <Box sx={{ height: "50px", backgroundColor: "black" }}>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography sx={{ color: "white" }}>契約ID</Typography>
            <Typography>xxx-xxx-xxx</Typography>
          </Box>
        </Box>
        {/* サイドメニュー */}
        <Box sx={{ display: "flex" }}>
          <Box sx={{ backgroundColor: "blueviolet", width: "100px" }}>メニュー</Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </>
  )
}
