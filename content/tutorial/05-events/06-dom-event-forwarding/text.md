---
title: DOMイベントフォワーディング
---

イベントフォワーディングは DOM イベントでも機能します。

`<CustomButton>` でのクリックの通知を受け取るためには、`CustomButton.svelte` にある `<button>` 要素の `click` イベントをフォワードする必要があります。

```html
<button on:click>
	Click me
</button>
```