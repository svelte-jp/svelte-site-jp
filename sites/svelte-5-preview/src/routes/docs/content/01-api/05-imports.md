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

## `svelte/elements`

Svelte provides built-in [DOM types](https://github.com/sveltejs/svelte/blob/master/packages/svelte/elements.d.ts). A common use case for DOM types is forwarding props to an HTML element. To properly type your props and get full intellisense, your props interface should extend the attributes type for your HTML element:

```svelte
<script lang="ts">
	import { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		username: string;
	}

	let { username, ...rest }: Props = $props();
</script>

<div {...rest}>
	Hi, {username}!
</div>
```

> You can use `ComponentProps<ImportedComponent>`, if you wish to forward props to forward props to a Svelte component.

Svelte provides a best-effort of all the HTML DOM types that exist. If an attribute is missing from our [type definitions](https://github.com/sveltejs/svelte/blob/master/packages/svelte/elements.d.ts), you are welcome to open an issue and/or a PR fixing it. For experimental attributes, you can augment the existing types locally by creating a `.d.ts` file:

```ts
import { HTMLButtonAttributes } from 'svelte/elements';

declare module 'svelte/elements' {
	export interface SvelteHTMLElements {
		'custom-button': HTMLButtonAttributes;
	}

	// allows for more granular control over what element to add the typings to
	export interface HTMLButtonAttributes {
		veryexperimentalattribute?: string;
	}
}

export {}; // ensure this is not an ambient module, else types will be overridden instead of augmented
```

The `.d.ts` file must be included in your `tsconfig.json` file. If you are using the standard `"include": ["src/**/*"]`, this just means the file should be placed in the `src` directory.
