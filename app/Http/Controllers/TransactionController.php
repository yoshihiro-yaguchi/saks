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
          "encodeData" => json_encode(array(
            'message' => "成功",
            "array" => array('a'=>'conf', 'b'=>'anf', 'c'=>'enf')
          ))
        ];
        return view('transaction.createTransaction')->with($datas);
    }
}
