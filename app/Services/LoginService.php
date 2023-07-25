<?php

namespace App\Services;

use App\Services\beans\LoginServiceBean;
use Illuminate\Support\Collection;

class LoginService
{
    /**
     * ログインサービス
     *
     * @param LoginServiceBean ログイン情報
     * @return Collection 実行成否
     */
    public function login(LoginServiceBean $bean)
    {
        if ($bean->getUserId() === 'a') {
            return $this->successReturnData(collect(['ログインIDまたはパスワードが誤っています。', 'id:'.$bean->getUserId(), 'password:'.$bean->getPassword()]));
        }

        return $this->failedReturnData(collect(['ログインIDまたはパスワードが誤っています。', 'id:'.$bean->getUserId(), 'password:'.$bean->getPassword()]));
    }

    private function successReturnData(Collection $data)
    {
        return (new Collection)->put('success', $data);
    }

    private function failedReturnData(Collection $data)
    {
        return (new Collection)->put('failed', $data);
    }
}
