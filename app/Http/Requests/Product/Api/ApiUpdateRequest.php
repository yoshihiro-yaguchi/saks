<?php

namespace App\Http\Requests\Product\Api;

use Illuminate\Foundation\Http\FormRequest;

class ApiUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'productionName' => ['required' ,'max:100'],
            // 'unitPrice' => ['required' , 'regex:/((^[0-9]{0,9})(\.[0-9]{0,3}$))|(^[0-9]{0,9}$)/'],
            'unitPrice' => ['required' , 'max:9'],
            'taxDivision' => ['required'],
            // 'taxRate' => ['required' , 'regex:/((^[0-9]{0,5})(\.[0-9]{0,3}$))|(^[0-9]{0,5}$)/'],
            'taxRate' => ['required' , 'max:5'],
            'unit' => ['required' ,'max:5'],
        ];
    }

    public function attributes(): array
    {
        return [
            'productionName' => '商品名',
            'unitPrice' => '単価',
            'taxDivision' => '税区分',
            'taxRate' => '税率',
            'unit' => '単位',
        ];
    }

    public function messages() : array
    {
        return [
            'productionCode.regex' => ':attributeは半角英数字のみ入力してください。',
            'unitPrice.regex' => ':attributeは整数部9桁、少数部3桁までで入力してください。',
            'taxRate.regex' => ':attributeは整数部5桁、少数部3桁までで入力してください。'

        ];
    }

}
