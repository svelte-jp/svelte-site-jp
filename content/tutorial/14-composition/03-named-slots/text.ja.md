---
title: Named slots
---

前の例では、コンポーネントの直接の子をレンダリングする *デフォルトスロット* が含まれていました。

この `<ContactCard>` のように、配置をより制御したい場合もあるでしょう。そのような場合には、*名前付きスロット* を使うことができます。

`ContactCard.svelte` の各スロットに `name` 属性を追加します。

```html
<article class="contact-card">
	<h2>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="email">
		<slot name="email">
			<span class="missing">Unknown email</span>
		</slot>
	</div>
</article>
```

そして、対応する `slot="...."` 属性を持つ要素を `<ContactCard>` コンポーネント内に追加します。

```html
<ContactCard>
	<span slot="name">
		P. Sherman
	</span>

	<span slot="address">
		42 Wallaby Way<br>
		Sydney
	</span>
</ContactCard>
```