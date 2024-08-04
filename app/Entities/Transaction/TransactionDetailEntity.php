<?php

namespace App\Entities\Transaction;

use App\Entities\BaseEntity;

class TransactionDetailEntity extends BaseEntity
{
    /** @var string 商品番号 */
    public $productNo;

    /** @var string 商品名 */
    public $productName;

    /** @var float 数量 */
    public $quantity;

    /** @var string 単位 */
    public $unit;

    /** @var float 単価 */
    public $unitPrice;

    /** @var float 税率 */
    public $taxRate;

    /** @var float 合計 */
    public $totalPrice;
}
