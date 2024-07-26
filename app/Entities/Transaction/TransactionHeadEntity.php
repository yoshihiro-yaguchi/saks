<?php

namespace App\Entities\Transaction;

use App\Entities\BaseEntity;

class TransactionHeadEntity extends BaseEntity
{
    /** @var string 契約ID */
    public $contractId;
    /** @var int 契約ID */
    public $transactionId;
    /** @var string 件名 */
    public $transactionTitle;
    /** @var int 契約区分 */
    public $transactionDivision;
    /** @var string 取引日付 */
    public $transactionDate;
    /** @var string 取引支店 */
    public $transactionBranch;
    /** @var string 取引支店名 */
    public $officeName;
    /** @var string 担当者名 */
    public $transactionPicName;
    /** @var float 小径 */
    public $subtotal;
    /** @var float 内消費税 */
    public $taxInclude;
    /** @var float 合計 */
    public $total;
}
