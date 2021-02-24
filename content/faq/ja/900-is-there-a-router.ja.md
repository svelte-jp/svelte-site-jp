---
question: ルーターはありますか？
---

任意のルータライブラリを使用できます。多くの人が [page.js](https://github.com/visionmedia/page.js) を使っています。[navaid](https://github.com/lukeed/navaid),というよく似たものもあります。

宣言型のHTMLによるアプローチを好むなら、 [svelte-routing](https://github.com/EmilTholin/svelte-routing) があります。

クライアント側でハッシュ・ベースのルーティングが必要な場合は、 [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router),または[abstract-state-router](https://github.com/TehShrike/abstract-state-router/),ビジネス・ソフトウェア用の成熟したルーターを調べてください。

ファイルシステムベースのルーティングについては、[Routify](https://routify.dev) を見てください。

公式なソリューションとしては、単なるルーティング・ライブラリーというものはありません。しかし、Svelte上に構築された、独自のファイルシステムベースのルーティングを含むNext.js形式のアプリケーションフレームワークである公式の [Sapper](https://sapper.svelte.dev/) フレームワークがある。