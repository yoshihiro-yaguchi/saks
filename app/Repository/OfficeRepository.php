<?php
namespace App\Repository;

use App\Entities\Office\OfficeEntity;
use Illuminate\Support\Facades\DB;

class OfficeRepository extends BaseRepository
{
    /**
     * 事業所データを取得する
     *
     * @param string $contractId
     * @param string $officeCode
     * @return OfficeEntity
     */
    public function getOffice(string $contractId, string $officeCode): OfficeEntity
    {
        $result = DB::table('offices')
            ->select(
                [
                    'contract_id as contractId',
                    'office_code as officeCode',
                    'office_name as officeName',
                    'phone_number as phoneNumber',
                    'zipcode as zipcode',
                    'address1 as address1',
                    'address2 as address2',
                    'address3 as address3',
                    'address4 as address4'
                ]
            )
            ->where('contract_id', '=', $contractId)
            ->where('office_code', '=', $officeCode)
            ->first();

        return $this->convertResultToEntity($result, new OfficeEntity());
    }
}
