---
title: <svelte:document>
---

`<svelte:window>` に似ていますが、`<svelte:document>` 要素では `document` で発生するイベントをリッスンすることができます。これは、`window` では発生しない `selectionchange` などのイベントを利用する際に便利です。

`<svelte:document>` タグに `selectionchange` ハンドラを追加してください。

```html
<svelte:document on:selectionchange={handleSelectionChange} />
```

> `mouseenter` と `mouseleave` ハンドラは、全てのブラウザで `document` では発生しないため、この要素で使用するのは避けてください。`mouseenter` と `mouseleave` は `<svelte:body>` で使用してください。
