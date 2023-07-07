import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { RootState } from "src/app/store"
import "../../font/boldFont.css"
import { Typography, TypographyProps } from "@mui/material"

export const BoldTypo = (props: TypographyProps) => {
  const { children } = props
  return (
    <>
      <Typography {...props} fontFamily={"Noto Sans JP"}>
        {children}
      </Typography>
    </>
  )
}
