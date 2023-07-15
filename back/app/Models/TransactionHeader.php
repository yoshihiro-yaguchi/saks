<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHeader extends Model
{
    /** 取引区分:買取 */
    public static $TRANSACTION_DIV_PURCHASE = '1';
    /** 取引区分:販売 */
    public static $TRANSACTION_DIV_SALE = '2';
    /** 法人区分:個人 */
    public static $CORPORATION_DIV_INDIVIDUAL = '1';
    /** 法人区分:法人 */
    public static $CORPORATION_DIV_CORPORATE = '2';

    use HasFactory;

    protected $table = 'transaction_headers';

    protected $primaryKey = 'id';

    protected $guarded = ['created_at', 'updated_at'];

    public function nextInsertTransactionId(string $contract_id)
    {
        $maxTransactionId = $this->query()->where('contract_id', '=', $contract_id)->max('transaction_id');
        if ($maxTransactionId === null) {
            return 1;
        }
        return $maxTransactionId + 1;
    }
}
