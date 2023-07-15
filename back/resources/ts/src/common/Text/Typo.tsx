import { Typography, TypographyProps } from "@mui/material"
import "../../font/textFont.css"

export const Typo = (props: TypographyProps) => {
  const { children } = props
  return (
    <>
      <Typography {...props} fontFamily={"Noto Sans JP"}>
        {children}
      </Typography>
    </>
  )
}
