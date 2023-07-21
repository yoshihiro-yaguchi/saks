<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Models\TransactionHead;
use App\Repository\TransactionRepository;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
  /**
   * 取引登録画面
   */
  public function routeStore(string $contractId)
  {
    Log::info('TransactionController.routeStore : START');
    Log::info('contractId: ' . $contractId);

    return view('transaction.store');
    Log::info('TransactionController.routeStore : END');
  }

  /**
   * 取引詳細画面
   */
  public function routeShow(string $contractId, string $transactionId)
  {
    Log::info('TransactionController.routeShow : START');
    Log::info('contractId: ' . $contractId);
    Log::info('transactionId: ' . $transactionId);

    // データ検索
    $dataCount = TransactionHead::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->count();

    // TODO: データ0件の場合の処理を考える。

    $transactionData = TransactionRepository::getTransactionData($contractId, $transactionId);


    $initData = array(
      'contractId' => $contractId,
      'transactionId' => $transactionId
    );



    return view('transaction.show')->with('initData', json_encode($initData));
    Log::info('TransactionController.routeShow : END');
  }
}
