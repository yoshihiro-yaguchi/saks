-   [初回環境構築方法](#初回環境構築方法)
    -   [php の依存関係のインストール(実行済みの場合は不要)](#php-の依存関係のインストール実行済みの場合は不要)
    -   [`.env.example`をコピーして`.env`ファイルを作成する](#envexampleをコピーしてenvファイルを作成する)
    -   [パッケージのインストール](#パッケージのインストール)
    -   [エイリアスの設定](#エイリアスの設定)
        -   [bash](#bash)
        -   [zsh](#zsh)
    -   [環境の操作](#環境の操作)
    -   [npm の初期設定](#npm-の初期設定)
-   [compsoer](#compsoer)
-   [vite](#vite)
    -   [WSL(Windows) で開発する場合](#wslwindows-で開発する場合)
    -   [開発時用ビルド](#開発時用ビルド)
    -   [リリース用ビルド](#リリース用ビルド)
-   [追加パッケージ](#追加パッケージ)
    -   [react-typescript-redux](#react-typescript-redux)
        -   [参考](#参考)

# 初回環境構築方法

## php の依存関係のインストール(実行済みの場合は不要)

```
sudo apt update -y
```

```
sudo apt install curl php-cli php-mbstring git unzip
```

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
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```

コマンド実行時にエラーになるときは、vender ディレクトリを削除する。

## エイリアスの設定

### bash

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

### zsh

エイリアス設定ファイルを開く

```
vim ~/.zshrc
```

I キーを押して適当な場所に

```
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

と打ち込む。その後、`esc` -> `:wq` -> エンターキーで保存して終了

`~/.zshrc`に記載したコマンドを反映

```
source ~/.zshrc
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

# compsoer

# vite

## WSL(Windows) で開発する場合

`vite.config.js`に以下を設定する。

```javascript
// Windows、WSL上で実行するときだけ必要か
server: {
    hmr: {
        host: "localhost",
    },
},
```

## 開発時用ビルド

`npm run dev`
開発時にビルドしたい時に使用するコマンドです。

## リリース用ビルド

`npm run build`
リリース用にビルドするコマンドで、開発時と違い CSS ファイルや JS ファイルが圧縮されて書き出されます。

# 追加パッケージ

## react-typescript-redux

### 参考

1. node,npm,npx がインストールされていることを確認

```
sail node --version
# v18.16.0
sail npm --version
# 9.6.7
sail npx --version
# 9.6.7
```

2. vitejs の React モジュールを追加

```
sail npm install -d @vitejs/plugin-react
```

3. react-typescript-redux のテンプレートを作成

```
sail npx create-react-app resources/ts --template redux-typescript
```

4. ts/package.json から、ルートディレクトリ/package.json に依存関係をコピーする

5. ts/public, ts/src 以外の ts フォルダ配下のファイルを削除する

6. npm の依存関係を更新する

```shell
sail npm install --legacy-peer-deps
```

7. vite.config.js に以下を追加する。

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
                "resources/ts/src/index.tsx", //<-追加
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
            vue: "vue/dist/vue.esm-bundler.js",
            $: "jQuery",
        },
    },
});
```

8. index.blade.php の作成

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

9. web.php の変更
   以下を追加

```
Route::get('/', function () {
    return view('index');
});
```

10. npm を起動

```
sail npm run dev
```
