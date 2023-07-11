<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  {{-- reactデータ連携 --}}
  <meta name="csrfToken" content={{csrf_token()}}>
  <meta name="data" content="{{$encodeData}}">
  <meta name="baseUrl" content="{{Request::root()}}">
  <title>取引作成</title>
  @viteReactRefresh
  @vite(['resources/ts/src/features/transaction/create/index.tsx',
    'resources/sass/app.scss',
    'resources/css/app.css',
    ])
</head>
<body class="deliverySlip-create">
  <div class="createTransaction" id="createTransaction"></div>
</body>
<script>
</script>
</html>
