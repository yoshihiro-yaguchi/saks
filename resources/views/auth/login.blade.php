<!DOCTYPE html>
<html class="auth-login-html" lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Document</title>

  @vite(['resources/sass/app.scss','resources/css/app.css', 'resources/js/app.js'])

</head>
<body class="d-flex align-items-cente auth-login-body">

  <div class="d-flex align-items-center container">
    <div class="mx-auto row">
      <div class="col-9">
        <div class="auth-login-contents" style="width: 300px;">
          <img
            class="mx-auto auth-login-contents-icon"
            src="{{ asset('storage/images/image-logo.jpg') }}"
            width="50%"
            height="50%"
          >
          <div class="mx-auto auth-login-contents-header">
            <h1>サインイン</h1>
          </div>
          <form action="" method="post">
            <input type="email" class="form-control auth-login-contents-input" placeholder="メールアドレス">
            <input type="password" class="form-control auth-login-contents-input password" placeholder="パスワード">
          </form>

          <button type="submit" class="btn btn-lg btn-primary btn-block auth-login-contents-submit">サインイン</button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>