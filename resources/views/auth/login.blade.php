<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @viteReactRefresh
  @vite(['resources/ts/src/features/auth/login/index.tsx',
    'resources/sass/app.scss',
    'resources/css/app.css',
    ])
  <title>ログイン</title>
</head>
<body>
  @if ($errors->any())
  <input type="hidden" id="errors" value="{{json_encode($errors->all())}}">
  @endif
  <form class="maxHeight" action="{{url()->current()}}" method="post">
    @csrf
    <div class="maxHeight" id="loginForm"></div>
  </form>
</body>
</html>
