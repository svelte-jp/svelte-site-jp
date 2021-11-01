---
title: If blocks
---

HTML には条件式やループのような *ロジック* を表現する方法がありません。Svelteにはあります。

条件付きでマークアップをレンダリングするために、私たちはそれを `if` ブロックで囲みます。

```html
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

試してみてください。コンポーネントを更新し、ボタンをクリックしてみてください。
