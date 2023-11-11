<?php

namespace App\Http\Requests\Transaction\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ApiUpdateTransaction extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            // 取引情報
            'transactionTitle' => ['nullable', 'max:50'],
            'transactionDate' => ['required', 'date_format:Y-m-d'],
            'transactionPicName' => ['required', 'max:10'],
            'transactionNote' => ['nullable', 'max:1000'],
            // お客様情報
            'invoiceNumber' => ['nullable', 'max:14'],
            'customerCompany' => ['nullable', 'max:50'],
            'customerBranch' => ['nullable', 'max:50'],
            'customerName' => ['nullable', 'max:10'],
            'customerPhoneNumber' => ['nullable', 'max:15'],
            'customerZipCode' => ['nullable', 'max:8'],
            'customerAddress1' => ['nullable', 'max:10'],
            'customerAddress2' => ['nullable', 'max:50'],
            'customerAddress3' => ['nullable', 'max:100'],
            'customerAddress4' => ['nullable', 'max:100'],
            // 明細情報
            'detailRows' => ['bail', 'required'],
            'detailRows.*.quantity' => ['required', 'max:99999', 'numeric'],
            'detailRows.*.unitPrice' => ['required', 'max:999999999', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'detailRows' => '明細情報は1件以上設定してください。',
        ];
    }

    public function attributes()
    {
        return [
            // 取引情報
            'transactionTitle' => '取引情報 件名',
            'transactionDate' => '取引情報 取引日付',
            'transactionPicName' => '取引情報 担当者',
            'transactionNote' => '取引情報 取引備考',
            // お客様情報
            'invoiceNumber' => 'お客様情報 登録番号',
            'customerCompany' => 'お客様情報 会社名',
            'customerBranch' => 'お客様情報 支店名',
            'customerName' => 'お客様情報 お名前',
            'customerPhoneNumber' => 'お客様情報 電話番号',
            'zipCode' => 'お客様情報 郵便番号',
            'customerAddress1' => 'お客様情報 都道府県',
            'customerAddress2' => 'お客様情報 市区町村',
            'customerAddress3' => 'お客様情報 町・番地',
            'customerAddress4' => 'お客様情報 建物名等',
            // 明細情報
            'detailRows.*.quantity' => '明細情報 数量(重量)',
            'detailRows.*.unitPrice' => '明細情報 単価',
        ];
    }
}
