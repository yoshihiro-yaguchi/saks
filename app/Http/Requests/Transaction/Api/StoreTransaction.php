<?php

namespace App\Http\Requests\Transaction\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTransaction extends FormRequest
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
            // 取引情報
            'transactionInfo.transactionTitle' => ['nullable', 'max:50'],
            'transactionInfo.transactionDate' => ['required', 'date_format:Y-m-d'],
            'transactionInfo.transactionPicName' => ['required', 'max:10'],
            'transactionInfo.transactionNote' => ['nullable', 'max:1000'],
            // お客様情報
            'customerInfo.invoiceNumber' => ['nullable', 'max:14'],
            'customerInfo.customerCompany' => ['nullable', 'max:50'],
            'customerInfo.customerBranch' => ['nullable', 'max:50'],
            'customerInfo.customerName' => ['nullable', 'max:10'],
            'customerInfo.customerPhoneNumber' => ['nullable', 'max:15'],
            'customerInfo.zipCode' => ['nullable', 'max:8'],
            'customerInfo.customerAddress1' => ['nullable', 'max:10'],
            'customerInfo.customerAddress2' => ['nullable', 'max:50'],
            'customerInfo.customerAddress3' => ['nullable', 'max:100'],
            'customerInfo.customerAddress4' => ['nullable', 'max:100'],
            // 明細情報
            'detailRows' => ['bail', 'required'],
            'detailRows.*.quantity' => ['required', 'max:99999', 'numeric'],
            'detailRows.*.unitPrice' => ['required', 'max:99999999', 'numeric'],
        ];
    }

    /**
     * バリデーションエラーメッセージを返します。
     *
     * @return array<string,string>
     */
    public function messages()
    {
        return [
            'detailRows' => '明細情報は1件以上設定してください。',
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
            // 取引情報
            'transactionInfo.transactionTitle' => '取引情報 件名',
            'transactionInfo.transactionDate' => '取引情報 取引日付',
            'transactionInfo.transactionPicName' => '取引情報 担当者',
            'transactionInfo.transactionNote' => '取引情報 取引備考',
            // お客様情報
            'customerInfo.invoiceNumber' => 'お客様情報 登録番号',
            'customerInfo.customerCompany' => 'お客様情報 会社名',
            'customerInfo.customerBranch' => 'お客様情報 支店名',
            'customerInfo.customerName' => 'お客様情報 お名前',
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
