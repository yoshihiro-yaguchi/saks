<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHead extends Model
{
    /** 取引区分:買取 */
    public static $TRANSACTION_DIV_PURCHASE = '1';
    /** 取引区分:販売 */
    public static $TRANSACTION_DIV_SALE = '2';
    /** 取引区分:日本語 */
    public static $TRANSACTION_DIV_NAMES = array(
        '1' => '買取',
        '2' => '販売'
    );
    /** 法人区分:個人 */
    public static $CORPORATION_DIV_INDIVIDUAL = '1';
    /** 法人区分:法人 */
    public static $CORPORATION_DIV_CORPORATE = '2';
    /** 法人区分:日本語 */
    public static $CORPORATION_DIV_NAME = array(
        '1' => '個人',
        '2' => '法人'
    );

    use HasFactory;

    protected $table = 'transaction_headers';

    protected $primaryKey = 'id';

    protected $guarded = ['created_at', 'updated_at'];

    public function nextInsertTransactionId(string $contractId)
    {
        $maxTransactionId = $this->query()->where('contract_id', '=', $contractId)->max('transaction_id');
        if ($maxTransactionId === null) {
            return 1;
        }
        return $maxTransactionId + 1;
    }

    public function transactionData(string $contractId, string $transactionId)
    {
        return $this->join;
    }
}
