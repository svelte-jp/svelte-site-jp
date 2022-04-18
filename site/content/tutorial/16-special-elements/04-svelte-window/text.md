---
title: <svelte:window>
---

イベントリスナーを任意の DOM 要素に追加できるのと同じように、`window` オブジェクトにも `<svelte:window>` でイベントリスナーを追加できます。

11行目に `keydown` リスナーを追加します。

```html
<svelte:window on:keydown={handleKeydown}/>
```

> DOM要素と同様に `preventDefault` のような[イベント修飾子](/tutorial/event-modifiers)を追加することができます。
