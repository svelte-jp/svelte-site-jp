---
title: Dimensions
---

全てのブロックレベル要素は `clientWidth`、 `clientHeight`、`offsetWidth`、`offsetHeight` バインディングを備えています:

```svelte
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>
```

これらのバインディングは読み取り専用です。`w` と `h` の値を変更しても何の影響もありません。

> 要素は[この方法](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/)に似た手法を用いて測定されます。オーバーヘッドを内包しているため、要素数が巨大な場合はこの方法を使用することはおすすめしません。
>
> `display: inline` 要素、または他の要素を内包できない要素（`<canvas>` など）もこの手法では測定できません。この場合は、代わりにラッバー要素を測定する必要があります。
