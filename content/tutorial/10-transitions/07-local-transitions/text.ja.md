---
title: Local transitions
---

通常、コンテナブロックが追加もしくは破棄されると、要素にトランジションが適用されます。この例では、リスト全体の表示を切り替えると、個々のリスト要素にもトランジションが適用されます。

Instead, we'd like transitions to play only when individual items are added and removed — in other words, when the user drags the slider.

かわりに、個々のアイテムが追加もしくは削除された時にのみトランジションが再生されるようにしたいと思います。-- 言い換えれば、ユーザーがスライダーをドラッグしたときです。

We can achieve this with a *local* transition, which only plays when the immediate parent block is added or removed:

これを実現するには、*ローカル* トランジションを使用します。これは、親ブロックが追加されたり削除されたりしたときにのみ再生されます。

```html
<div transition:slide|local>
	{item}
</div>
```
