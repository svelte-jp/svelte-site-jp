---
title: Getting started
---

---

インタラクティブなオンライン環境で Svelte を試す場合は、[こちらの REPL](https://svelte.dev/repl) か [StackBlitz](https://node.new/svelte) をお試しください。

To create a project locally we recommend using [SvelteKit](https://kit.svelte.dev/), the official application framework from the Svelte team:
```
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```

SvelteKit will handle calling [the Svelte compiler](https://www.npmjs.com/package/svelte) to convert your `.svelte` files into `.js` files that create the DOM and `.css` files that style it. It also provides all the other pieces you need to build a web application such as a development server, routing, and deployment. [SvelteKit](https://kit.svelte.dev/) utilizes [Vite](https://vitejs.dev/) to build your code and handle server-side rendering (SSR). There are [plugins for all the major web bundlers](https://sveltesociety.dev/tools#bundling) to handle Svelte compilation, which will output `.js` and `.css` that you can insert into your HTML, but most others won't handle SSR.

The Svelte team maintains a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) and there are integrations with various other [editors](https://sveltesociety.dev/tools#editor-support) and tools as well.

お困りの場合は、[Discord](https://svelte.dev/chat) や [StackOverflow](https://stackoverflow.com/questions/tagged/svelte) でご質問ください。
