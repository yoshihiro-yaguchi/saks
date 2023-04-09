<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    function login(PostLoginRequest $request) {
        Log::info($request->id);
        Log::info($request->password);
        $collection = new Collection();
        $collection->add(collect(['errors' => ['メールアドレスの形式が誤っています', 'パスワードが誤っています', 'メールアドレスまたはパスワードが誤っています']]));
        return view('auth.login', $collection);
    }
}
