<?php

namespace App\Services\Transaction\Beans;

final class SearchTransactionBean
{
    // ---------------------------------------
    // 検索項目
    // ---------------------------------------
    /** @var string 取引ID */
    public $id;

    /** @var string 取引タイトル */
    public $transactionTitle;

    /** @var string 取引区分 */
    public $transactionDivision;

    /** @var string 取引日付From */
    public $transactionDateFrom;

    /** @var string 取引日付To */
    public $transactionDateTo;

    /** @var string 取引支店 */
    public $transactionBranch;

    /** @var string 取引担当者 */
    public $transactionPicName;

    /** @var string 法人区分 */
    public $corporationDivision;

    /** @var string お客様会社名 */
    public $customerCompany;

    /** @var string お客様名 */
    public $customerName;

    // ---------------------------------------
    // ページング処理項目
    // ---------------------------------------
    /** @var string ページ */
    public $page;

    /** @var string 一ページあたりの表示数 */
    public $itemsPerPage;
}
