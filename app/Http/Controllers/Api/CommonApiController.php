<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommonApiController extends Controller
{
    /**
     * ユーザー情報を取得する
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchUserInfo()
    {
        $response = response()->json(
            [
                'name' => Auth::user()->name,
            ],
            200,
        );

        return $response;
    }
}
