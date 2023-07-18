<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;



class TransactionController extends Controller
{
  /**
   * 取引登録画面
   */
  public function routeStore(string $contractId)
  {
    return view('transaction.store');
  }

  /**
   * 取引詳細画面
   */
  public function routeShow(string $contractId, string $id)
  {
    return view('transaction.show');
  }
}
