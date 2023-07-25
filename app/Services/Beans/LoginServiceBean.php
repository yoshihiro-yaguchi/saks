<?php

namespace App\Services\Beans;

class LoginServiceBean
{
    /** @var string ユーザーID */
    private $userId;

    /** @var string パスワード */
    private $password;

    // getter
    /**
     * ユーザーIDを返す
     *
     * @return string ユーザーID
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * パスワードを返す
     *
     * @return string パスワード
     */
    public function getPassword()
    {
        return $this->password;
    }

    // setter
    /**
     * ユーザーIDを設定する
     *
     * @param  string  $userId ユーザーID
     * @return void
     */
    public function setUserId(string $userId)
    {
        $this->userId = $userId;
    }

    /**
     * パスワードを設定する
     *
     * @param  string  $password パスワード
     * @return void
     */
    public function setPassword(string $password)
    {
        $this->password = $password;
    }
}
