<?php

namespace App\Http\Controllers;

use App\Http\Requests\createTransactionForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
  /**
   * 仕切書作成画面
   */
  public function create()
  {
    $datas = [
      "encodeData" => json_encode(array(
        'message' => "成功",
        "array" => array('a' => 'conf', 'b' => 'anf', 'c' => 'enf')
      ))
    ];
    return view('transaction.create')->with($datas);
  }

  public function createTransaction(createTransactionForm $request)
  {
    Log::info(json_encode($request->input("_token")));
    Log::info(json_encode($request->input("transactionInfo")));
    Log::info(json_encode($request->input("customerInfo")));
    Log::info(json_encode($request->input("detailRows")));
    Log::info(json_encode($request->input("amountInfo")));
    Log::info(json_encode($request->input("taxInfo")));

    $datas = [
      "encodeData" => json_encode(array(
        'message' => "成功",
        "array" => array('a' => 'conf', 'b' => 'anf', 'c' => 'enf')
      ))
    ];
    return view('transaction.create')->with($datas);
  }
}
