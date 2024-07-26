<?php

namespace App\Entities\Transaction;

use App\Entities\BaseEntity;
use Illuminate\Support\Collection;

class TransactionEntity extends BaseEntity
{
    /** @var TransactionHeadEntity 取引ヘッダー */
    public $transactionHead;
    /** @var Collection<TransactionDetailEntity> 取引明細 */
    public $transactionDetails;
}
