---
title: Slot fallbacks
---

コンポーネントは、`<slot>` 要素の中にコンテンツを入れることで、空のままになっているスロットに対して *フォールバック* を指定することができます。

```html
<div class="box">
	<slot>
		<em>no content was provided</em>
	</slot>
</div>
```

これで、子を持たない `<Box>` のインスタンスを作成できるようになりました。

```html
<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>

<Box/>
```
