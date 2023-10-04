<?php

namespace App\Http\Controllers;

use App\Models\AffiliationContracts;
use Illuminate\Support\Facades\Auth;

class RedirectController extends Controller
{
    //
    public function authRedirector()
    {
        // メールアドレス認証が済んでいない。

        if (Auth::user()->email_verified_at === null) {
            return redirect('/confirmation_mail');
        }

        // 所属契約マスタにデータが存在しない。
        $countAffiliationContract = AffiliationContracts::where('email', '-', Auth::user()->email)->count();
        if ($countAffiliationContract === 0) {
            return redirect('/register_contract');
        }

        return redirect('/contractId/transaction/store');
    }
}
