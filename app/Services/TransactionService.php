<?php

namespace App\Services;

use App\Models\TransactionDetail;
use App\Models\TransactionHead;
use App\Models\TransactionPrice;
use Carbon\Carbon;

class TransactionService
{
    /**
     * 取引ヘッダー保存
     *
     * @return TransactionHead model
     */
    public function insertTransactionHead(string $contractId, array $transactionInfo, array $customerInfo, array $amountInfo)
    {
        $transactionHeadModel = new TransactionHead();
        $transactionHeadModel->fill([
            'contract_id' => $contractId,
            'transaction_id' => $transactionHeadModel->nextInsertTransactionId($contractId),
            'transaction_title' => $transactionInfo['transactionTitle'],
            'transaction_division' => $transactionInfo['transactionDivision'],
            'transaction_date' => $transactionInfo['transactionDate'],
            'transaction_branch' => $transactionInfo['transactionBranch'],
            'transaction_pic_last_name' => $transactionInfo['transactionPicLastName'],
            'transaction_pic_first_name' => $transactionInfo['transactionPicFirstName'],
            'transaction_note' => $transactionInfo['transactionNote'],
            'corporation_division' => $customerInfo['corporationDivision'],
            'customer_invoice_number' => $customerInfo['invoiceNumber'],
            'customer_company' => $customerInfo['customerCompany'],
            'customer_branch' => $customerInfo['customerBranch'],
            'customer_last_name' => $customerInfo['customerLastName'],
            'customer_first_name' => $customerInfo['customerFirstName'],
            'customer_phone_number' => $customerInfo['customerPhoneNumber'],
            'customer_zip_code' => $customerInfo['zipCode'],
            'customer_address1' => $customerInfo['customerAddress1'],
            'customer_address2' => $customerInfo['customerAddress2'],
            'customer_address3' => $customerInfo['customerAddress3'],
            'customer_address4' => $customerInfo['customerAddress4'],
            'subtotal' => $amountInfo['subtotal'],
            'tax_include' => $amountInfo['taxInclude'],
            'total' => $amountInfo['total'],
            'delete_flag' => 0,
        ])->save();

        return $transactionHeadModel;
    }

    /**
     * 取引明細保存
     *
     * @return TransactionDetail model
     */
    public function saveTransactionDetails(string $contractId, string $transactionId, array $detailRows)
    {
        TransactionDetail::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->delete();
        $saveData = [];

        $nowDate = new Carbon();

        foreach ($detailRows as $detailRow) {
            $saveData[] = [
                'contract_id' => $contractId,
                'transaction_id' => $transactionId,
                'product_no' => $detailRow['productNo'],
                'product_name' => $detailRow['productName'],
                'quantity' => $detailRow['quantity'],
                'unit_price' => $detailRow['unitPrice'],
                'tax_rate' => $detailRow['taxRate'],
                'total_price' => $detailRow['totalPrice'],
                'created_at' => $nowDate,
                'updated_at' => $nowDate,
            ];
        }
        TransactionDetail::insert($saveData);
    }

    /**
     * 取引金額保存
     *
     * @return void
     */
    public function saveTransactionPrices(string $contractId, string $transactionId, array $taxInfos)
    {
        $saveData = [];

        $nowDate = new Carbon();

        foreach ($taxInfos as $taxInfo) {
            $saveData[] = [
                'contract_id' => $contractId,
                'transaction_id' => $transactionId,
                'tax_rate' => $taxInfo['taxRate'],
                'taxable_amount' => $taxInfo['taxableAmount'],
                'tax_include' => $taxInfo['taxAmount'],
                'created_at' => $nowDate,
                'updated_at' => $nowDate,
            ];
        }
        TransactionPrice::insert($saveData);
    }

