<?php

use App\Http\Controllers\Api\CommonApiController;
use App\Http\Controllers\Master\Api\ContractApiController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\Transaction\Api\TransactionApiController;
use Illuminate\Support\Facades\Route;

// 認証チェック
// ログインしていない場合はログイン画面に遷移させる。

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware('auth')->group(function () {

    // リダイレクト
    Route::get('/', [RedirectController::class, 'index']);
    Route::get('/redirector', [RedirectController::class, 'authRedirector']);

    /**
     * 認証
     */
    // メール確認画面
    Route::get('/confirmation_mail', function () {
        return view('auth.confirm_mail');
    });

    /**
     * マスターメンテナンス
     */
    // 契約情報入力画面
    Route::get('/register_contract', function () {
        return view('auth.register_contract');
    });
    /**
     * マスターメンテナンス:RESTAPI
     */
    // 契約情報登録
    Route::post('/api/store_contract', [ContractApiController::class, 'storeContract']);

    // ホーム画面

    /**
     * 共通:RESTAPI
     */
    Route::get('/api/fetchUserInfo', [CommonApiController::class, 'fetchUserInfo']);

    /**
     * 取引
     */
    Route::get('/transaction/{any}', function () {
        return view('transaction.index');
    })->where('any', '.*');
    /**
     * 取引:RESTAPI
     */
    // 取引データ登録
    Route::post('/api/transaction/store', [TransactionApiController::class, 'storeTransaction']);
    // 取引データ取得
    Route::get('/api/transaction/getTransactionData/{transactionId}', [TransactionApiController::class, 'getTransactionData']);
    // 取引データ検索
    Route::get('/api/transaction/searchTransactionData', [TransactionApiController::class, 'searchTransactionData']);
});

/**
 * テスト
 */
Route::post('/transaction/test', [TransactionApiController::class, 'testPost']);

// 明細書発行
Route::get('/test/bootstrap', function () {
    return view('test.bootstrap');
});

Route::get('/pdf', [PdfController::class, 'viewPdf'])->name('viewPdf');

Route::get('/pdfPreview', function () {
    return view('pdf.document');
});
