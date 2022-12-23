---
title: Getting started
---

---

インタラクティブなオンライン環境で Svelte を試す場合は、[こちらの REPL](https://svelte.dev/repl) か [StackBlitz](https://node.new/svelte) をお試しください。

プロジェクトをローカルで作成する場合は、[SvelteKit](https://kit.svelte.jp/) を使うことを推奨します。これは Svelte チームが開発しているオフィシャルのアプリケーションフレームワークです:
```
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```

SvelteKit は [Svelte コンパイラ](https://www.npmjs.com/package/svelte) を呼び出し、`.svelte` ファイルを、DOM を構築する `.js` ファイルとそれをスタイリングする `.css` ファイルに変換します。また、開発サーバーやルーティング、デプロイメントなど、web アプリケーションを構築するのに必要なその他のピースも提供します。[SvelteKit](https://kit.svelte.jp/) はコードのビルドとサーバーサイドレンダリング (SSR) の処理に [Vite](https://vitejs.dev/) を使用しています。Svelte のコンパイルに対応している[全ての主要な web バンドラー向けのプラグイン](https://sveltesociety.dev/tools#bundling) があり、HTML に挿入できる `.js` と `.css` を出力することができますが、そのほとんどは SSR を処理しません。

もし、本格的なアプリケーションフレームワークが不要で、シンプルなフロントエンドオンリーなサイト/アプリを構築したい場合は、`npm init vite` を実行して `svelte` オプションを選択することで、Vite と Svelte (Kit なし) を使用することもできます。この場合、`npm run build` を実行すると、`dist` ディレクトリの中に HTML、JS、CSS ファイルが生成されます。

Svelte チームは [VS Code extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) をメンテナンスしておりますが、その他様々な [エディタ](https://sveltesociety.dev/tools#editor-support) やツールとのインテグレーションございます。

お困りの場合は、[Discord](https://svelte.dev/chat) や [StackOverflow](https://stackoverflow.com/questions/tagged/svelte) でご質問ください。
