---
title: The class directive
---

他の属性と同じように、JavaScriptの属性でクラスを指定することができます。

<!-- prettier-ignore -->
```svelte
<button
	class={current === 'foo' ? 'selected' : ''}
	on:click={() => current = 'foo'}
>foo</button>
```

これはUI開発ではよくあるパターンで、Svelteにはこれを単純化するための特別なディレクティブが含まれています。

<!-- prettier-ignore -->
```svelte
<button
	class:selected={current === 'foo'}
	on:click={() => current = 'foo'}
>foo</button>
```

`selected` クラスは、式の値が truthy の場合は要素に追加され、falsy の場合は削除されます。
