<?php

namespace App\Http\Requests\Product\Api;


use Illuminate\Foundation\Http\FormRequest;

class ApiSearchProduct extends FormRequest
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
            'productionCode' => ['nullable', 'max:50'],
            'productionName' => ['nullable', 'max:100'],
            'taxDivision' => ['nullable'],
            'taxRate' => ['nullable', 'regex:/((^[0-9]{0,5})(\.[0-9]{0,3}$))|(^[0-9]{0,5}$)/'],
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
}
