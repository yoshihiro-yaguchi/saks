<?php

namespace App\Http\Controllers\Master\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContract;
use App\Models\AffiliationContracts;
use App\Models\Contracts;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ContractApiController extends Controller
{
    /**
     * 契約情報を登録する
     *
     * @return json
     */
    public function storeContract(StoreContract $request)
    {
        // contract_id ランダムな8桁英字で契約IDを作成する。
        $contractId = '';
        $isUniqueContractId = false;
        while (! $isUniqueContractId) {
            $contractId = Str::random(8);
            $count = Contracts::where('contract_id', '=', $isUniqueContractId)->count();
            if ($count === 0) {
                $isUniqueContractId = true;
            }
        }
        // contracts
        Contracts::created([
            'contract_id' => $contractId,
            'contract_plan' => '0',
            'contract_company_name' => $request->input('contractCompanyName'),
            'contractors_name' => $request->input('contractersName'),
            'contract_date' => Carbon::today(),
            'contract_zipcode' => $request->input('contractZipcode'),
            'contract_address1' => $request->input('contractAddress1'),
            'contract_address2' => $request->input('contractAddress2'),
            'contract_address3' => $request->input('contractAddress3'),
            'contract_address4' => $request->input('contractAddress4'),
        ]);
        // affiliation_contracts
        AffiliationContracts::created([
            'contract_id' => $contractId,
            'email' => Auth::user()->email,
            'job_division' => '1',
        ]);

        return response()->json(
            ['status' => 'success'],
            200
        );
    }
}
