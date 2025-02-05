<?php

namespace App\Http\Requests\Transaction\Api;

use Illuminate\Foundation\Http\FormRequest;

class ApiInitUpdateTransaction extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string,array<string>>
     */
    public function rules(): array
    {
        return [
            'transactionId' => ['nullable', 'max:8'],
        ];
    }

    /**
     * 属性名を定義します。
     *
     * @return array<string,string>
     */
    public function attributes()
    {
        return [
            'transactionId' => '取引ID',
        ];
    }
}
