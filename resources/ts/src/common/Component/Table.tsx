import styled from "@emotion/styled"
import { TableCell, TableRow } from "@mui/material"

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  border: "2px solid #1cc1cc",
  color: "#ffffff",
  paddingTop: "0 auto 0 auto",
  fontSize: "12px",
  textAlign: "center",
}))

export const StyledTableRowCell = styled(TableCell)(({ theme }) => ({
  border: "2px solid #1cc1cc",
  fontSize: "12px",
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#effeff",
  },
}))
