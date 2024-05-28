<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\Api\ApiInitUpdateTransaction;
use App\Http\Requests\Transaction\Api\ApiSearchTransaction;
use App\Http\Requests\Transaction\Api\ApiUpdateTransaction;
use App\Http\Requests\Transaction\Api\StoreTransaction;
use App\Models\Office;
use App\Models\TransactionDetail;
use App\Services\CommonService;
use App\Services\Office\OfficeService;
use App\Services\Transaction\Beans\SearchTransactionBean;
use App\Services\Transaction\TransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionApiController extends Controller
{
    /** @var TransactionService */
    public $transactionService;

    /** @var OfficeService */
    public $officeService;

    public $commonService;

    public function __construct(
        TransactionService $transactionService,
        OfficeService $officeService,
        CommonService $commonService
    )
    {
        $this->transactionService = $transactionService;
        $this->officeService = $officeService;
        $this->commonService = $commonService;
    }

    /**
     * 取引作成画面初期処理
     *
     * @return void
     */
    public function initStoreTransaction()
    {
        $contract_id = $this->commonService->getContractId();

        $offices = $this->officeService->getAllOffices($this->commonService->getContractId());

        return response()->json(
            ['offices' => $offices],
            200
        );
    }

    /**
     * 取引作成
     *
     * @return JsonResponse response
     */
    public function storeTransaction(StoreTransaction $request)
    {
        Log::info('TransactionApiController.storeTransaction : START');

        $transactionInfo = $request->input('transactionInfo');
        $detailRows = $request->input('detailRows');
        $culcResult = $this->transactionService->culcTransaction($detailRows);
        $amountInfo = $culcResult['amountInfo'];

        // 契約ID
        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        // 取引データ作成
        DB::beginTransaction();
        try {
            $saveHeadResult = $this->transactionService->insertTransactionHead($contractId, $transactionInfo, $amountInfo);
            $this->transactionService->saveTransactionDetails($contractId, $saveHeadResult->transaction_id, $detailRows);
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

        // 画面表示用のデータを取得する。
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

    /**
     * 取引作成画面初期処理
     *
     * @return void
     */
    public function initSearchTransaction(ApiSearchTransaction $request)
    {
        $contractId = $this->commonService->getContractId();

        // 事業所一覧取得
        $offices = Office::query()->where('contract_id', '=', $contractId)->get(['office_code as officeCode', 'office_name as officeName']);

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
        $searchResult = $this->transactionService->searchTransactionData($contractId, $condition);

        return response()->json(
            [
                'offices' => $offices,
                'count' => $searchResult['count'],
                'transactions' => $searchResult['transactions'],
            ],
            200
        );
    }

    /**
     * 取引検索
     *
     * @return void
     */
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

    /**
     * 取引作成画面初期処理
     *
     * @return void
     */
    public function initUpdateTransaction(ApiInitUpdateTransaction $request)
    {
        Log::info('TransactionApiController.initUpdateTransaction : START');

        // 契約IDと取引IDでデータを引っ張ってくる。
        $contractId = $this->commonService->getContractId();
        $transactionData = $this->transactionService->getTransactionData($contractId, $request->input('transactionId'));

        $offices = $this->officeService->getAllOffices($contractId);

        Log::info('TransactionApiController.initUpdateTransaction : END');

        return response()->json(
            [
                'office' => $transactionData["office"],
                'transactionHead' => $transactionData['transactionHead'],
                'detailRows' => $transactionData['detailRows'],
                'taxInfos' => $transactionData['taxInfos'],
                "offices" => $offices,
            ],
            200
        );
    }

    /**
     * 取引更新
     *
     * @return JsonResponse response
     */
    public function updateTransaction(ApiUpdateTransaction $request)
    {
        Log::info('TransactionApiController.updateTransaction : START');

        $detailRows = $request->input('detailRows');
        $culcResult = $this->transactionService->culcTransaction($detailRows);
        $amountInfo = $culcResult['amountInfo'];

        // 更新データ
        $updateData = [
            'transaction_title' => $request->input('transactionTitle'),
            'transaction_division' => $request->input('transactionDivision'),
            'transaction_date' => $request->input('transactionDate'),
            'transaction_branch' => $request->input('transactionBranch'),
            'transaction_pic_name' => $request->input('transactionPicName'),
            'subtotal' => $amountInfo['subtotal'],
            'tax_include' => $amountInfo['taxInclude'],
            'total' => $amountInfo['total'],
        ];

        // 契約ID
        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        // 取引データ作成
        DB::beginTransaction();
        try {
            $this->transactionService->updateTransactionHead($request->input('transactionId'), $contractId, $updateData);
            // 明細をdeleteする。
            TransactionDetail::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $request->input('transactionId'))->delete();
            $this->transactionService->saveTransactionDetails($contractId, $request->input('transactionId'), $detailRows);
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
                'transactionId' => $request->input('transactionId'),
            ],
            200,
        );

        Log::info('response: '.$response);
        Log::info('TransactionApiController.updateTransaction : END');

        return $response;
    }
}
