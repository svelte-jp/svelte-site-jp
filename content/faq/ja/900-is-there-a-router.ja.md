---
question: ルーターはありますか？
---

The official routing library is [SvelteKit](https://kit.svelte.dev/), which is currently in beta. SvelteKit provides a filesystem router, server-side rendering (SSR), and hot module reloading (HMR) in one easy-to-use package. It shares similarities with Next.js for React.

However、任意のルータライブラリを使用できます。多くの人が [page.js](https://github.com/visionmedia/page.js) を使っています。[navaid](https://github.com/lukeed/navaid)、というよく似たものもあります。

宣言型のHTMLによるアプローチを好むなら、 [svelte-routing](https://github.com/EmilTholin/svelte-routing) があります。

クライアント側でハッシュ・ベースのルーティングが必要な場合は、[svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)、または[abstract-state-router](https://github.com/TehShrike/abstract-state-router/)などの、ビジネス・ソフトウェア向けに成熟したルーターを確認してみてください。

ファイルシステムベースのルーティングについては、[Routify](https://routify.dev) を見てください。