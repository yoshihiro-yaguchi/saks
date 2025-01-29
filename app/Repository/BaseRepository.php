<?php

namespace App\Repository;

use App\Entities\BaseEntity;
use stdClass;

class BaseRepository
{
    /**
     * 検索結果をエンティティに変換する
     *
     * @param  BaseEntity  $entity  BaseEntityを継承したEntityクラスが渡されることを期待する
     * @return BaseEntity $entity
     */
    public function convertResultToEntity(?stdClass $result, BaseEntity $entity): BaseEntity
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