    /**
     * 取引データ取得
     *
     * @return array
     */
    public function getTransactionData(string $contractId, string $transactionId)
    {
        $transactionHeadData = TransactionHead::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->first();
        $transactionInfo = [
            'transactionTitle' => $transactionHeadData->transaction_title,
            'transactionDivision' => TransactionHead::$TRANSACTION_DIV_NAMES[$transactionHeadData->transaction_division],
            'transactionDate' => $transactionHeadData->transaction_date,
            'transactionBranch' => $transactionHeadData->transaction_branch, // TODO: 支店マスタ作ったらデータ見に行くようにする。
            'transactionPicName' => $transactionHeadData->transaction_pic_last_name.' '.$transactionHeadData->transaction_pic_first_name,
            'transactionNote' => $transactionHeadData->transaction_note,
        ];
        $customerInfo = [
            'corporationDivision' => TransactionHead::$CORPORATION_DIV_NAME[$transactionHeadData->corporation_division],
            'invoiceNumber' => $transactionHeadData->customer_invoice_number,
            'customerCompany' => $transactionHeadData->customer_company,
            'customerBranch' => $transactionHeadData->customer_branch,
            'customerName' => $transactionHeadData->customer_last_name.' '.$transactionHeadData->customer_first_name,
            'customerPhoneNumber' => $transactionHeadData->customer_phone_number,
            'customerZipCode' => $transactionHeadData->customer_zip_code,
            'customerAddress1' => $transactionHeadData->customer_address1,
            'customerAddress2' => $transactionHeadData->customer_address2,
            'customerAddress3' => $transactionHeadData->customer_address3,
            'customerAddress4' => $transactionHeadData->customer_address4,
        ];
        $amountInfo = [
            'subtotal' => $transactionHeadData->subtotal,
            'taxInclude' => $transactionHeadData->tax_include,
            'total' => $transactionHeadData->total,
        ];
        $detailRows = $this->getTransactionDetails($contractId, $transactionId);

        return [
            'transactionInfo' => $transactionInfo,
            'customerInfo' => $customerInfo,
            'amountInfo' => $amountInfo,
            'detailRows' => $detailRows,
        ];
    }

    /**
     * 取引明細データ取得
     *
     * @return array
     */
    private function getTransactionDetails(string $contractId, string $transactionId)
    {
        $transactionDetailDatas = TransactionDetail::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->get();
        $detailDatas = [];
        foreach ($transactionDetailDatas as $detailData) {
            $detailDatas[] = [
                'productNo' => $detailData->product_no,
                'productName' => $detailData->product_name,
                'quantity' => $detailData->quantity,
                'unitPrice' => $detailData->unit_price,
                'taxRate' => $detailData->tax_rate,
                'totalPrice' => $detailData->total_price,
            ];
        }

        return $detailDatas;
    }

    /**
     * トランザクション内の金額計算を行う。
     */
    public function culcTransaction(array $detailRows): array
    {
        $amountInfo = [
            'subtotal' => 0,
            'taxInclude' => 0,
            'total' => 0,
        ];

        $taxInfos = [];

        foreach ($detailRows as $detailRow) {
            $taxRate = $detailRow['taxRate'];
            $unitPrice = $detailRow['unitPrice'];
            $quantity = $detailRow['quantity'];
            $subtotal = bcmul($unitPrice, $quantity);

            if (array_key_exists($taxRate, $taxInfos)) {
                $taxInfos[$taxRate]['taxableAmount'] += $subtotal;
            } else {
                $taxInfos[$taxRate]['taxRate'] = $taxRate;
                $taxInfos[$taxRate]['taxableAmount'] = $subtotal;
                $taxInfos[$taxRate]['taxAmount'] = 0;
            }
        }

        foreach ($taxInfos as $taxRate => $taxInfo) {
            $taxInfos[$taxRate]['taxAmount'] = $this->culcTaxInclude($taxInfo['taxableAmount'], $taxInfo['taxRate']);

            $amountInfo['subtotal'] += $taxInfos[$taxRate]['taxableAmount'];
            $amountInfo['taxInclude'] += $taxInfos[$taxRate]['taxAmount'];
            $amountInfo['total'] += $taxInfos[$taxRate]['taxableAmount'];
        }

        return [
            'amountInfo' => $amountInfo,
            'taxInfos' => $taxInfos,
        ];
    }

    /**
     * 内税額計算
     * 内税 = (税込金額 / (1 + 税率)) * 税率
     *
     * @param  int  $taxableAmount
     * @param  int  $taxRate
     * @return void
     */
    private function culcTaxInclude($taxableAmount, $taxRate)
    {
        $effectiveTaxRate = bcdiv($taxRate, 100, 2);
        $exclusionTaxableAmount = bcdiv($taxableAmount, bcadd(1, $effectiveTaxRate, 2), 5);

        $taxInclude = bcmul($effectiveTaxRate, $exclusionTaxableAmount, 5);
        // TODO: 丸め方式をどこかに持つ必要性あり。
        return ceil($taxInclude);
    }
}
