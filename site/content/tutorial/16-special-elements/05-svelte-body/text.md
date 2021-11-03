---
title: <svelte:body>
---

`<svelte:window>` と同様に、`<svelte:body>` 要素では `document.body` で発生するイベントをリッスンすることができます。これは `window` では発生しない `mouseenter` と `mouseleave` イベントを利用する際に便利です。

`<svelte:body>` タグに `mouseenter` と `mouseleave` ハンドラを追加してください。

```html
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>
```