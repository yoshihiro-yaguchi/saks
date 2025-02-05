<?php

namespace App\Services;

use App\Entities\BaseEntity;
use App\Models\AffiliationContracts;
use Illuminate\Support\Facades\Auth;
use stdClass;

final class CommonService
{
    /**
     * 契約IDを返す
     */
    public function getContractId(): string
    {
        return AffiliationContracts::query()->where('email', '=', Auth::user()->email)->first()->contract_id;
    }

    /**
     * stdClassをエンティティに変換する
     *
     * @param  BaseEntity  $entity  BaseEntityを継承したEntityクラスが渡されることを期待する
     * @return BaseEntity $entity
     */
    public static function convertStdClassToEntity(?stdClass $result, BaseEntity $entity): BaseEntity
    {
        // $resultがnullの時は、entityには何も詰められていないことを期待するため、渡されたentityをそのまま返す
        if ($result === null) {
            $entity->isNull = true;

            return $entity;
        }

        foreach ((array) $result as $key => $value) {
            $entity->$key = $value;
        }

        return $entity;
    }

    /**
     * 配列をエンティティに変換する
     *
     * @param  array<string,mixed>|null  $result  変換対象の配列
     * @param  BaseEntity  $entity  BaseEntityを継承したEntityクラスが渡されることを期待する
     * @return BaseEntity $entity
     */
    public static function convertArrayToEntity(?array $result, BaseEntity $entity): BaseEntity
    {
        // $resultがnullの時は、entityには何も詰められていないことを期待するため、渡されたentityをそのまま返す
        if ($result === null) {
            $entity->isNull = true;

            return $entity;
        }

        foreach ($result as $key => $value) {
            $entity->$key = $value;
        }

        return $entity;
    }
}
