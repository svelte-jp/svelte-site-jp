---
title: Assignments
---

Svelteの中心には、DOMを（例えば、イベントに応じて）アプリケーションの状態に同期し続けさせるための強力な _リアクティビティ(reactivity)_ システムがあります。

これを実演するには、まずイベントハンドラを定義する必要があります。9行目をこれに置き換えてください。

```svelte
<button on:click={incrementCount}>
```

関数 `incrementCount` の内部で必要なのは `count` の値を変更することだけです。

```js
function incrementCount() {
	count += 1;
}
```

Svelteは、DOMが更新される必要があることを伝えるコードをこの代入に取り付け（instrument）ます。
