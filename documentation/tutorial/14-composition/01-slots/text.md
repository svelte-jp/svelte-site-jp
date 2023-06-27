---
title: Slots
---

HTML要素が子を持つことができるように…

```svelte
<div>
	<p>I'm a child of the div</p>
</div>
```

…コンポーネントもそうすることができます。しかしコンポーネントが子を受け入れる前に、どこに子を置くかを知っておく必要があります。これを `<slot>` 要素で行います。これを `Box.svelte` の中に入れてください。

```svelte
<div class="box">
	<slot />
</div>
```

これで box に物を入れることができるようになりました。

```svelte
<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>
```
