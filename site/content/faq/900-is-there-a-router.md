---
question: ルーターはありますか？
---

公式のルーティングライブラリは[SvelteKit](https://kit.svelte.dev/)で、現在はベータ版です。SvelteKitは、ファイルシステムルーター、サーバーサイドレンダリング(SSR)、ホットモジュールリローディング(HMR)を1つの使いやすいパッケージで提供します。ReactのNext.jsと類似しています。

しかしながら、任意のルーターライブラリを使用することもできます。多くの人が [page.js](https://github.com/visionmedia/page.js) を使っています。[navaid](https://github.com/lukeed/navaid)、というよく似たものもあります。[universal-router](https://github.com/kriasoft/universal-router) は子ルートもアイソモーフィックに扱えますが、ヒストリーのサポートは組み込まれていません。

宣言型のHTMLによるアプローチを好むなら、 アイソモーフィックな [svelte-routing](https://github.com/EmilTholin/svelte-routing) というライブラリと、そのフォークでいくつかの機能が追加されている [svelte-navigator](https://github.com/mefechoel/svelte-navigator) があります。

クライアント側でハッシュ・ベースのルーティングが必要な場合は、[svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)、または[abstract-state-router](https://github.com/TehShrike/abstract-state-router/)を確認してみてください。

[Routify](https://routify.dev) はSvelteKitのルーターによく似たファイルシステムベースのルーターです。Version 3はSvelteのネイティブなSSRをサポートしています。
