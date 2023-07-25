<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostLoginRequest;
use App\Services\Beans\LoginServiceBean;
use App\Services\LoginService;

class LoginController extends Controller
{
    public function login(PostLoginRequest $request)
    {
        $loginServiceBean = new LoginServiceBean();
        $loginServiceBean->setUserId($request->input('id'));
        $loginServiceBean->setPassword($request->input('password'));
        $result = (new LoginService())->login($loginServiceBean);
        $returnData = [
            'sample' => 'sample',
        ];
        if ($result->has('failed')) {
            $returnData['logicErrors'] = $result->get('failed');
        }
        // 渡された情報で認証
        // 認証に成功した時はセッションにデータを登録する
        // 認証に失敗した時はlogicErrorsをauth.loginに返す
        return view('auth.login', $returnData);
    }
}
