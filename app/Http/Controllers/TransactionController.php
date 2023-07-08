<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * 仕切書作成画面
     */
    public function createTransaction() {
        $datas = [
          "encodeData" => json_encode([
            'message' => "成功",
            "array" => ['conf', 'anf', 'enf']
          ])
        ];
        return view('transaction.createTransaction')->with($datas);
    }
}
