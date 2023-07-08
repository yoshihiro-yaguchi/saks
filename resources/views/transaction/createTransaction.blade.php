<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  {{-- reactデータ連携 --}}
  <meta name="csrfToken" content={{csrf_token()}}>
  <meta name="data" content="{{$encodeData}}">
  <title>取引作成</title>
  @viteReactRefresh
  @vite(['resources/sass/app.scss',
    'resources/css/app.css',
    'resources/ts/src/features/transaction/createTransaction/index.tsx'])
</head>
<body class="deliverySlip-create">
  <div id="createTransaction"></div>
</body>
<script>
</script>
</html>