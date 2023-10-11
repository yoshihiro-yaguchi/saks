import { Box, TextField, TextFieldProps } from "@mui/material"

export const Input = function (props: TextFieldProps) {
  const { hidden } = props
  return (
    <>
      <Box sx={hidden ? {} : { padding: "8px 8px 8px 0" }}>
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...props}
        ></TextField>
      </Box>
    </>
  )
}

export const FullWidthInput = function (props: TextFieldProps) {
  return (
    <>
      <Input fullWidth {...props}></Input>
    </>
  )
}
