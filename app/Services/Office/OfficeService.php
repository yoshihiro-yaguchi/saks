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
     *
     * @param OfficeRepository $officeRepository
     */
    public function __construct(
        OfficeRepository $officeRepository
    )
    {
        $this->officeRepository = $officeRepository;
    }


    /**
     * すべての事業所を取得します。
     *
     * @param string $contractId
     * @return Collection
     */
    public function getAllOffices(string $contractId): Collection
    {
        return $this->officeRepository->getAllOffices($contractId);
    }
}
