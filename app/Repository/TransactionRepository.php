<?php

namespace App\Repository;

use App\Entities\Transaction\TransactionDetailEntity;
use App\Entities\Transaction\TransactionEntity;
use App\Entities\Transaction\TransactionHeadEntity;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * 取引関連データのレポジトリ
 */
class TransactionRepository extends BaseRepository
{
    /**
     * 取引データ取得
     */
    public function getTransactionData(string $contractId, string $transactionId): TransactionEntity
    {
        // 取引ヘッダー取得
        $headResult = DB::table('transaction_heads as T1')
            ->select(
                [
                    'T1.contract_id as contractId',
                    'T1.transaction_id as transactionId',
                    'T1.transaction_title as transactionTitle',
                    'T1.transaction_division as transactionDivision',
                    'T1.transaction_date as transactionDate',
                    'T1.transaction_branch as transactionBranch',
                    'T1.transaction_pic_name as transactionPicName',
                    'T1.subtotal as subtotal',
                    'T1.tax_include as taxInclude',
                    'T1.total as total',
                ]
            )
            ->where('T1.contract_id', '=', $contractId)
            ->where('T1.transaction_id', '=', $transactionId)
            ->first();

        // 取引明細取得
        $detailsReuslt = DB::table('transaction_details as T1')
            ->select(
                [
                    'T1.product_no as productNo',
                    'T1.product_name as productName',
                    'T1.quantity as quantity',
                    'T1.unit as unit',
                    'T1.unit_price as unitPrice',
                    'T1.tax_rate as taxRate',
                    'T1.total_price as totalPrice',
                ]
            )
            ->where('T1.contract_id', '=', $contractId)
            ->where('transaction_id', '=', $transactionId)
            ->get();

        // エンティティに詰める
        $transactionEntity = new TransactionEntity();
        $transactionEntity->transactionHead = $this->convertResultToEntity($headResult, new TransactionHeadEntity());
        $transactionEntity->transactionDetails = new Collection();
        foreach ($detailsReuslt as $detail) {
            $transactionEntity->transactionDetails->push($this->convertResultToEntity($detail, new TransactionDetailEntity()));
        }

        return $transactionEntity;
    }
}
