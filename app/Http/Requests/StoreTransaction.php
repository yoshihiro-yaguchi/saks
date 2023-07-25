<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransaction extends FormRequest
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
            // 取引情報
            'transactionInfo.transactionTitle' => ['nullable', 'max:50'],
            'transactionInfo.transactionDate' => ['required', 'date_format:Y-m-d'],
            'transactionInfo.transactionPicLastName' => ['required', 'max:10'],
            'transactionInfo.transactionPicFirstName' => ['required', 'max:10'],
            'transactionInfo.transactionNote' => ['nullable', 'max:1000'],
            // お客様情報
            'customerInfo.invoiceNumber' => ['nullable', 'max:14'],
            'customerInfo.customerCompany' => ['nullable', 'max:50'],
            'customerInfo.customerBranch' => ['nullable', 'max:50'],
            'customerInfo.customerLastName' => ['required', 'max:10'],
            'customerInfo.customerFirstName' => ['required', 'max:10'],
            'customerInfo.customerPhoneNumber' => ['nullable', 'max:15'],
            'customerInfo.zipCode' => ['required', 'max:8'],
            'customerInfo.customerAddress1' => ['required', 'max:10'],
            'customerInfo.customerAddress2' => ['required', 'max:50'],
            'customerInfo.customerAddress3' => ['required', 'max:100'],
            'customerInfo.customerAddress4' => ['nullable', 'max:100'],
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
            'transactionInfo.transactionTitle' => '取引情報 件名',
            'transactionInfo.transactionDate' => '取引情報 取引日付',
            'transactionInfo.transactionPicLastName' => '取引情報 担当者(姓)',
            'transactionInfo.transactionPicFirstName' => '取引情報 担当者(名)',
            'transactionInfo.transactionNote' => '取引情報 取引備考',
            // お客様情報
            'customerInfo.invoiceNumber' => 'お客様情報 登録番号',
            'customerInfo.customerCompany' => 'お客様情報 会社名',
            'customerInfo.customerBranch' => 'お客様情報 支店名',
            'customerInfo.customerLastName' => 'お客様情報 お名前(姓)',
            'customerInfo.customerFirstName' => 'お客様情報 お名前(名)',
            'customerInfo.customerPhoneNumber' => 'お客様情報 電話番号',
            'customerInfo.zipCode' => 'お客様情報 郵便番号',
            'customerInfo.customerAddress1' => 'お客様情報 都道府県',
            'customerInfo.customerAddress2' => 'お客様情報 市区町村',
            'customerInfo.customerAddress3' => 'お客様情報 町・番地',
            'customerInfo.customerAddress4' => 'お客様情報 建物名等',
            // 明細情報
            'detailRows.*.quantity' => '明細情報 数量(重量)',
            'detailRows.*.unitPrice' => '明細情報 単価',
        ];
    }
}
