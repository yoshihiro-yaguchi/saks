<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShowTransactionData;
use App\Http\Requests\StoreTransaction;
use App\Models\TransactionHeader;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TransactionApiController extends Controller
{

  /**
   * 取引登録
   */
  /**
   * 取引作成
   *
   * @param StoreTransaction $request
   * @param string $contractId
   * @return JsonResponse response
   */
  public function storeTransaction(StoreTransaction $request, string $contractId)
  {
    Log::info('TransactionApiController.storeTransaction : START');
    // 入力値データをレスポンスデータにセットする。
    $responseData =
      [
        "oldInputData" => json_encode(array(
          'transactionInfo' => $request->input("transactionInfo"),
          'customerInfo' => $request->input("customerInfo"),
          'detailRows' => $request->input("detailRows"),
          'amountInfo' => $request->input("amountInfo"),
          'taxInfo' => $request->input("taxInfo"),
        ))
      ];

    $transactionInfo = $request->input("transactionInfo");
    $customerInfo = $request->input("customerInfo");
    $amountInfo = $request->input('amountInfo');
    $detailRows = $request->input('detailRows');
    Log::info($detailRows);

    // 取引ヘッダー作成
    try {
      $transactionHeaderModel = new TransactionHeader();
      $transactionHeaderModel->fill([
        'contract_id' => $contractId,
        'transaction_id' => $transactionHeaderModel->nextInsertTransactionId($contractId),
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
    } catch (\Exception $e) {
      throw $e;
    }
    $response = response()->json(
      [
        'status' => 'success',
        'responseData' => $responseData
      ],
      200,
    );

    Log::info('response: ' . $response);
    Log::info('TransactionApiController.storeTransaction : END');
    return $response;
  }

  /**
   * パラメーターから取引データを1件分返す
   *
   * @param ShowTransactionData $request
   * @param string $contractId
   * @return void
   */
  public function showTransactionData(ShowTransactionData $request, string $contractId)
  {
    // 契約IDと取引IDでデータを引っ張ってくる。
  }
}
