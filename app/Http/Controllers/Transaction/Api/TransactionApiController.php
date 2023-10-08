<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiSearchTransaction;
use App\Http\Requests\StoreTransaction;
use App\Services\CommonService;
use App\Services\Transaction\Beans\SearchTransactionBean;
use App\Services\Transaction\TransactionService;
use Illuminate\Http\JsonResponse;
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
            ['transactionData' => $transactionData],
            200
        );

        Log::info('response: '.$response);
        Log::info('TransactionApiController.getTransactionData : END');

        return $response;
    }

    public function searchTransactionData(ApiSearchTransaction $request)
    {
        Log::info('TransactionApiController.searchTransactionData : START');

        // 条件設定
        $condition = new SearchTransactionBean();
        $condition->id = $request->input('id');
        $condition->transactionTitle = $request->input('transactionTitle');
        $condition->transactionDivision = $request->input('transactionDivision');
        $condition->transactionDateFrom = $request->input('transactionDateFrom');
        $condition->transactionDateTo = $request->input('transactionDateTo');
        $condition->transactionBranch = $request->input('transactionBranch');
        $condition->transactionPicName = $request->input('transactionPicName');
        $condition->corporationDivision = $request->input('corporationDivision');
        $condition->customerCompany = $request->input('customerCompany');
        $condition->customerName = $request->input('customerName');
        $condition->page = $request->input('page');
        $condition->itemsPerPage = $request->input('itemsPerPage');

        $commonService = new CommonService();
        $searchResult = $this->transactionService->searchTransactionData($commonService->getContractId(), $condition);
        $response = response()->json(
            [
                'count' => $searchResult['count'],
                'transactions' => $searchResult['transactions'],
            ],
            '200'
        );
        Log::info('TransactionApiController.searchTransactionData : END');

        return $response;
    }
}
