<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;



class TransactionController extends Controller
{
  /**
   * 取引登録画面
   */
  public function routeStore()
  {
    return view('transaction.store');
  }

  /**
   * 取引詳細画面
   */
  public function routeShow()
  {
    return view('transaction.show');
  }
}
