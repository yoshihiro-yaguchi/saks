<?php

namespace App\Rules\product;

use App\Services\CommonService;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class ValidateDuplicateProductionCode implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // 重複チェック
        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        $duplicateCount = DB::table('products')->where('contract_id', '=', $contractId)->where('production_code', '=', $value)->count();
        if ($duplicateCount > 0) {
            $fail(':attributeが重複しています。別の:attributeを設定してください。');
        }
    }
}
