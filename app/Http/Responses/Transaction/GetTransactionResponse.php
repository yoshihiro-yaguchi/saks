<?php

namespace App\Http\Responses\Transaction;

use App\Http\Responses\BaseResponse;

final class GetTransactionResponse extends BaseResponse
{
    public $transaction;

    public $detailRows;

    public $taxInfos;
}
