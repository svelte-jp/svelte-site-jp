---
question: ルーターはありますか？
---

公式のルーティングライブラリは[SvelteKit](https://kit.svelte.dev/)で、現在はベータ版です。SvelteKitは、ファイルシステムルーター、サーバーサイドレンダリング(SSR)、ホットモジュールリローディング(HMR)を1つの使いやすいパッケージで提供します。ReactのNext.jsと類似しています。

しかしながら、任意のルーターライブラリを使用することもできます。多くの人が [page.js](https://github.com/visionmedia/page.js) を使っています。[navaid](https://github.com/lukeed/navaid)、というよく似たものもあります。

宣言型のHTMLによるアプローチを好むなら、 [svelte-routing](https://github.com/EmilTholin/svelte-routing) があります。

クライアント側でハッシュ・ベースのルーティングが必要な場合は、[svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)、または[abstract-state-router](https://github.com/TehShrike/abstract-state-router/)などの、ビジネス・ソフトウェア向けに成熟したルーターを確認してみてください。

ファイルシステムベースのルーティングについては、[Routify](https://routify.dev) を見てください。
