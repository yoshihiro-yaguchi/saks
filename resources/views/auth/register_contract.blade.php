<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrfToken" content={{csrf_token()}}>
  @viteReactRefresh
  @vite(['resources/ts/src/features/auth/registerContract/index.tsx',
      'resources/sass/app.scss',
      'resources/css/app.css',
      ])
  <title>契約者情報を入力してください</title>
</head>
<body>
  <div class="maxHeight" id="register_contract"></div>
</body>
</html>