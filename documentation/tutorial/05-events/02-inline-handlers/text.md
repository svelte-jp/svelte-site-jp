---
title: Inline handlers
---

イベントハンドラをインラインで宣言することもできます。

```svelte
<div on:mousemove={(e) => (m = { x: e.clientX, y: e.clientY })}>
	The mouse position is {m.x} x {m.y}
</div>
```

> 一部のフレームワークでは、パフォーマンス上の理由から、特にループ処理内で、イベントハンドラをインラインで宣言しないように推奨されています。しかし、この推奨事項は Svelte には当てはまりません。あなたがどのように書いたとしても、常に適切にコンパイルします。
