<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrfToken" content={{csrf_token()}}>
  @viteReactRefresh
  @vite(['resources/ts/src/features/product/router/router.tsx',
    'resources/sass/app.scss',
    'resources/css/app.css',
    ])
  <title>Document</title>
</head>
<body class="maxHeight">
  <div class="maxHeight" id="index"></div>
</body>
</html>
