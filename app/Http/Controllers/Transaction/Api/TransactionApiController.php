<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransaction;
use App\Models\AffiliationContracts;
use App\Services\CommonService;
use App\Services\TransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionApiController extends Controller
{
    /** @var TransactionService */
    public $transactionService;

    public function __construct()
    {
        $this->transactionService = new TransactionService();
    }

    /**
     * 取引作成
     *
     * @return JsonResponse response
     */
    public function storeTransaction(StoreTransaction $request)
    {
        Log::info('TransactionApiController.storeTransaction : START');

        $service = new TransactionService();

        $transactionInfo = $request->input('transactionInfo');
        $customerInfo = $request->input('customerInfo');
        $detailRows = $request->input('detailRows');
        $culcResult = $this->transactionService->culcTransaction($detailRows);
        $amountInfo = $culcResult['amountInfo'];
        $taxInfos = $culcResult['taxInfos'];

        // 契約ID
        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        // 取引データ作成
        DB::beginTransaction();
        try {
            $saveHeadResult = $service->insertTransactionHead($contractId, $transactionInfo, $customerInfo, $amountInfo);
            $service->saveTransactionDetails($contractId, $saveHeadResult->transaction_id, $detailRows);
            $service->saveTransactionPrices($contractId, $saveHeadResult->transaction_id, $taxInfos);
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
                'transactionId' => $saveHeadResult->transaction_id,
            ],
            200,
        );

        Log::info('response: '.$response);
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
    public function getTransactionData(string $transactionId)
    {
        Log::info('TransactionApiController.getTransactionData : START');

        // 契約IDと取引IDでデータを引っ張ってくる。
        $commonService = new CommonService();
        $transactionData = $this->transactionService->getTransactionData($commonService->getContractId(), $transactionId);

        $response = response()->json(
            ['initData' => $transactionData],
            200
        );

        Log::info('response: '.$response);
        Log::info('TransactionApiController.getTransactionData : END');

        return $response;
    }
}
