<?php

namespace App\Http\Controllers\Stock\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Stock\SearchStock;

class StockApiController extends Controller
{
    /**
     * 在庫検索(リスト返却・ページングあり)
     *
     * @return void
     */
    public function searchStock(SearchStock $request) {}
}
