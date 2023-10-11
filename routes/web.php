<?php

use App\Http\Controllers\Api\CommonApiController;
use App\Http\Controllers\Master\Api\ContractApiController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\product\api\ProductApiController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\Transaction\Api\TransactionApiController;
use App\Http\Controllers\Transaction\Api\TransactionSlipController;
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
        return view('feature.transaction.index');
    })->where('any', '.*');
    /**
     * 取引:RESTAPI
     */
    // 登録画面初期処理
    Route::get('/api/transaction/store/init', [TransactionApiController::class, 'initStoreTransaction']);
    // 詳細表示データ
    Route::get('/api/transaction/getTransactionData/{transactionId}', [TransactionApiController::class, 'getTransactionData']);
    // 登録
    Route::post('/api/transaction/store', [TransactionApiController::class, 'storeTransaction']);
    // 検索画面初期処理
    Route::get('/api/transaction/search/init', [TransactionApiController::class, 'initSearchTransaction']);
    // 検索
    Route::get('/api/transaction/search', [TransactionApiController::class, 'searchTransactionData']);

    // 買取明細書・依頼書PDF
    Route::get('/api/transaction/pdf/print-purchase-invoice', [TransactionSlipController::class, 'printPurchaseInvoice']);
    // 買取明細書・依頼書(お客様控え)PDF
    // 領収書PDF
    // 請求書PDF

    /**
     * 商品
     */
    Route::get('/product/{any}', function () {
        return view('feature.product.index');
    })->where('any', '.*');
    /**
     * 商品:RESTAPI
     */
    // 登録
    Route::post('/api/product/store', [ProductApiController::class, 'store']);
    // 検索
    Route::get('/api/product/search', [ProductApiController::class, 'search']);

});

/**
 * テスト
 */
Route::post('/transaction/test', [TransactionApiController::class, 'testPost']);

// 明細書発行
Route::get('/test/bootstrap', function () {
    return view('test.bootstrap');
});

Route::get('/pdfPreview', function () {
    return view('pdf.document');
});
