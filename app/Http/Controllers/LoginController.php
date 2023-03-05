<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    function login(Request $request) {
        return view('auth.login',
            ['errors' => ['メールアドレスの形式が誤っています', 'パスワードが誤っています', 'メールアドレスまたはパスワードが誤っています']]
        );
    }
}
