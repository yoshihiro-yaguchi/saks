<?php

namespace App\Http\Requests\Transaction\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ApiSearchTransaction extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string,array<string>>
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable', 'max:8'],
            'transactionTitle' => ['nullable', 'max:50'],
            'transactionDivision' => ['nullable'],
            'transactionDateFrom' => ['nullable', 'date_format:Y-m-d'],
            'transactionDateTo' => ['nullable', 'date_format:Y-m-d'],
            'transactionBranch' => ['nullable'],
            'transactionPicName' => ['nullable', 'max:10'],
            'corporationDivision' => ['nullable'],
            'customerCompany' => ['nullable', 'max:50'],
            'customerName' => ['nullable', 'max:10'],
        ];
    }

    /**
     * 属性名を返します。
     *
     * @return array<string,string>
     */
    public function attributes()
    {
        return [
            'id' => 'ID',
            'transactionTitle' => '取引件名',
            'transactionDivision' => '取引区分',
            'transactionDateFrom' => '取引日付From',
            'transactionDateTo' => '取引日付To',
            'transactionBranch' => '取引支店',
            'transactionPicName' => '取引担当者',
            'corporationDivision' => 'お客様区分',
            'customerCompany' => 'お客様会社名',
            'customerName' => 'お客様名',
        ];
    }
}
