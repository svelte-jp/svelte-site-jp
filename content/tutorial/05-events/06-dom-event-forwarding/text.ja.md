---
title: DOMイベントフォワーディング
---

イベントフォワーディングは DOM イベントでも機能します。

`<CustomButton>` でのクリックの通知を受け取るためには、`CustomButton.svelte` 内の `<button>` 要素に `click` イベントをフォワードする必要があります。

```html
<button on:click>
	Click me
</button>
```