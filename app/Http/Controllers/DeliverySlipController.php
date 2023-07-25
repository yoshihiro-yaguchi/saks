<?php

namespace App\Http\Controllers;

class DeliverySlipController extends Controller
{
    /**
     * 仕切書作成画面
     */
    public function createTransaction()
    {
        return view('transaction.createTransaction');
    }
}
