<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
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
  public function routeShow(string $contractId, string $id)
  {
    Log::info('TransactionController.routeShow : START');
    Log::info('contractId: ' . $contractId);
    Log::info('transactionId: ' . $id);
    return view('transaction.show');
    Log::info('TransactionController.routeShow : END');
  }
}
