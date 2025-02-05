<?php

namespace App\Http\Requests\Product\Api;

use Illuminate\Foundation\Http\FormRequest;

class ApiSearchProductByCode extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'productionCode' => ['nullable', 'max:50'],
        ];
    }

    /**
     * 属性名を返します。
     *
     * @return array<string>
     */
    public function attributes(): array
    {
        return [
            'productionCode' => '商品コード',
        ];
    }
}
