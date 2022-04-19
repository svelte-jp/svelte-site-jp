---
title: <svelte:element>
---

どの種類の DOM 要素をレンダリングするのか事前にわからない場合があります。この場合は `<svelte:element>` が便利です。`if` ブロックを何個も並べる代わりに…

```html
{#if selected === 'h1'}
	<h1>I'm a h1 tag</h1>
{:else if selected === 'h3'}
	<h3>I'm a h3 tag</h3>
{:else if selected === 'p'}
	<p>I'm a p tag</p>
{/if}
```

…動的なコンポーネントを1つ置きます:

```html
<svelte:element this={selected}>I'm a {selected} tag</svelte:element>
```

`this` の値は任意の文字列、または falsy な値です。falsy である場合、要素がレンダリングされません。