import { BaseComponent } from "@resource/ts/src/common/Component/BaseComponent"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { useEffect } from "react"
import { operations } from "./operation"
import {
  Box,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import { H1, Typo } from "@resource/ts/src/common/Component/Typo"
import { Spacer } from "@resource/ts/src/common/Component/Spacer"
import { actions } from "./reducer"

export const Setting = () => {
  const dispatch = useAppDispatch()
  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  const settingState = useAppSelector((s: RootState) => s.settingTransaction)

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  return (
    <>
      <BaseComponent processing={commonState.processing}>
        <Box>
          <LinedContainerBox>
            <H1>取引設定</H1>
            <Spacer></Spacer>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {/* 取引設定を表示する */}
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>
                      <Typo>取引備考を表示する</Typo>
                    </TableCell>
                    <TableCell sx={{ width: "50px" }}>
                      <Switch
                        id="showTransactionNote"
                        checked={settingState.inputs.showTransactionNote}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          dispatch(
                            actions.updateInputs({
                              state: {
                                showTransactionNote: e.target.checked,
                              },
                            })
                          )
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typo>
                        取引備考を設定できるようになります。
                        <br />
                        印刷される買取明細書・依頼書、領収書、請求書に備考が表示されるようになります。
                      </Typo>
                    </TableCell>
                  </TableRow>
                  {/* お客様情報を表示する */}
                  <TableRow>
                    <TableCell>
                      <Typo>お客様情報を表示する</Typo>
                    </TableCell>
                    <TableCell>
                      <Switch
                        id="showCustomerInfo"
                        checked={settingState.inputs.showCustomerInfo}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          dispatch(
                            operations.updateSettings(
                              e.target.id,
                              e.target.checked
                            )
                          )
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typo>
                        取引でお客様情報を設定できるようになります。
                        <br />
                        印刷される買取明細書・依頼書、領収書、請求書にお客様情報が表示されるようになります。
                      </Typo>
                    </TableCell>
                  </TableRow>
                  {/* 買取依頼書と領収書をPDFの1ページにまとめる */}
                  <TableRow>
                    <TableCell>
                      <Typo>買取依頼書と領収書をPDFの1ページにまとめる</Typo>
                    </TableCell>
                    <TableCell>
                      <Switch
                        name="sumAnRecipt"
                        checked={settingState.inputs.sumAnRecipt}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          dispatch(
                            actions.updateInputs({
                              state: {
                                sumAnRecipt: e.target.checked,
                              },
                            })
                          )
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typo>
                        買取取引で印刷される買取明細書・依頼書と領収書を一つのPDFにまとめます。
                        <br />
                        この項目がONの時、設定できる商品数は最大20個に制限されます。
                      </Typo>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </LinedContainerBox>
        </Box>
      </BaseComponent>
    </>
  )
}
