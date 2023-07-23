import styled from "@emotion/styled"
import { Typography, TypographyProps } from "@mui/material"
import "@src/font/textFont.css"

export const Typo = (props: TypographyProps) => {
  const { children } = props
  return (
    <>
      <Typography
        fontSize={14}
        {...props}
        fontFamily={"Noto Sans JP"}
        sx={{ overflow: "auto" }}
      >
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
  fontSize: 24,
}))

/**
 * H3 styledComponent
 */
export const H4 = styled(Typo)(({}) => ({
  fontSize: 20,
}))

/**
 * H4 styledComponent
 */
export const H5 = styled(Typo)(({}) => ({
  fontSize: 16,
}))
