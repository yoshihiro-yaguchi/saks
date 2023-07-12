<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  {{-- reactデータ連携 --}}
  @if ($errors->any())
  @foreach ($errors->all() as $error)
    <meta name='errors' content="{{$error}}">
  @endforeach
  @endif
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
  {{-- エラー --}}
  @if ($errors->any())
  @foreach ($errors->all() as $error)
    <input name='errors' hidden readonly value="{{$error}}">
  @endforeach
  @endif
  <div class="createTransaction" id="createTransaction"></div>
</body>
<script>
</script>
</html>
