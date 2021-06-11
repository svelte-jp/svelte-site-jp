---
title: Svelte <3 TypeScript
description: 型により強化されたWebアプリ
author: Orta Therox
authorURL: https://twitter.com/orta
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/svelte-and-typescript
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

以前から最も多く要望をもらっていた機能がついに実現しました、Svelte は正式に TypeScript をサポートします。

これにより、より良い開発体験が得られると考えています。 -- また、より大きな Svelte コードベースにも美しくスケールします -- TypeScript と JavaScript のどちらを使用していても。

<figure>
	<img alt="Screenshot of TypeScript in Svelte" src="media/svelte-ts.png">
	<figcaption>Image of TypeScript + Svelte in VS Code (theme is <a href="https://marketplace.visualstudio.com/items?itemName=karyfoundation.theme-karyfoundation-themes">Kary Pro</a>.)</figcaption>
</figure>


## 今すぐ試してみてください(Try it now)

新しい Svelte TypeScript プロジェクトは [normal template](https://github.com/sveltejs/template) を利用して`node scripts/setupTypeScript.js` を実行することで開始できます。

```bash
npx degit sveltejs/template svelte-typescript-app
cd svelte-typescript-app
node scripts/setupTypeScript.js
```

VS Code ユーザーの方は、(新しい) [公式の拡張機能](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) を使用していることを確認してください。これは James Birtles による人気の高い拡張機能に取って代わるものです。
この記事の後半では、既存の Svelte プロジェクトで TypeScript を使用するための個々のステップについて詳しく説明します。

## Svelte の TypeScript サポートとは何を意味しますか？(What does it mean to support TypeScript in Svelte?)

Svelte で TypeScript に対応することはかなり前から可能でしたが、多くの異なるツールを組み合わせ、それぞれを個別に動作するようにしなければなりませんでした。今日では、これらのツールのほぼすべてが Svelte の組織の下にあり、パイプライン全体に責任を持ち、共通の目標を持った人たちによってメンテナンスされています。

COVID がパンデミックと宣言される前の週、私は類似の開発エコシステムによる最高の Svelte 用のツールとアイデアの[統合を提案](https://github.com/sveltejs/svelte/issues/4518)し、ファーストクラスの TypeScript サポートを得るための一連のステップを提供しました。それ以来、多くの人たちが協力してくれて、そこにたどり着くためのコードを書いてくれました。

Svelte が TypeScript をサポートするようになったということは、いくつかの異なる意味を持っています。

* `<script>` ブロックの中で TypeScript を使うことができます -- `lang="ts"` 属性を追加するだけです。
* TypeScript を持つコンポーネントは `svelte-check` コマンドでタイプチェックを行うことができます。
* コンポーネントを書いているときに、マークアップ内の式でも自動補完のヒントや型チェックを得ることができます。
* TypeScript ファイルは Svelte コンポーネント API を理解しています -- `.ts` モジュールに `.svelte` ファイルをインポートしても、赤い四角い線はもうありません。

#### どのような仕組みになっていますか？(How does it work?)

TypeScript のサポートの 2 つの主要な部分を理解するために、TypeScript が開発ツールを提供するために使用している技術と比較してみましょう。それはコマンドラインで実行し `*.ts` を `*.js` に変換する `tsc` コンパイラと、テキストエディタからのリクエストに応答するノードAPI である `TSServer` です。`TSServer` は、コーディング中のエディタに JavaScript と TypeScript のリアルタイムイントロスペクションを提供するもので、その中にコンパイラのコードのほとんどが含まれています。

一方 Svelte には、Svelte コンパイラと、[Language Server Protocol standard](https://microsoft.github.io//language-server-protocol/overviews/lsp/overview/) を介してテキストエディタの呼び出しに応答する [`svelte-language-server`](https://github.com/sveltejs/language-tools/tree/master/packages/language-server#svelte-language-server) があります。ファーストクラスの TypeScript サポートというのは、これらの _両方_ のシステムが TypeScript コードをうまく扱えることを意味しています。

TypeScript のための Svelte コンパイラのサポートは、[Christian Kaisermann](https://github.com/kaisermann) の [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess#svelte-preprocess) が担当しており、現在では公式の Svelte プロジェクトとなっています。

エディタについては、[Pine's](https://github.com/octref) による [Vue](https://vuejs.org) エコシステムの [Vetur](https://github.com/vuejs/vetur) からインスピレーションを得ました。Vetur は [LSP](https://github.com/vuejs/vetur/blob/master/server)、VS Code 拡張機能、[CLI](https://github.com/vuejs/vetur/blob/master/vti) を提供します。Svelteも現在、[LSP](https://github.com/sveltejs/language-tools/blob/master/packages/language-server)、[VS Code 拡張機能](https://github.com/sveltejs/language-tools/blob/master/packages/svelte-vscode)、[CLI](https://github.com/sveltejs/language-tools/blob/master/packages/svelte-check) を提供しています。


#### `*.svelte` イントロスペクション(`*.svelte` Introspection)

公式の Svelte VS Code 拡張機能では、[James Birtles](https://github.com/UnwrittenFun) 氏が[`UnwrittenFun/svelte-vscode`](https://github.com/UnwrittenFun/svelte-vscode) と [`UnwrittenFun/svelte-language-server`](https://github.com/UnwrittenFun/svelte-language-server/) で作成した基盤を基に構築しました。

[Simon Holthausen](https://github.com/dummdidumm) と [Lyu, Wei-Da](https://github.com/jasonlyu123) は、JavaScript と TypeScript のイントロスペクションを改善する素晴らしい仕事をしてくれました。またコードベース内のコンポーネントの props を理解する力を強化する [@halfnelson](https://github.com/halfnelson) の [svelte2tsx](https://github.com/sveltejs/language-tools/tree/master/packages/svelte2tsx#svelte2tsx) を統合しました。


## 既存のプロジェクトにTypeScriptを追加する(Adding TypeScript to an existing project)

はじめる前に、依存関係を追加します。

```bash
npm install --save-dev @tsconfig/svelte typescript svelte-preprocess svelte-check
```

##### 1. Typescriptのコンパイル(Compiling TypeScript)

まず最初に、`<script lang="ts">` ブロックの内容を TypeScript コンパイラに渡す [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess#svelte-preprocess) を設定する必要があります。

Rollupプロジェクトでは、次のようになります -- Rollupが `.ts` ファイルを扱えるように `@rollup/plugin-typescript` をインストールする必要があることに注意してください。

```diff
+ import autoPreprocess from 'svelte-preprocess';
+ import typescript from '@rollup/plugin-typescript';

export default {
  ...,
  plugins: [
    svelte({
+       preprocess: autoPreprocess()
    }),
+   typescript({ sourceMap: !production })
  ]
}
```

[他の環境のための説明はこちら](https://github.com/sveltejs/svelte-preprocess#usage).

TypeScriptを設定するには、プロジェクトのルートに `tsconfig.json` を作成する必要があります。

```json
{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "include": ["src/**/*", "src/node_modules"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"],
}
```

`include`/`exclude` はあなたのプロジェクトによって異なります。-- これらは、ほとんどの Svelte プロジェクトで動作するデフォルト値です。

##### 2. エディタサポート(Editor Support)

[LSPを使用](https://langserver.org/#implementations-client) しているエディタであれば、どのようなエディタでも対応可能です。[VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) 拡張機能は、私たちが最も優先してきたものです。しかし、[Atom上](https://github.com/sveltejs/language-tools/pull/160)では作業が進行中で、[coc-svelte](https://github.com/coc-extensions/coc-svelte) 経由の Vim は最新の LSPでアップデートされています。

これらのエディタ拡張機能は、JavaScript だけを使っていてもコーディング体験を向上させてくれます。エディタはエラーを提供してくれませんが、推論やリファクタリングツールを提供してくれます。JavaScript を使って `<script>` タグの先頭に [`// @ts-check` を追加](https://www.staging-typescript.org/docs/handbook/intro-to-js-ts.html)すると、インフラの変更なしでより良いエラーメッセージを得ることができます。

`<script>` を TypeScript を使うように切り替えるには、`<script lang="ts">` を使ってください。願わくば、赤い四角い線の海を見ることがないことを願っています。

##### 3. CIでのチェック(CI Checks)

赤い四角いマークがあるのは素晴らしいことですが、まあ、ちょっとしたことです。しかし、長期的には、コードにエラーがないことを確認できるようにしたいものです。プロジェクトにエラーがないことを確認するには、CLI ツールの [`svelte-check`](https://www.npmjs.com/package/svelte-check) を使うことができます。これはエディタのように動作し、すべての `.svelte` ファイルに対してエラーを確認します。

依存関係をプロジェクトに追加し、CI に追加することができます。

```bash
❯ npx svelte-check

Loading svelte-check in workspace: /Users/ortatherox/dev/svelte/example-app
Getting Svelte diagnostics...
====================================

/Users/ortatherox/dev/svelte/example-app/src/App.svelte:3:2
Error: Type '123' is not assignable to type 'string'. (ts)

====================================
svelte-check found 1 error
error Command failed with exit code 1.
```

## SapperプロジェクトのTypeScriptについてはどうなってますか？(What about TypeScript in Sapper projects?)

TypeScriptのサポートは 0.28 で Sapper に追加されましたので、古いバージョンをお使いの場合は [アップグレード](https://sapper.svelte.dev/migrating#0_27_to_0_28)をお勧めします。

## どうすれば貢献できますか？(How can I contribute?)

ご質問ありがとうございます。作業は [sveltejs/language-tools](https://github.com/sveltejs/language-tools) リポジトリと Svelte Discord の [#language-tools](https://discord.gg/enV6v8K) チャンネルで行われています。問題を報告したり、修正を提出したり、新しいエディタのための拡張機能の開発を手伝ったりしたい場合は、こちらで作業を行っていますので、そこでお会いしましょう！
