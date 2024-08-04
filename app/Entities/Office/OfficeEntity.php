<?php

namespace App\Entities\Office;

use App\Entities\BaseEntity;

class OfficeEntity extends BaseEntity
{
    /** @var string 契約ID */
    public $contractId;

    /** @var string 事業所コード */
    public $officeCode;

    /** @var string 事業所名 */
    public $officeName;

    /** @var string 電話番号 */
    public $phoneNumber;

    /** @var string 郵便番号 */
    public $zipcode;

    /** @var string 都道府県 */
    public $address1;

    /** @var string 市区町村 */
    public $address2;

    /** @var string 町・番地 */
    public $address3;

    /** @var string 建物名等 */
    public $address4;
}
