<?php

namespace App\Http\Controllers\Transaction\Api;

use App\Entities\Office\OfficeEntity;
use App\Entities\Transaction\TransactionHeadEntity;
use App\Http\Controllers\Controller;
use App\Models\Contracts;
use App\Models\Office;
use App\Services\CommonService;
use App\Services\Transaction\TransactionService;
use Barryvdh\Snappy\Facades\SnappyPdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionSlipController extends Controller
{
    public $transactionService;

    public function __construct(
        TransactionService $transactionService
    ) {
        $this->transactionService = $transactionService;
    }

    public function printPurchaseInvoice(Request $request)
    {
        $transactionId = $request->input('transactionId');

        $contractId = (new CommonService)->getContractId();
        $transactionData = $this->transactionService->getTransactionData($contractId, $transactionId);
        $cultTransactionResult = $this->transactionService->culcTransaction($transactionData['detailRows']);

        $contractInfo = (new Contracts)->query()->where('contract_id', '=', $contractId)->first();
        /** @var TransactionHeadEntity $transactionHead */
        $transactionHead = $transactionData['transactionHead'];
        /** @var OfficeEntity $officeInfo */
        $officeInfo = $transactionData['office'];

        $transactionDate = new Carbon($transactionHead->transactionDate);
        $data = [
            'transactionHead' => $transactionHead,
            'detailRows' => $transactionData['detailRows'],
            'amountInfo' => $cultTransactionResult['amountInfo'],
            'taxInfos' => $cultTransactionResult['taxInfos'],
            'transactionDate' => $transactionDate,
            'id' => $transactionId,
            'companyInfo' => [
                'companyName' => $contractInfo->contract_company_name,
                'branchName' => $officeInfo->officeName,
                'zipcode' => $officeInfo->zipcode,
                'address1' => $officeInfo->address1,
                'address2' => $officeInfo->address2,
                'address3' => $officeInfo->address3,
                'address4' => $officeInfo->address4,
                'pinName' => $transactionHead->transactionPicName,
                'email' => Auth::user()->email,
                'tel' => $officeInfo->phoneNumber,
                'invoiceNumber' => $contractInfo->invoice_number,
            ],
        ];

        $pdf = SnappyPdf::loadView('feature.transaction.pdf.purchaseInvoice', $data);

        return $pdf->download();
    }

    public function printReceipt(Request $request)
    {
        $transactionId = $request->input('transactionId');

        $contractId = (new CommonService)->getContractId();
        $transactionData = $this->transactionService->getTransactionData($contractId, $transactionId);
        $cultTransactionResult = $this->transactionService->culcTransaction($transactionData['detailRows']);

        $contractInfo = (new Contracts)->query()->where('contract_id', '=', $contractId)->first();
        $branchInfo = (new Office)->query()->where('contract_id', '=', $contractId)->where('office_code', '=', $transactionData['transactionHead']['officeCode'])->first();

        $transactionDate = new Carbon($transactionData['transactionHead']['transactionDate']);
        $data = [
            'transactionHead' => $transactionData['transactionHead'],
            'detailRows' => $transactionData['detailRows'],
            'amountInfo' => $cultTransactionResult['amountInfo'],
            'taxInfos' => $cultTransactionResult['taxInfos'],
            'transactionDate' => $transactionDate,
            'id' => $transactionId,
            'companyInfo' => [
                'companyName' => $contractInfo->contract_company_name,
                'branchName' => $branchInfo->office_name,
                'zipcode' => $branchInfo->zipcode,
                'address1' => $branchInfo->address1,
                'address2' => $branchInfo->address2,
                'address3' => $branchInfo->address3,
                'address4' => $branchInfo->address4,
                'pinName' => $transactionData['transactionHead']['transactionPicName'],
                'email' => Auth::user()->email,
                'tel' => $branchInfo->phone_number,
                'invoiceNumber' => $contractInfo->invoice_number,
            ],
        ];

        $pdf = SnappyPdf::loadView('feature.transaction.pdf.receipt', $data);

        return $pdf->download();
    }
}
