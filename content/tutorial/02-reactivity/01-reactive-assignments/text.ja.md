---
title: Assignments
---

Svelteの中心には、アプリケーションの状態に合わせてDOMを同期させるための強力な *reactivity* システムがあります。—例えば、イベントのレスポンスのような。

これを実演するには、まずイベントハンドラを定義する必要があります。9行目をこれに置き換えてください。

```html
<button on:click={handleClick}>
```

関数 `handleClick` の内部で必要なのは `count` の値を変更することだけです。

```js
function handleClick() {
	count += 1;
}
```

Svelte は DOM を更新する必要があることを伝えるために、この変更をいくつかのコードを使って 'instruments' します。