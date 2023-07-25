<?php

namespace App\Repository;

use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * 取引関連データのレポジトリ
 */
class TransactionRepository
{
    /**
     * 取引データ取得
     *
     * @return Collection
     */
    public static function getTransactionData(string $contractId, string $transactionId)
    {
        return
          DB::table('transaction_headers as T1')->leftJoin('transaction_details as T2', function (JoinClause $join) {
              $join->on('T1.contract_id', '=', 'T2.contract_id')
                  ->on('T1.transaction_id', '=', 'T2.transaction_id');
          })
              ->where('T1.contract_id', '=', $contractId)
              ->where('T1.transaction_id', '=', $transactionId)
              ->get();
    }
}
