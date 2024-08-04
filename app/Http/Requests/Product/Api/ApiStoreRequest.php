<?php

namespace App\Http\Requests\Product\Api;

use App\Rules\product\ValidateDuplicateProductionCode;
use Illuminate\Foundation\Http\FormRequest;

class ApiStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'productionCode' => ['required', 'max:50', new ValidateDuplicateProductionCode, 'regex:/^[a-z0-9-]+$/i'],
            'productionName' => ['required', 'max:100'],
            // 'unitPrice' => ['required' , 'regex:/((^[0-9]{0,9})(\.[0-9]{0,3}$))|(^[0-9]{0,9}$)/'],
            'unitPrice' => ['required', 'max:9'],
            'taxDivision' => ['required'],
            // 'taxRate' => ['required' , 'regex:/((^[0-9]{0,5})(\.[0-9]{0,3}$))|(^[0-9]{0,5}$)/'],
            'taxRate' => ['required', 'max:5'],
            'unit' => ['required', 'max:5'],
        ];
    }

    public function attributes(): array
    {
        return [
            'productionCode' => '商品コード',
            'productionName' => '商品名',
            'unitPrice' => '単価',
            'taxDivision' => '税区分',
            'taxRate' => '税率',
            'unit' => '単位',
        ];
    }

    public function messages(): array
    {
        return [
            'productionCode.regex' => ':attributeは半角英数字のみ入力してください。',
            'unitPrice.regex' => ':attributeは整数部9桁、少数部3桁までで入力してください。',
            'taxRate.regex' => ':attributeは整数部5桁、少数部3桁までで入力してください。',

        ];
    }
}
