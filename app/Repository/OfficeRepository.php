<?php

namespace App\Repository;

use App\Entities\Office\OfficeEntity;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class OfficeRepository extends BaseRepository
{
    /**
     * 事業所データを取得する
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
                    'address4 as address4',
                ]
            )
            ->where('contract_id', '=', $contractId)
            ->where('office_code', '=', $officeCode)
            ->first();

        /** @var OfficeEntity $entity */
        $entity = $this->convertResultToEntity($result, new OfficeEntity);

        return $entity;
    }

    /**
     * 契約に含まれるすべての店舗を取得する
     */
    public function getAllOffices(string $contractId): Collection
    {
        $records = DB::table('offices')
            ->select(
                [
                    'office_code as officeCode',
                    'office_name as officeName',
                ]
            )
            ->where('contract_id', '=', $contractId)
            ->get();

        $result = new Collection;
        foreach ($records as $record) {
            $result->add($this->convertResultToEntity($record, new OfficeEntity));
        }

        return $result;
    }
}
