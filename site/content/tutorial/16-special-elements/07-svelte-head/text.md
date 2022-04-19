---
title: <svelte:head>
---

`<svelte:head>` 要素を使うと、ドキュメントの `<head>` 内に要素を挿入することができます。

```html
<svelte:head>
	<link rel="stylesheet" href="/tutorial/dark-theme.css">
</svelte:head>
```

> サーバサイドレンダリング (SSR) モードでは、`<svelte:head>` の内容は HTML の残りのHTMLとは別に返されます。
