<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransaction;
use App\Services\TransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
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

    $service = new TransactionService();

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

    // 取引データ作成
    DB::beginTransaction();
    try {
      $saveHeadResult = $service->insertTransactionHead($contractId, $transactionInfo, $customerInfo, $amountInfo);
      $service->saveTransactionDetails($contractId, $saveHeadResult->transaction_id, $detailRows);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('取引データ登録処理でエラー発生');

      throw $e;
    }
    DB::commit();


    $response = response()->json(
      [
        'status' => 'success',
        'contractId' => $contractId,
        'transactionId' => $saveHeadResult->transactionId,
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
   * @param string contractId
   * @param string transactionId
   * @return void
   */
  public function getTransactionData(string $contractId, string $transactionId)
  {
    // 契約IDと取引IDでデータを引っ張ってくる。

  }
}
