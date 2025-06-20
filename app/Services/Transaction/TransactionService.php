<?php

namespace App\Services\Transaction;

use App\Models\TransactionDetail;
use App\Models\TransactionHead;
use App\Services\Transaction\Beans\SearchTransactionBean;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionService
{
    /**
     * 取引ヘッダー保存
     *
     * @return TransactionHead model
     */
    public function insertTransactionHead(string $contractId, array $transactionInfo, array $amountInfo)
    {
        $transactionHeadModel = new TransactionHead();
        $transactionHeadModel->fill([
            'contract_id' => $contractId,
            'transaction_id' => $transactionHeadModel->nextInsertTransactionId($contractId),
            'transaction_title' => $transactionInfo['transactionTitle'],
            'transaction_division' => $transactionInfo['transactionDivision'],
            'transaction_date' => $transactionInfo['transactionDate'],
            'transaction_branch' => $transactionInfo['transactionBranch'],
            'transaction_pic_name' => $transactionInfo['transactionPicName'],
            'subtotal' => $amountInfo['subtotal'],
            'tax_include' => $amountInfo['taxInclude'],
            'total' => $amountInfo['total'],
            'delete_flag' => 0,
        ])->save();

        return $transactionHeadModel;
    }

    /**
     * 取引ヘッダー保存
     *
     * @return int
     */
    public function updateTransactionHead(string $transactionId, string $contractId, array $updateData)
    {
        return DB::table('transaction_headers')->where('transaction_id', '=', $transactionId)->where('contract_id', '=', $contractId)->update($updateData);
    }

    /**
     * 取引明細保存
     *
     * @return TransactionDetail model
     */
    public function saveTransactionDetails(string $contractId, string $transactionId, array $detailRows)
    {
        TransactionDetail::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->delete();
        $saveData = [];

        $nowDate = new Carbon();

        foreach ($detailRows as $detailRow) {
            $saveData[] = [
                'contract_id' => $contractId,
                'transaction_id' => $transactionId,
                'product_no' => $detailRow['productNo'] == null ? '' : $detailRow['productNo'],
                'product_name' => $detailRow['productName'] == null ? '' : $detailRow['productName'],
                'quantity' => $detailRow['quantity'],
                'unit' => $detailRow['unit'] == null ? '' : $detailRow['unit'],
                'unit_price' => $detailRow['unitPrice'],
                'tax_rate' => $detailRow['taxRate'],
                'total_price' => $detailRow['totalPrice'],
                'created_at' => $nowDate,
                'updated_at' => $nowDate,
            ];
        }
        TransactionDetail::insert($saveData);
    }

    /**
     * 取引データ取得
     */
    public function getTransactionData(string $contractId, string $transactionId): array
    {
        // TODO:取得できなかった場合を考える。
        $transactionHeadData = DB::table('transaction_headers as T1')
            ->select(
                [
                    'T1.transaction_title as transactionTitle',
                    'T1.transaction_division as transactionDivision',
                    'T1.transaction_date as transactionDate',
                    'T2.office_name as transactionBranch',
                    'T2.office_code as office_code',
                    'T1.transaction_pic_name as transactionPicName',
                    'T1.subtotal as subtotal',
                    'T1.tax_include as taxInclude',
                    'T1.total as total',
                ]
            )
            ->join('offices as T2', function ($join) {
                /** @var Illuminate\Database\Query\Builder::join $join */
                $join->on('T1.contract_id', '=', 'T2.contract_id')->on('T1.transaction_branch', '=', 'T2.office_code');
            })
            ->where('T1.contract_id', '=', $contractId)
            ->where('T1.transaction_id', '=', $transactionId)
            ->first();

        $transactionHead = [
            'transactionTitle' => $transactionHeadData->transactionTitle,
            'transactionDivision' => TransactionHead::$TRANSACTION_DIV_NAMES[$transactionHeadData->transactionDivision],
            'transactionDivisionId' => $transactionHeadData->transactionDivision,
            'transactionDate' => $transactionHeadData->transactionDate,
            'transactionBranch' => $transactionHeadData->transactionBranch,
            'officeCode' => $transactionHeadData->office_code,
            'transactionPicName' => $transactionHeadData->transactionPicName,
            'subtotal' => $transactionHeadData->subtotal,
            'taxInclude' => $transactionHeadData->taxInclude,
            'total' => $transactionHeadData->total,
        ];
        $detailRows = $this->getTransactionDetails($contractId, $transactionId);

        return [
            'transactionHead' => $transactionHead,
            'detailRows' => $detailRows,
            'taxInfos' => $this->culcTransaction($detailRows)['taxInfos'],
        ];
    }

    /**
     * 取引データ取得
     */
    public function getUpdateTransactionData(string $contractId, string $transactionId): array
    {
        // TODO:取得できなかった場合を考える。
        $transactionHeadData = DB::table('transaction_headers as T1')
            ->select(
                [
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
            ->join('offices as T2', function ($join) {
                /** @var Illuminate\Database\Query\Builder::join $join */
                $join->on('T1.contract_id', '=', 'T2.contract_id')->on('T1.transaction_branch', '=', 'T2.office_code');
            })
            ->where('T1.contract_id', '=', $contractId)
            ->where('T1.transaction_id', '=', $transactionId)
            ->first();

        $transactionHead = [
            'transactionId' => $transactionHeadData->transactionId,
            'transactionTitle' => $transactionHeadData->transactionTitle,
            'transactionDivision' => $transactionHeadData->transactionDivision,
            'transactionDate' => $transactionHeadData->transactionDate,
            'transactionBranch' => $transactionHeadData->transactionBranch,
            'transactionPicName' => $transactionHeadData->transactionPicName,
            'subtotal' => $transactionHeadData->subtotal,
            'taxInclude' => $transactionHeadData->taxInclude,
            'total' => $transactionHeadData->total,
        ];
        $detailRows = $this->getTransactionDetails($contractId, $transactionId);

        return [
            'transactionHead' => $transactionHead,
            'detailRows' => $detailRows,
            'taxInfos' => $this->culcTransaction($detailRows)['taxInfos'],
        ];
    }

    /**
     * 取引検索
     */
    public function searchTransactionData(string $contractId, SearchTransactionBean $condition): array
    {
        $query = DB::table('transaction_headers')
            ->select(
                [
                    'transaction_id as id',
                    'transaction_title as transactionTitle',
                    'transaction_division as transactionDivision',
                    'transaction_date as transactionDate',
                    'transaction_branch as transactionBranch',
                    'transaction_pic_name as transactionPicName',
                ]
            )
            ->where('contract_id', '=', $contractId);
        // 取引ID
        if ($condition->id !== null) {
            $query->where('transaction_id', '=', $condition->id);
        }
        // 取引タイトル
        if ($condition->transactionTitle !== null) {
            $query->where('transaction_title', 'LIKE', "%{$condition->transactionTitle}%");
        }
        // 取引区分
        if ($condition->transactionDivision !== null) {
            $query->where('transaction_division', '=', $condition->transactionDivision);
        }
        // 取引日付From
        if ($condition->transactionDateFrom !== null) {
            $query->where('transaction_date', '>=', $condition->transactionDateFrom);
        }
        // 取引日付To
        if ($condition->transactionDateTo !== null) {
            $query->where('transaction_date', '<=', $condition->transactionDateTo);
        }
        // 取引支店
        if ($condition->transactionBranch !== null) {
            $query->where('transaction_branch', '=', $condition->transactionBranch);
        }

        $count = $query->count();
        if ($count === 0) {
            return [
                'count' => $count,
                'transactions' => [],
            ];
        }

        return [
            'count' => $count,
            'transactions' => $query->forPage($condition->page, $condition->itemsPerPage)->orderByDesc('created_at')->get(),
        ];
    }

    /**
     * 取引明細データ取得
     */
    private function getTransactionDetails(string $contractId, string $transactionId): array
    {
        $transactionDetailDatas = TransactionDetail::query()->where('contract_id', '=', $contractId)->where('transaction_id', '=', $transactionId)->get();
        $detailDatas = [];
        foreach ($transactionDetailDatas as $detailData) {
            $detailDatas[] = [
                'productNo' => $detailData->product_no,
                'productName' => $detailData->product_name,
                'quantity' => $detailData->quantity,
                'unit' => $detailData->unit,
                'unitPrice' => $detailData->unit_price,
                'taxRate' => $detailData->tax_rate,
                'totalPrice' => $detailData->total_price,
            ];
        }

        return $detailDatas;
    }

    /**
     * トランザクション内の金額計算を行う。
     */
    public function culcTransaction(array $detailRows): array
    {
        $amountInfo = [
            'subtotal' => 0,
            'taxInclude' => 0,
            'total' => 0,
        ];

        $taxInfos = [];

        foreach ($detailRows as $detailRow) {
            $taxRate = $detailRow['taxRate'];
            $unitPrice = $detailRow['unitPrice'];
            $quantity = $detailRow['quantity'];
            $subtotal = bcmul($unitPrice, $quantity);

            if (array_key_exists($taxRate, $taxInfos)) {
                $taxInfos[$taxRate]['taxableAmount'] += $subtotal;
            } else {
                $taxInfos[$taxRate]['taxRate'] = $taxRate;
                $taxInfos[$taxRate]['taxableAmount'] = $subtotal;
                $taxInfos[$taxRate]['taxAmount'] = 0;
            }
        }

        foreach ($taxInfos as $taxRate => $taxInfo) {
            $taxInfos[$taxRate]['taxAmount'] = $this->culcTaxInclude($taxInfo['taxableAmount'], $taxInfo['taxRate']);

            $amountInfo['subtotal'] += $taxInfos[$taxRate]['taxableAmount'];
            $amountInfo['taxInclude'] += $taxInfos[$taxRate]['taxAmount'];
            $amountInfo['total'] += $taxInfos[$taxRate]['taxableAmount'];
        }

        return [
            'amountInfo' => $amountInfo,
            'taxInfos' => $taxInfos,
        ];
    }

    /**
     * 内税額計算
     * 内税 = (税込金額 / (1 + 税率)) * 税率
     *
     * @param  int  $taxableAmount
     * @param  int  $taxRate
     * @return void
     */
    private function culcTaxInclude($taxableAmount, $taxRate)
    {
        $effectiveTaxRate = bcdiv($taxRate, 100, 2);
        $exclusionTaxableAmount = bcdiv($taxableAmount, bcadd(1, $effectiveTaxRate, 2), 5);

        $taxInclude = bcmul($effectiveTaxRate, $exclusionTaxableAmount, 5);

        // TODO: 丸め方式をどこかに持つ必要性あり。
        return ceil($taxInclude);
    }
}
