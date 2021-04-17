---
title: Each blocks
---

データのリストをループさせる必要がある場合は、`each` ブロックを使ってください。

```html
<ul>
	{#each cats as cat}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{cat.name}
		</a></li>
	{/each}
</ul>
```

> 式(この場合は `cats`)は、任意の配列や配列に似たオブジェクトにすることができます(つまり、`length`プロパティを持っています)。一般的な反復可能なデータ構造は `each [...iterable]` を用いてループさせることができます。

第二引数として現在の *index* をこのように取得することができます。

```html
{#each cats as cat, i}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
		{i + 1}: {cat.name}
	</a></li>
{/each}
```

お好みであれば、分割代入（`each cats as { id, name }`）を使い、`cat.id` と `cat.name` を `id` と `name` に置き換えることができます。
