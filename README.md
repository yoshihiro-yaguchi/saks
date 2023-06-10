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
## react-typescript-redux
### 参考
1. node,npm,npxがインストールされていることを確認
```
sail node --version
# v18.16.0
sail npm --version
# 9.6.7
sail npx --version
# 9.6.7
```
2. vitejsのReactモジュールを追加
```
sail npm install -d @vitejs/plugin-react
```
3. react-typescript-reduxのテンプレートを作成
```
sail npx create-react-app resources/ts --template redux-typescript
```
4. ts/package.jsonから、ルートディレクトリ/package.jsonに依存関係をコピーする

5. ts/public, ts/src以外のtsフォルダ配下のファイルを削除する

6. npmの依存関係を更新する
```shell
sail npm install --legacy-peer-deps
```

7. vite.config.jsに以下を追加する。
```javascript
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react"; //<-追加

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/sass/app.scss",
                "resources/css/app.css",
                "resources/js/app.js",
                'resources/ts/src/index.tsx', //<-追加
            ],

            refresh: true,
        }),
        react(), //<-追加
    ],
    // Windows、WSL上で実行するときだけ必要か
    server: {
        hmr: {
            host: "localhost",
        },
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            $: "jQuery",
        },
    },
});
```

8. index.blade.phpの作成
```resouces/views/index.blade.php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  @viteReactRefresh <!-- @viteの前に絶対入れる。 -->
  @vite(['resources/sass/app.scss','resources/css/app.css', 'resources/ts/src/index.tsx'])
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

9. web.phpの変更
以下を追加
```
Route::get('/', function () {
    return view('index');
});
```

10. npmを起動
```
sail npm run dev
```