<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\AffiliationContracts;
use Illuminate\Support\Facades\Auth;

class ContractController extends Controller
{
    /**
     * 契約登録画面を表示
     *
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function routeRegisterContract()
    {
        $countAffiliationContract = AffiliationContracts::where('email', '=', Auth::user()->email)->count();
        if ($countAffiliationContract !== 0) {
            return redirect('/redirector');
        } else {
            return view('auth.register_contract');
        }
    }

    /**
     * メール確認画面を表示
     *
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function routeConfirmMail()
    {
        if (Auth::user()->email_verified_at !== null) {
            return redirect('/redirector');
        } else {
            return view('auth.confirm_mail');
        }
    }
}
