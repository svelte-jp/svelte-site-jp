---
title: <svelte:component>
---

コンポーネントは `<svelte:component>` でカテゴリを完全に変更することができます。一連の `if` ブロック

```html
{#if selected.color === 'red'}
	<RedThing/>
{:else if selected.color === 'green'}
	<GreenThing/>
{:else if selected.color === 'blue'}
	<BlueThing/>
{/if}
```

の代わりに、単一の動的なコンポーネントを持つことができます。

```html
<svelte:component this={selected.component}/>
```

`this` 値には任意のコンポーネントコンストラクタ、または falsy な値を指定できます -- falsy の値を指定した場合、コンポーネントはレンダリングされません。