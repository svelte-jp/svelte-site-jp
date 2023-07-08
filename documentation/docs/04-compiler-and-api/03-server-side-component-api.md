---
title: 'Server-side component API'
---

```js
// @noErrors
const result = Component.render(...)
```

クライアントサイドコンポーネントとは異なり、サーバーサイドコンポーネントはレンダリングしてもライフサイクルがありません — HTML と CSS を作成するだけです。そのため API が多少異なります。

サーバーサイドコンポーネントは任意の props を取って呼び出す `render` メソッドを公開しています。呼び出すと、`head`、 `html`、 `css` プロパティを持つオブジェクトを返します。この `head` には `<svelte:head>` 要素の内容が含まれています。

[`svelte/register`](/docs/svelte-register) を使用すると、Svelte コンポーネントを直接 Node にインポートすることができます。

```js
// @noErrors
require('svelte/register');

const App = require('./App.svelte').default;

const { head, html, css } = App.render({
	answer: 42
});
```

`.render()` メソッドは以下のパラメータを受け取ります:

| parameter | default | description                                        |
| --------- | ------- | -------------------------------------------------- |
| `props`   | `{}`    | コンポーネントに渡すプロパティのオブジェクト              |
| `options` | `{}`    | オプションのオブジェクト                               |

`options` オブジェクトは、以下のオプションを取ります:

| option    | default     | description                                                              |
| --------- | ----------- | ------------------------------------------------------------------------ |
| `context` | `new Map()` | コンポーネントに提供するルートレベルの context の key-value ペアの `Map`         |

```js
// @noErrors
const { head, html, css } = App.render(
	// props
	{ answer: 42 },
	// options
	{
		context: new Map([['context-key', 'context-value']])
	}
);
```
