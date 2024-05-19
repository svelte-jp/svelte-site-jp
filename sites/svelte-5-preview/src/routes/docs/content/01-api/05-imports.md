---
title: Imports
---

Svelte 5 では runes だけでなく、`getContext`、`setContext`、`tick` などの既存のものに加えて、import することができる新しい便利なものが導入されています。

## `svelte`

### `mount`

コンポーネントをインスタンス化し、指定されたターゲットにマウントします:

```js
// @errors: 2322
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
	target: document.querySelector('#app'),
	props: { some: 'property' }
});
```

### `hydrate`

`mount` に似ていますが、Svelte の SSR 出力 ([`render`](#svelte-server-render) 関数) によってレンダリングされた HTML をターゲット内で再利用し、それをインタラクティブにします:

```js
// @errors: 2322
import { hydrate } from 'svelte';
import App from './App.svelte';

const app = hydrate(App, {
	target: document.querySelector('#app'),
	props: { some: 'property' }
});
```

### `unmount`

[`mount`](#svelte-mount) や [`hydrate`](#svelte-hydrate) で作成されたコンポーネントをアンマウントします:

```js
// @errors: 1109
import { mount, unmount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {...});

// later
unmount(app);
```

### `untrack`

(変数などが) `$effect`/`$derived` の依存関係として扱われるのを止めたい場合は、`untrack` を使用します:

```svelte
<script>
	import { untrack } from 'svelte';

	let { a, b } = $props();

	$effect(() => {
		// `a` が変更されたときには実行されますが、
		// `b` が変更されたときには実行されません
		console.log(a);
		console.log(untrack(() => b));
	});
</script>
```

## `svelte/reactivity`

Svelte ではリアクティブな `Map`、`Set`、`Date`、`URL` classを提供しています。これらは `svelte/reactivity` から import し、ネイティブなものと同じように使用することができます。[デモ:](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAAE32QzWrDMBCEX2Wri1uo7bvrBHrvqdBTUogqryuBfhZp5SQYv3slSsmpOc7uN8zsrmI2FpMYDqvw0qEYxCuReBZ8pSrSgpax6BRyVHUyJhUN8f7oj2wchciwwsf7G2wwx-Cg-bX0EaVisxi-Ni-FLbQKPjHkaGEHHs_V9NhoZkpD3-NFOrLYqeB6kqybp-Ia-1uYHx_aFpSW_hsTcADWmLDrOmjbsh-Np8zwZfw0LNJm3K0lqaMYOKhgt_8RHRLX0-8gtdAfUiAdb4XOxlrINElGOOmI8wmkn2AxCmHBmOTdetWw7ct7XZjMbHASA8eM2-f2A-JarmyZAQAA)

```svelte
<script>
	import { URL } from 'svelte/reactivity';

	const url = new URL('https://example.com/path');
</script>

<!-- これらを変更すると… -->
<input bind:value={url.protocol} />
<input bind:value={url.hostname} />
<input bind:value={url.pathname} />

<hr />

<!-- `href` が更新さrます。逆もまた同様です -->
<input bind:value={url.href} />
```

## `svelte/server`

### `render`

サーバー上で、かつ、`server` オプションでコンパイルした場合にのみ、利用可能です。コンポーネントを引数に取り、`html` プロパティと `head` プロパティを持つオブジェクトを返します。このオブジェクトは、アプリをサーバーでレンダリングする際に HTML を入力するのに使用することができます:

```js
// @errors: 2724 2305 2307
import { render } from 'svelte/server';
import App from './App.svelte';

const result = render(App, {
	props: { some: 'property' }
});
```
