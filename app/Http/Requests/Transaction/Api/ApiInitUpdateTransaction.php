<?php

namespace App\Http\Requests\Transaction\Api;

use Illuminate\Foundation\Http\FormRequest;

class ApiInitUpdateTransaction extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'transactionId' => ['nullable', 'max:8'],
        ];
    }

    public function attributes()
    {
        return [
            'transactionId' => '取引ID',
        ];
    }
}
