---
title: <svelte:fragment>
---

`<svelte:fragment>` 要素は、コンテナ DOM 要素でラップすることなく、名前のついたスロットにコンテンツを配置する事ができます。これによりドキュメントのフローレイアウトが維持されます。

例では box クラスに `1em` の gap を持つ flex レイアウトを適用しています。

```sv
<!-- Box.svelte -->
<div class="box">
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<style>
	.box {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
```

しかしながら、footer のコンテンツは新たなフローレイアウトを生成した div 要素でラップされているため、このリズムに沿った配置がされていません。

これは `App` コンポーネントの `<div slot="footer">` を書き換えることで解決できます。この `<div>` を `<svelte:fragment>` に書き換えます。

```sv
<svelte:fragment slot="footer">
	<p>All rights reserved.</p>
	<p>Copyright (c) 2019 Svelte Industries</p>
</svelte:fragment>
```
