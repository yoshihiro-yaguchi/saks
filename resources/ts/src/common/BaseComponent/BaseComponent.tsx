import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
import { Box, BoxProps, Grid, Paper, Typography, styled } from "@mui/material"
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
      <Box sx={{ height: "100%" }}>
        {/* ヘッダー */}
        <Box
          sx={{
            height: "55px",
            backgroundColor: "#1cc1cc",
            borderBottom: "1px solid #dddddd",
          }}
        ></Box>
        <Grid container spacing={4} sx={{ height: "100%" }}>
          {/* 左メニュー */}
          <Grid item xs={0} sm={3} md={2}>
            <Box sx={{ height: "100%", borderRight: "1px solid #1cc1cc" }}>
              <Box height={"32px"}></Box>
            </Box>
          </Grid>
          {/* コンテンツ */}
          <Grid item xs={12} sm={9} md={8}>
            <Box sx={{ height: "100%" }}>
              <Box height={"32px"}></Box>
              {children}
            </Box>
          </Grid>
          {/* 右メニュー */}
          <Grid item xs={0} sm={0} md={2}>
            <Box sx={{ height: "100%", borderLeft: "1px solid #1cc1cc" }}>
              <Box height={"32px"}></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
