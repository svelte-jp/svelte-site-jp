---
title: DOM events
---

今までざっと見てきたように、`on:` ディレクティブを使用して要素の任意のイベントをリスニングできます。

```svelte
<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```
