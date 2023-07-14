<?php

namespace App\Http\Controllers;

use App\Http\Validator\TransactionValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;


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


    $validator = TransactionValidator::createTransactionValidater($request->all());
    if ($validator->fails()) {
      // バリデーションに引っかかったとき
      $responseData += [
        'errors' => json_encode($validator->getMessageBag()->toArray())
      ];
      return view('transaction.create')->with($responseData);
    }



    return view('transaction.create')->with($responseData);
  }
}
