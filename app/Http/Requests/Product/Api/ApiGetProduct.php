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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'productionCode' => ['required', 'max:50'],
        ];
    }

    public function attributes(): array
    {
        return [
            'productionCode' => '商品コード',
        ];
    }
}
