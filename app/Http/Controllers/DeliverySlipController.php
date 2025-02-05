<?php

namespace App\Http\Controllers;

class DeliverySlipController extends Controller
{
    /**
     * 仕切書作成画面
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function createTransaction()
    {
        return view('transaction.createTransaction');
    }
}
