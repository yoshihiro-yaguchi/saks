<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  {{-- reactデータ連携 --}}
  <meta name="csrfToken" content={{csrf_token()}}>
  <title>取引作成</title>
  @viteReactRefresh
  @vite(['resources/ts/src/features/transaction/store/store.tsx',
    'resources/sass/app.scss',
    'resources/css/app.css',
    ])
</head>
<body>
  {{-- エラー --}}
  <div class="maxHeight" id="storeTransaction"></div>
</body>
<script>
</script>
</html>
