<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    function login(PostLoginRequest $request) {

        // 渡された情報で認証
        // 認証に成功した時はセッションにデータを登録する
        // 認証に失敗した時はlogicErrorsをauth.loginに返す
        $returnData = ['logicErrors' => collect(['ログインIDまたはパスワードが誤っています。'])];
        Log::info(json_encode($returnData));
        return view('auth.login', $returnData);
    }
}
