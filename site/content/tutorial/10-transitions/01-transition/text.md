---
title: The transition directive
---

要素を DOM に優美に追加したり削除したりすることで、より魅力的なユーザーインターフェイスを作成できます。Svelte は `transition` ディレクティブを使用してこれを非常に簡単にします。

まず、`svelte/transition` から `fade` 関数をインポートします。

```html
<script>
	import { fade } from 'svelte/transition';
	let visible = true;
</script>
```

次に、それを `<p>` 要素に追加します。

```html
<p transition:fade>Fades in and out</p>
```