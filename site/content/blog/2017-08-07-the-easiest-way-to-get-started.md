---
title: Svelte の一番簡単な始め方
description: これならすぐにできる。
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/the-easiest-way-to-get-started
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

Svelte は[新しい種類のフレームワーク](/blog/frameworks-without-the-framework)です。`<script src='svelte.js'>` タグをページに配置するか、`import` か `require` を利用してアプリケーションに持ってくるよりもむしろ、Svelte はページで動作する前にコンポーネントファイルを美しく最適化された JavaScript に変換するためのコンパイラといえます。

そのため、最初は少し戸惑うかもしれません。どのように Svelte アプリを作ればよいのか？と疑問を持つかもしれません。


## 1. REPL の利用

[Svelte REPL](/repl) は Svelte を始めるための最も簡単な方法です。 始めるための例のリストから選択し、あなたが望むようにそれらの例を微調整することも可能です。

<aside><p><a href="https://nodejs.org/">Node.js</a> をインストールし、ターミナルの使い方を知っている必要があるでしょう。</p></aside>

ある時点で、あなたのアプリは REPL を超えてしまいます。**ダウンロード**ボタンをクリックして `svelte-app.zip` ファイルをコンピュータに保存し、解凍してください。

ターミナルウィンドウを開きプロジェクトを設定しましょう…

```bash
cd /path/to/svelte-app
npm install
```

…そして開発サーバーを起動します:

```bash
npm run dev
```

これによってアプリが [localhost:8080](http://localhost:8080) で起動し、`svelte-app/src` ファイルを変更するたびに [Rollup](https://rollupjs.org) が再ビルドします。


## 2. degit の利用

REPL からダウンロードした場合、カスタマイズされたバージョンの [sveltejs/template](https://github.com/sveltejs/template) リポジトリを取得することになります。プロジェクトの足場となるツール [degit](https://github.com/Rich-Harris/degit) を使えば zip ファイルを操作する必要はありません。

ターミナルでは、このように新しいプロジェクトをすぐに作ることができます:

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
# to use TypeScript run:
# node scripts/setupTypeScript.js

npm install
npm run dev
```

これにより新しいプロジェクトが `my-svelte-project` ディレクトリ内に生成され、依存関係をインストールし、http://localhost:8080 でサーバーが起動されます。

TypeScript のより詳しい使用方法を知りたい場合は [こちら](/blog/svelte-and-typescript) をご参照ください。

一度少しいじってみて全体がどのように組み合わさっているかを理解しましたら、[sveltejs/template](https://github.com/sveltejs/template)  をフォークし、代わりに以下を実行することができます:

```bash
npx degit your-name/template my-new-project
```

これで完了です！本番環境に対応したバージョンのアプリを作成するために `npm run build` を使用し、プロジェクトテンプレートの [README](https://github.com/sveltejs/template/blob/master/README.md) から [Vercel](https://vercel.com) や [Surge](http://surge.sh/) を用いてアプリを簡単に Web にデプロイする方法についての説明を確認してください。

Rollup を使うことに制限はありません — [webpack](https://github.com/sveltejs/svelte-loader)、[Browserify](https://github.com/tehshrike/sveltify) やその他の統合ツールもありますし、[Svelte CLI](https://github.com/sveltejs/svelte-cli) (2019年からのアップデート: Svelte 3 では CLI は非推奨となり、現在では[sirv-cli](https://www.npmjs.com/package/sirv-cli) をテンプレートで使用しています。ご自由にお好きなツールをご利用ください！) や [API](https://github.com/sveltejs/svelte/tree/v2#api) を使うこともできます。これらのツールの1つを用いてプロジェクトテンプレートを作成する場合は、是非 [Svelte Discord chatroom](chat) か、Twitter で [@sveltejs](https://twitter.com/sveltejs) にご共有ください！
