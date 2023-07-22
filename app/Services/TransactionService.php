<?php

namespace App\Services;

use App\Models\TransactionDetail;
use App\Models\TransactionHead;
use Illuminate\Support\Facades\Log;

class TransactionService
{

  /**
   * 取引ヘッダー保存
   *
   * @param string $contractId
   * @param array $transactionInfo
   * @param array $customerInfo
   * @param array $amountInfo
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
      'delete_flag' => 0
    ])->save();
    return $transactionHeadModel;
  }

  /**
   * 取引明細保存
   *
   * @param string $contractId
   * @param string $transactionId
   * @param array $detailRows
   * @return TransactionDetail model
   */
  public function saveTransactionDetails(string $contractId, string $transactionId, array $detailRows)
  {
    TransactionDetail::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->delete();
    $saveData = [];
    foreach ($detailRows as $detailRow) {
      $saveData[] = [
        'contract_id' => $contractId,
        'transaction_id' => $transactionId,
        'product_no' => $detailRow['productNo'],
        'product_name' => $detailRow['productName'],
        'quantity' => $detailRow['quantity'],
        'unit_price' => $detailRow['unitPrice'],
        'tax_rate' => $detailRow['taxRate'],
        'total_price' => $detailRow['totalPrice']
      ];
    }
    TransactionDetail::insert($saveData);
  }

  /**
   * 取引データ取得
   *
   * @param string $contractId
   * @param string $transactionId
   * @return array
   */
  public function getTransactionData(string $contractId, string $transactionId)
  {
    $transactionHeadData = TransactionHead::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->first();
    $transactionInfo = array(
      'transactionTitle' => $transactionHeadData->transaction_title,
      'transactionDivision' => $transactionHeadData->transaction_division, // TODO: 定数から日本語データを取得する。
      'transactionDate' => $transactionHeadData->transaction_date,
      'transactionBranch' => $transactionHeadData->transaction_branch, // TODO: 支店マスタ作ったらデータ見に行くようにする。
      'transactionPicName' => $transactionHeadData->transaction_pic_last_name . ' ' . $transactionHeadData->transaction_pic_first_name,
      'transactionNote' => $transactionHeadData->transaction_note,
    );
    $customerInfo = array(
      'corporationDivision' => $transactionHeadData->corporation_division, // TODO: 定数から日本語データを取得する。
      'invoiceNumber' => $transactionHeadData->customer_invoice_number,
      'customerCompany' => $transactionHeadData->customer_company,
      'customerBranch' => $transactionHeadData->customer_branch,
      'customerName' => $transactionHeadData->customer_last_name . ' ' . $transactionHeadData->customer_first_name,
      'customerPhoneNumber' => $transactionHeadData->customer_phone_number,
      'customerZipCode' => $transactionHeadData->customer_zip_code,
      'customerAddress1' => $transactionHeadData->customer_address1,
      'customerAddress2' => $transactionHeadData->customer_address2,
      'customerAddress3' => $transactionHeadData->customer_address3,
      'customerAddress4' => $transactionHeadData->customer_address4,
    );
    $amountInfo = array(
      'subtotal' => $transactionHeadData->subtotal,
      'taxInclude' => $transactionHeadData->tax_include,
      'total' => $transactionHeadData->total,
    );
    $detailRows = $this->getTransactionDetails($contractId, $transactionId);

    return array(
      'transactionInfo' => $transactionInfo,
      'customerInfo' => $customerInfo,
      'amountInfo' => $amountInfo,
      'detailRows' => $detailRows,
    );
  }

  /**
   * 取引明細データ取得
   *
   * @param string $contractId
   * @param string $transactionId
   * @return array
   */
  private function getTransactionDetails(string $contractId, string $transactionId)
  {
    $transactionDetailDatas = TransactionDetail::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->get();
    $detailDatas = array();
    foreach ($transactionDetailDatas as $detailData) {
      $detailDatas[] = array(
        'productNo' => $detailData->product_no,
        'productName' => $detailData->product_name,
        'quantity' => $detailData->quantity,
        'unitPrice' => $detailData->unit_price,
        'taxRate' => $detailData->tax_rate,
        'totalPrice' => $detailData->total_price,
      );
    }
    return $detailDatas;
  }
}
