import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import { FullWidthInput } from "@resource/ts/src/common/Component/Input"
import { H2 } from "@resource/ts/src/common/Component/Typo"
import { actions } from "../reducer"
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { Office } from "../types"

export const TransactionInfo = () => {
  const dispatch = useAppDispatch()
  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  // 取引情報ステート
  const transactionHead = useAppSelector(
    (s: RootState) => s.updateTransaction.transactionHead
  )

  // 事業所情報
  const offices: Array<Office> = useAppSelector(
    (s: RootState) => s.updateTransaction.offices
  )

  return (
    <>
      <LinedContainerBox>
        <H2>取引情報</H2>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <FullWidthInput
              id="transactionDate"
              name="transactionInfo[transactionDate]"
              label="取引日付"
              type="date"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  actions.updateTransactionHeadHandle({
                    name: e.target.id,
                    value: e.target.value,
                  })
                )
              }}
              value={transactionHead.transactionDate}
              error={commonState.errors.hasOwnProperty("transactionDate")}
            ></FullWidthInput>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ padding: "8px 8px 8px 0" }}>
              <FormControl fullWidth>
                <InputLabel>取引区分</InputLabel>
                <Select
                  id="transactionDivision"
                  name="transactionInfo[transactionDivision]"
                  size="small"
                  labelId="transactionDivision"
                  value={transactionHead.transactionDivision}
                  label="取引区分"
                  onChange={(e: SelectChangeEvent<string>) => {
                    dispatch(
                      actions.updateTransactionHeadHandle({
                        name: "transactionDivision",
                        value: e.target.value,
                      })
                    )
                  }}
                >
                  <MenuItem value={"1"}>買取</MenuItem>
                  <MenuItem value={"2"}>販売</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Box sx={{ padding: "8px 8px 8px 0" }}>
              <FormControl fullWidth>
                <InputLabel>取引支店</InputLabel>
                {offices.length > 0 && (
                  <Select
                    id="transactionBranch"
                    name="transactionInfo[transactionBranch]"
                    size="small"
                    labelId="transactionBranch"
                    value={transactionHead.transactionBranch}
                    label="取引支店"
                    defaultValue=""
                    onChange={(e: SelectChangeEvent<string>) => {
                      dispatch(
                        actions.updateTransactionHeadHandle({
                          name: "transactionBranch",
                          value: e.target.value,
                        })
                      )
                    }}
                  >
                    {offices.map((office, index) => (
                      <MenuItem value={office.officeCode} key={index}>
                        {office.officeName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <FullWidthInput
              id="transactionPicName"
              name="transactionInfo[transactionPicName]"
              label="担当者"
              inputProps={{
                maxLength: "10",
              }}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  actions.updateTransactionHeadHandle({
                    name: e.target.id,
                    value: e.target.value,
                  })
                )
              }}
              value={transactionHead.transactionPicName}
              error={commonState.errors.hasOwnProperty("transactionPicName")}
            ></FullWidthInput>
          </Grid>
          <Grid item xs={4}>
            <FullWidthInput
              id="transactionTitle"
              name="transactionInfo[transactionTitle]"
              label="件名"
              inputProps={{
                maxLength: "50",
              }}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  actions.updateTransactionHeadHandle({
                    name: e.target.id,
                    value: e.target.value,
                  })
                )
              }}
              value={transactionHead.transactionTitle}
              error={commonState.errors.hasOwnProperty("transactionTitle")}
            ></FullWidthInput>
          </Grid>
        </Grid>
      </LinedContainerBox>
    </>
  )
}
