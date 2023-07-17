import styled from "@emotion/styled"
import { Typography, TypographyProps } from "@mui/material"
import "@src/font/textFont.css"

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

/**
 * H1 styledComponent
 */
export const H1 = styled(Typo)(({ theme }) => ({
  fontSize: 32,
}))

/**
 * H2 styledComponent
 */
export const H2 = styled(Typo)(({ theme }) => ({
  fontSize: 28,
}))

/**
 * H3 styledComponent
 */
export const H3 = styled(Typo)(({}) => ({
  fontSize: 20,
}))
