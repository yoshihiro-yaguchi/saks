<?php

namespace App\Http\Validator;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ReturnValidatorType;

final class TransactionValidator
{
  public static function createValidater(Request $request): ReturnValidatorType
  {
    // ルール
    $rules = [
      // 取引情報
      'transactionInfo.transactionTitle' => ['nullable', 'max:50'],
      'transactionInfo.transactionDate' => ['nullable', 'date_format:Y-m-d'],
      'transactionInfo.transactionPicLastName' => ['nullable', 'max:10'],
      'transactionInfo.transactionPicFirstName' => ['nullable', 'max:10'],
      'transactionInfo.transactionNote' => ['nullable', 'max:1000'],
      // お客様情報
      'customerInfo.invoiceNumber' => ['nullable', 'max:14'],
      'customerInfo.customerCompany' => ['nullable', 'max:50'],
      'customerInfo.customerBranch' => ['nullable', 'max:50'],
      'customerInfo.customerLastName' => ['nullable', 'max:10'],
      'customerInfo.customerFirstName' => ['nullable', 'max:10'],
      'customerInfo.customerPhoneNumber' => ['nullable', 'max:15'],
      'customerInfo.zipCode' => ['nullable', 'max:8'],
      'customerInfo.customerAddress1' => ['nullable', 'max:10'],
      'customerInfo.customerAddress2' => ['nullable', 'max:50'],
      'customerInfo.customerAddress3' => ['nullable', 'max:100'],
      'customerInfo.customerAddress4' => ['nullable', 'max:100'],
      // 明細情報
      'detailRows.*.quantity' => ['nullable', 'max:4'],
      'detailRows.*.unitPrice' => ['nullable', 'max:8'],
    ];
    // メッセージカスタマイズ
    $message = [];
    // 項目名カスタマイズ
    $attributes = [
      // 取引情報
      'transactionInfo.transactionTitle' => '取引情報 件名',
      'transactionInfo.transactionDate' => '取引情報 取引日付',
      'transactionInfo.transactionPicLastName' => '取引情報 担当者(姓)',
      'transactionInfo.transactionPicLastName' => '取引情報 担当者(名)',
      'transactionInfo.transactionPicFirstName' => '取引情報 取引備考',
      // お客様情報
      'customerInfo.invoiceNumber' => '取引情報 登録番号',
      'customerInfo.customerCompany' => '取引情報 会社名',
      'customerInfo.customerBranch' => '取引情報 支店名',
      'customerInfo.customerLastName' => '取引情報 お名前(姓)',
      'customerInfo.customerFirstName' => '取引情報 お名前(名)',
      'customerInfo.customerPhoneNumber' => '取引情報 電話番号',
      'customerInfo.zipCode' => '取引情報 郵便番号',
      'customerInfo.customerAddress1' => '取引情報 都道府県',
      'customerInfo.customerAddress2' => '取引情報 市区町村',
      'customerInfo.customerAddress3' => '取引情報 町・番地',
      'customerInfo.customerAddress4' => '取引情報 建物名等',
      // 明細情報
      'detailRows.*.quantity' => '明細情報 数量(重量)',
      'detailRows.*.unitPrice' => '明細情報 単価',
    ];
    return Validator::make($request->all(), $rules, $message, $attributes);
  }
}
