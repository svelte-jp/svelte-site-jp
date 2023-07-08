---
title: Select multiple
---

select は `multiple` 属性を持つことができ、その場合は単一の値を選択するのではなく配列を追加します。

[先ほどのアイスクリームの例](/tutorial/group-inputs)に戻り、チェックボックスを `<select multiple>` で置き換えることができます。

```svelte
<h2>Flavours</h2>

<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

> 複数のオプションを選択するには `control` キー (MacOSの場合は `command` キー) を押したままにしてください。
