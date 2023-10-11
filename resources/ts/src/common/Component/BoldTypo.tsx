import "@resource/font/boldFont.css"
import { Typography, TypographyProps } from "@mui/material"

export const BoldTypo = (props: TypographyProps) => {
  const { children } = props
  return (
    <>
      <Typography {...props}>{children}</Typography>
    </>
  )
}
