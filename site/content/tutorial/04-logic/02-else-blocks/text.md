---
title: Else blocks
---

2つの条件（`if user.loggedIn` と `if !user.loggedIn`）は相互に排他的なので、`else` ブロックを使用することでこのコンポーネントを少しシンプルにすることができます。

```html
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

> `#` の文字は常に *ブロックの開始* タグを示します。 `/` の文字は常に *ブロックの終了* タグを示します。  `:` の文字は `{:else}` のように *ブロックの継続* タグを示します。心配しないでください。あなたは既にSvelteがHTMLに追加する構文のほとんどを学んでいます。
