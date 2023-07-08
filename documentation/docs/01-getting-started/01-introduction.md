---
title: イントロダクション
---

Svelte のリファレンスドキュメントにようこそ！これは、すでにある程度 Svelte を知っている方、そしてさらに使い方を学びたい方向けが使用することを想定した資料となっています。

もしあなたがまだ Svelte をあまり知らないのであれば、このリファレンスを参照する前に、[インタラクティブなチュートリアル](https://learn.svelte.jp) や [examples](/examples) に触れてみることをおすすめします。[REPL](/repl) を使ってオンラインで Svelte を試すこともできますし、全ての機能が揃った環境がお望みであれば [StackBlitz](https://sveltekit.new) で試すこともできます。

## 新規プロジェクトを始める <!--start-a-new-project-->

Svelte チームによるオフィシャルなアプリケーションフレームワークである [SvelteKit](https://kit.svelte.jp/) をお使いいただくことをおすすめします:

```
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```

SvelteKit は [Svelte コンパイラ](https://www.npmjs.com/package/svelte) を呼び出し、あなたの `.svelte` ファイルを、DOM を構築する `.js` ファイルと、それをスタイリングする `.css` ファイルに変換します。また、開発サーバーやルーティング、デプロイメント、SSR サポートなど、web アプリケーションを構築するのに必要なその他のピースも提供します。[SvelteKit](https://kit.svelte.jp/) はコードをビルドするのに [Vite](https://vitejs.dev/) を使用しています。

### SvelteKit の他には <!--alternatives-to-sveltekit-->

もし何らかの理由で SvelteKit を使いたくない場合は、`npm init vite` を実行して `svelte` オプションを選択することで、Vite を (SvelteKit なしで) Svelte と使用することもできます。この場合、`npm run build` を実行すると `dist` ディレクトリの中に HTML、JS、CSS ファイルが生成されます。この場合はほとんどのケースで[ルーティングライブラリの選択](/faq#is-there-a-router)も必要になるでしょう。

他には、Svelte のコンパイルを扱うことができる[全ての主要な web バンドラ向けのプラグイン](https://sveltesociety.dev/tools#bundling)があり、HTML に挿入することができる `.js` と `.css` を出力することができますが、そのほとんどは SSR を処理しません。

## エディタツール <!--editor-tooling-->

Svelte チームは [VS Code extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) をメンテナンスしておりますが、その他様々な[エディタ](https://sveltesociety.dev/tools#editor-support)やツールとのインテグレーションがあります。

## ヘルプを求めるには <!--getting-help-->

恥ずかしがらずに [Discord chatroom](https://svelte.dev/chat) で助けを求めましょう！ また、[Stack Overflow](https://stackoverflow.com/questions/tagged/svelte) で回答を探すこともできます。
