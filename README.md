# 初回環境構築方法

## php の依存関係のインストール(実行済みの場合は不要)

```
sudo apt update -y
```

```
sudo apt install curl php-cli php-mbstring git unzip
```

<!-- ## composerのインストール
> php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

> php -r "if (hash_file('sha384', 'composer-setup.php') === 'e0012edf3e80b6978849f5eff0d4b4e4c79ff1609dd1e613307e16318854d24ae64f26d17af3ef0bf7cfb710ca74755a') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

> curl -sS https://getcomposer.org/installer | php

> sudo mv composer.phar /usr/local/bin/composer

> sudo chmod +x /usr/local/bin/composer

> source ~/.bashrc

> php composer-setup.php

> php -r "unlink('composer-setup.php');" -->

## `.env.example`をコピーして`.env`ファイルを作成する<br>

```
cp .env.example .env
```

## パッケージのインストール

```shell
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```
コマンド実行時にエラーになるときは、venderディレクトリを削除する。

## エイリアスの設定

エイリアス設定ファイルを開く

```
vim ~/.bashrc
```

I キーを押して適当な場所に

```
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

と打ち込む。その後、`esc` -> `:wq` -> エンターキーで保存して終了

`~/.bashrc`に記載したコマンドを反映

```
source ~/.bashrc
```

## 環境の操作

-   起動

```
sail up -d
```

## npm の初期設定

```
sail npm install
```

## vite(laravel-mix に変わるやつ)

### WSL で開発する場合

`vite.config.js`に以下を設定する。

```javascript
// Windows、WSL上で実行するときだけ必要か
server: {
    hmr: {
        host: "localhost",
    },
},
```

### 開発時用ビルド

`npm run dev`
開発時にビルドしたい時に使用するコマンドです。

### リリース用ビルド

`npm run build`
リリース用にビルドするコマンドで、開発時と違い CSS ファイルや JS ファイルが圧縮されて書き出されます。


# 追加パッケージ
## mPDF
### 参考
* [Laravel超初心者がMpdfでpdfを生成するまで](https://zenn.dev/chromel/articles/6edadcdcce19fa)<br>
* [LaravelでPDFを出力する](https://qiita.com/yukieeeee/items/2085aad47f73aae3889e)
### インストール方法
1. パッケージ追加
```
sail composer require carlos-meneses/laravel-mpdf
```
2. PDF用コントローラー作成
```
sail php artisan make:controller PdfController
```

3. `./config/app.php`に設定を追加する。
aliasesに設定しても動作しなかった。`LaravelMpdf`を直接呼び出すとうまくいったので、それを使う。
```
'providers' => [
Mccarlosen\LaravelMpdf\LaravelMpdfServiceProvider::class,
],
'aliases' => Facade::defaultAliases()->merge([
// 'ExampleClass' => App\Example\ExampleClass::class,
'PDF' => Mccarlosen\LaravelMpdf\Facades\LaravelMpdf::class,
])->toArray(),
```
4. 2.で作成したコントローラーに下記設定をする。
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;

class PdfController extends Controller
{
    public function viewPdf()
    {
        $data = [
            'foo' => 'bar'
        ];
    	//ここでviewに$dataを送っているけど、
    	//今回$dataはviewで使わない
        $pdf = LaravelMpdf::loadView('pdf.document', $data);

        // 表示させる場合
        // return $pdf->stream('document.pdf');

        return $pdf->download('document.pdf');//生成されるファイル名
    }
}
```
5. 日本語化対応のために、ipafontをダウンロードする。
   [IPAexフォントおよびIPAフォントについて](https://moji.or.jp/ipafont/)

6. ダウンロードしたファイルを回答し、`ipae.ttf`または`ipaexg.ttf`ファイルを`resources/fonts`に配置する。
7. `config/pdf.php`のcustom_font_dataに以下の設定を追加する。
```php
'custom_font_data'         => [
    'ipafont' => [
        'R' => 'ipaexg.ttf' // 6.で配置したファイル名
    ]
],
```
8. `web.php`にルーティングの設定をしてリンクにアクセスしてみる。

## React
### 参考
[【Laravel9系】 Laravel Sail Viteを使ってReact TypeScriptの開発環境を用意する。](https://saunabouya.com/2022/07/25/laravel9-sail-react-typescript-vite/)

### インストール方法
1. Reactをインストール
```bash
sail npm install --save-dev react react-dom @types/react @types/react-dom @vitejs/plugin-react @vitejs/plugin-react-refresh
```
2. app.tsxファイルを作成
resources/ts/app.tsxを作成。
```typescript
import "../js/bootstrap";
import "../css/app.css";
import React from "react";
import { createRoot } from 'react-dom/client';

const App = () => {
    const title: string = "Laravel 9 Vite with TypeScript React !!";
    return <h1>{title}</h1>;
};
const container = document.getElementById('app') as HTMLInputElement;
const root = createRoot(container);
root.render(<App />);
```
3. viewファイル編集
resources/views/welcome.blade.phpを編集
```php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        @viteReactRefresh
        @vite('resources/ts/app.tsx')
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
```
4. vite.config.jsを修正
aliasを設定する。
```typescript
alias: {
    '@': '/resources/ts',
},
```
