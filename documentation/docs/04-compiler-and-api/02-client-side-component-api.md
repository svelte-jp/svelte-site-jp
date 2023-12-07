---
title: 'Client-side component API'
---

## Creating a component

```ts
// @errors: 2554
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var options: ComponentConstructorOptions<Record<string, any>>;
}

// @filename: index.ts
// @errors: 2554
// ---cut---
const component = new Component(options);
```

クライアントサイドコンポーネント、つまり `generate: 'dom'`（もしくは `generate` オプションを指定しないまま）でコンパイルされたコンポーネントは JavaScript のクラスです。

```ts
// @errors: 2554
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare module './App.svelte' {
	class Component extends SvelteComponent {}
	export default Component;
}

// @filename: index.ts
// @errors: 2554
// ---cut---
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// assuming App.svelte contains something like
		// `export let answer`:
		answer: 42
	}
});
```

以下の初期化オプションが提供されています:

| option    | default     | description                                                                                          |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `target`  | **none**    | レンダリング先の `HTMLElement` または `ShadowRoot`。このオプションは必須です                                 |
| `anchor`  | `null`      | `target` の子要素で、コンポーネントはこれのすぐ前にレンダリングされます                                        |
| `props`   | `{}`        | コンポーネントに渡す、プロパティのオブジェクト                                                              |
| `context` | `new Map()` | コンポーネントに渡す、ルートレベルの context の key-value ペアの `Map`                                      |
| `hydrate` | `false`     | 下記参照                                                                                              |
| `intro`   | `false`     | `true` なら、その後の状態変化を待つのではなく、初回レンダリング時にトランジションを再生します。                     |

`target` の既存の子要素はそのまま残されます。

`hydrate` オプションは、新しい要素を作成するのではなく、既存の DOM を（大抵はサーバーサイドレンダリングから）アップグレードするよう Svelte に指示します。これはコンポーネントが [`hydratable: true` のオプション](/docs/svelte-compiler#compile) でコンパイルされた場合にのみ機能します。`<head>` 要素のハイドレーションは、サーバーサイドレンダリングのコードも `hydratable: true` を使ってコンパイルされた場合 (これによって `head` 内の各要素にマーカーを追加して、コンポーネントがハイドレーション中にどの要素を除去すべきかを認識できるようにする) にのみ適切に動作します。

通常、`target` の子要素はそのまま残されますが、`hydrate: true` ではすべての子要素が削除されます。そのため `anchor` オプションは `hydrate: true` と一緒に使用できません。

既存の DOM はコンポーネントと一致している必要はありません。Svelte は DOM をそのまま「修復」します。

```ts
/// file: index.js
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare module './App.svelte' {
	class Component extends SvelteComponent {}
	export default Component;
}

// @filename: index.ts
// @errors: 2322 2554
// ---cut---
import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered-html'),
	hydrate: true
});
```

## `$set`

```ts
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
	var props: Record<string, any>;
}

export {};

// @filename: index.ts
// ---cut---
component.$set(props);
```

プログラムでインスタンスに props をセットします。`component.$set({ x: 1 })` はコンポーネントの `<script>` ブロック内の `x = 1` と同じです。

このメソッドを呼ぶと次のマイクロタスクに更新がスケジュールされます。DOM は同期的に更新されません。

```ts
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
}

export {};

// @filename: index.ts
// ---cut---
component.$set({ answer: 42 });
```

## `$on`

```ts
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
	var ev: string;
	var callback: (event: CustomEvent) => void;
}

export {};

// @filename: index.ts
// ---cut---
component.$on(ev, callback);
```

コンポーネントが `event` をディスパッチするたびに、`callback` 関数が呼び出されるようにします。

呼び出されたときにイベントリスナーを削除する関数が返されます。

```ts
/// file: index.js
// @errors: 7006
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
}

export {};

// @filename: index.ts
// ---cut---
const off = component.$on('selected', (event) => {
	console.log(event.detail.selection);
});

off();
```

## `$destroy`

```js
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
}

export {}

// @filename: index.ts
// ---cut---
component.$destroy();
```

DOM からコンポーネントを削除し、すべての `onDestroy` ハンドラをトリガします。

## Component props

```js
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
}

export {}

// @filename: index.ts
// @errors: 2339
// ---cut---
component.prop;
```

```js
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
	var value: unknown;
}

export {}

// @filename: index.ts
// @errors: 2339
// ---cut---
component.prop = value;
```

コンポーネントが `accessors: true` でコンパイルされている場合、各インスタンスはコンポーネントの各 props に対するゲッターとセッターを持ちます。値をセットすると（`component.$set(...)` によって起こるデフォルトの非同期更新ではなく）、_同期的な_ 更新が起こります。

カスタム要素としてコンパイルする場合を除き、デフォルトでは `accessors` は `false` です。

```js
/// file: index.js
// @filename: ambient.d.ts
import { SvelteComponent, ComponentConstructorOptions } from 'svelte';

declare global {
	class Component extends SvelteComponent {}
	var component: Component;
	var props: Record<string, any>;
}

export {}

// @filename: index.ts
// @errors: 2339
// ---cut---
console.log(component.count);
component.count += 1;
```
