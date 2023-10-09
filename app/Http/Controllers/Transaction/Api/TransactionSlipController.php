<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;
use PDF;

class TransactionSlipController extends Controller
{
    public function printPurchaseInvoice (Request $request) {
        $transactionId = $request;

        $data = [
            'foo' => 'bar',
        ];
        //ここでviewに$dataを送っているけど、
        //今回$dataはviewで使わない
        $pdf = PDF::loadView('transaction.pdf.purchaseInvoice', $data);

        // 表示させる場合
        // return $pdf->inline('document.pdf');

        return $pdf->setOption('encoding', 'utf-8')->download(); //生成されるファイル名
    }
}
