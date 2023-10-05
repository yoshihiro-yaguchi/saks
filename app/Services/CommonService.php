<?php
namespace App\Services;

use App\Models\AffiliationContracts;
use Illuminate\Support\Facades\Auth;

final class CommonService
{
    /**
     * 契約IDを返す
     *
     * @return string
     */
    public function getContractId():string {
        return AffiliationContracts::query()->where('email', '=' , Auth::user()->email)->first()->contract_id;
    }
}
