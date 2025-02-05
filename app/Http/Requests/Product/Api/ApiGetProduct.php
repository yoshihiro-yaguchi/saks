<?php

namespace App\Http\Requests\Product\Api;

use Illuminate\Foundation\Http\FormRequest;

class ApiGetProduct extends FormRequest
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
     * @return array<string,array<string>>
     */
    public function rules(): array
    {
        return [
            'productionCode' => ['required', 'max:50'],
        ];
    }

    /**
     * 属性名を返します。
     *
     * @return array<string,string>
     */
    public function attributes(): array
    {
        return [
            'productionCode' => '商品コード',
        ];
    }
}
