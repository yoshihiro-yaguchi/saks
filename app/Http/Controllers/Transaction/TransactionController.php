<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;



class TransactionController extends Controller
{
  /**
   * 取引登録画面
   */
  public function store()
  {
    return view('transaction.store');
  }
}
