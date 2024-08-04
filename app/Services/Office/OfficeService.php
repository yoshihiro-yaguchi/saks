<?php

namespace App\Services\Office;

use App\Repository\OfficeRepository;
use App\Services\BaseService;
use Illuminate\Support\Collection;

class OfficeService extends BaseService
{
    /** @var OfficeRepository */
    public $officeRepository;

    /**
     * コンストラクタ
     */
    public function __construct(
        OfficeRepository $officeRepository
    ) {
        $this->officeRepository = $officeRepository;
    }

    /**
     * すべての事業所を取得します。
     */
    public function getAllOffices(string $contractId): Collection
    {
        return $this->officeRepository->getAllOffices($contractId);
    }
}
