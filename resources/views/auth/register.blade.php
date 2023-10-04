<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  @viteReactRefresh
  @vite(['resources/ts/src/features/auth/register/index.tsx',
    'resources/sass/app.scss',
    'resources/css/app.css',
    ])
  <title>ユーザー登録</title>
</head>
<body>
  @if ($errors->any())
  <input type="hidden" id="errors" value="{{json_encode($errors->all())}}">
  @endif
  <input type="hidden" id="oldName" value="{{old('name')}}">
  <input type="hidden" id="oldEmail" value="{{old('email')}}">
  <form class="maxHeight" action="{{url()->current()}}" method="post">
    @csrf
    <div class="maxHeight" id="registerForm"></div>
  </form>

</body>
</html>