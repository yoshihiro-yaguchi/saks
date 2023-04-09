<!DOCTYPE html>
<html class="auth-login-html" lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ログイン</title>

  @vite(['resources/sass/app.scss','resources/css/app.css', 'resources/js/app.js'])

</head>
<script type="module">
  $('#submit').on('click', function() {
    $('#loginForm').submit();
  })
</script>
<body class="d-flex align-items-cente auth-login-body">

  <div class="d-flex align-items-center container">
    <div class="mx-auto row">
      <div class="col-9">
        <div class="auth-login-contents">
          <img
            class="mx-auto auth-login-contents-icon"
            src="{{ asset('storage/images/image-logo.jpg') }}"
            width="50%"
            height="50%"
          >
          <div class="mx-auto auth-login-contents-header">
            <h1>サインイン</h1>
          </div>

          @if ($errors->any() || isset($logicErrors))
            <div class="alert alert-danger auth-login-error" role="alert">
              <h1 class="auth-login-error-header"><b>エラーが発生しました。</b></h1>
              <ul class="list-group">
              @if ($errors->any())
                @foreach ($errors->all() as $error)
                  <li class="list-group-item">{{$error}}</li>
                @endforeach
              @endif
              @if (isset($logicErrors))
                @foreach ($logicErrors->all() as $error)
                  <li class="list-group-item">{{$error}}</li>
                @endforeach
              @endif
              </ul>
            </div>
          @endif
          <form id='loginForm' action="{{ url('/login') }}" method="post">
            @csrf
            <input id='id' name='id' class="form-control auth-login-contents-input" placeholder="メールアドレスまたはユーザーID">
            <input id='password' name='password' type="password" class="form-control auth-login-contents-input password" placeholder="パスワード">
          </form>

          <button id="submit" type="submit" class="btn btn-lg btn-primary btn-block auth-login-contents-submit">サインイン</button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
