---
title: Else blocks
---

`if user.loggedIn` と `if !user.loggedIn` の2つの条件は互いに排他的なので、`else` ブロックを使うことでこのコンポーネントをもう少しシンプルにすることができます:

```svelte
{#if user.loggedIn}
	<button on:click={toggle}> Log out </button>
{:else}
	<button on:click={toggle}> Log in </button>
{/if}
```

> `#` の文字は常に _ブロックの開始_ タグを示します。 `/` の文字は常に _ブロックの終了_ タグを示します。 `:` の文字は `{:else}` のように _ブロックの継続_ タグを示します。ご心配なく、あなたは既にSvelteがHTMLに追加している構文のほとんどを学んでいます。
