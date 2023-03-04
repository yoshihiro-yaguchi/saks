<!doctype html>
<html>

<head>
    <meta charset='utf-8' />

    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <style>
        body {
            padding-top: 70px;
        }
    </style>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Bootstrapテスト</a>
            </div>
        </nav>
    </header>

    <div class="container">
        本文
    </div>
</body>

</html>