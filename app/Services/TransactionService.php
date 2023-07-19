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
      'invoice_number' => $customerInfo['invoiceNumber'],
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
        'production_name' => $detailRow['productName'],
        'quantity' => $detailRow['quantity'],
        'unit_price' => $detailRow['unitPrice'],
        'tax_rate' => $detailRow['quantity'],
        'total_price' => $detailRow['totalPrice']
      ];
    }
    TransactionDetail::insert($saveData);
  }
}
