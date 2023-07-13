<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
  /**
   * 仕切書作成画面
   */
  public function create()
  {
    return view('transaction.create');
  }

  public function createTransaction(Request $request)
  {
    $responseData =
      [
        "encodeData" => json_encode(array(
          'transactionInfo' => $request->input("transactionInfo"),
          'customerInfo' => $request->input("customerInfo"),
          'detailRows' => $request->input("detailRows"),
          'amountInfo' => $request->input("amountInfo"),
          'taxInfo' => $request->input("taxInfo"),
        ))
      ];

    $rules = [
      'transactionInfo.transactionTitle' => ['nullable', 'max:10']
    ];
    $message = [];
    $attributes = [
      'transactionInfo.transactionTitle' => '取引情報 件名'
    ];
    $validator = Validator::make($request->all(), $rules, $message, $attributes);
    if ($validator->fails()) {
      Log::info(json_encode($validator->getMessageBag()->toArray()));
      $responseData += [
        'errors' => json_encode($validator->getMessageBag()->toArray())
      ];
    }
    Log::info(json_encode($responseData));



    return view('transaction.create')->with($responseData);
  }
}
