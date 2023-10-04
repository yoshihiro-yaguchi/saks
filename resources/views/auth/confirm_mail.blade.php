<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @viteReactRefresh
    @vite(['resources/ts/src/features/auth/confirmMail/index.tsx',
        'resources/sass/app.scss',
        'resources/css/app.css',
        ])
    <title>メールを確認してください</title>
</head>
<body class="maxHeight">
    <input id="email" type="hidden" value="{{Auth::user()->email}}">
    <form class="maxHeight" method="post" action="/email/verification-notification">
        @csrf
        <div class="maxHeight" id="confirm_mail"></div>
    </form>

</body>
</html>