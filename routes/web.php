<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\Transaction\Api\TransactionApiController;
use App\Http\Controllers\Transaction\TransactionController;
use Illuminate\Support\Facades\Route;

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

// ログイン機能
Route::get('/login', function () {
    return view('auth.login');
});
Route::post('/login', [LoginController::class, 'login']);

/**
 * 取引
 */
// GET:作成
Route::get('/transaction/create', [TransactionController::class, 'create']);
// POST:作成
Route::post('/transaction/store', [TransactionApiController::class, 'storeTransaction']);


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

Route::get('/', function () {
    return view('index');
});
