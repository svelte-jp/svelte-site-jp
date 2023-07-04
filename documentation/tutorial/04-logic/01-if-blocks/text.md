---
title: If blocks
---

HTML には条件式やループのような _ロジック_ を表現する方法がありません。Svelteにはあります。

条件付きでマークアップをレンダリングする場合は、そのマークアップを `if` ブロックで囲みます:

```svelte
{#if user.loggedIn}
	<button on:click={toggle}> Log out </button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}> Log in </button>
{/if}
```

試してみてください。コンポーネントを更新し、ボタンをクリックしてみてください。
