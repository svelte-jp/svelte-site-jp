---
title: DOM event forwarding
---

イベントフォワーディングは DOM イベントでも機能します。

`<CustomButton>` でのクリックの通知を受け取るためには、`CustomButton.svelte` にある `<button>` 要素の `click` イベントをフォワードする必要があります。

```svelte
<button on:click> Click me </button>
```
