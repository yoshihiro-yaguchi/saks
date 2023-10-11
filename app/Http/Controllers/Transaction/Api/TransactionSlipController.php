<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Http\Controllers\Controller;
use App\Services\CommonService;
use App\Services\Transaction\TransactionService;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;
use PDF;

class TransactionSlipController extends Controller
{
    public function printPurchaseInvoice (Request $request) {
        $transactionId = $request->input('transactionId');
        $service = new TransactionService();

        $contractId = (new CommonService)->getContractId(Auth::user()->email);
        $transactionData = $service->getTransactionData($contractId, $transactionId);
        $cultTransactionResult = $service->culcTransaction($transactionData['detailRows']);

        $transactionDate = new Carbon($transactionData['transactionHead']['transactionDate']);
        $data = [
            'transactionHead' => $transactionData['transactionHead'],
            'detailRows' => $transactionData['detailRows'],
            'amountInfo' => $cultTransactionResult['amountInfo'],
            'taxInfos' => $cultTransactionResult['taxInfos'],
            'transactionDate' => $transactionDate,
            'id' => $transactionId,
        ];
        //ここでviewに$dataを送っているけど、
        //今回$dataはviewで使わない
        $pdf = PDF::loadView('feature.transaction.purchaseInvoice', $data);

        // 表示させる場合
        // return $pdf->inline('document.pdf');

        return $pdf->download(); //生成されるファイル名
    }
}
