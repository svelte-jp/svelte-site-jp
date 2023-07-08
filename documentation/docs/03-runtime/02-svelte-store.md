---
title: 'svelte/store'
---

`svelte/store` モジュールは、[readable](/docs/svelte-store#readable)、[writable](/docs/svelte-store#writable)、[derived](/docs/svelte-store#derived) ストア(store)を作成する関数をエクスポートします。

コンポーネントで[リアクティブな `$store` 構文](/docs/svelte-components#script-4-prefix-stores-with-$-to-access-their-values)を便利に使う際に、これらの関数を使用しなくてもよいことを覚えておいてください。`.subscribe` とそのサブスクライブの解除、（オプションで）`.set` を正しく実装したオブジェクトは有効なストアであり、この特別な構文でも Svelte 組み込みの [`derived` ストア](/docs/svelte-store#derived)でも機能します。

これにより、リアクティブな状態を扱うほぼすべての他のライブラリを、Svelte で使用するためにラップすることが可能になります。正しい実装がどのようなものか理解するために、[ストアコントラクト(store contract)](/docs/svelte-components#script-4-prefix-stores-with-$-to-access-their-values) も読んでみてください。

## `writable`

> EXPORT_SNIPPET: svelte/store#writable

コンポーネントの'外側'からでも値を設定することができるストアを作成する関数。これは、`set` メソッド と `update` メソッドを併せ持つオブジェクトとして作成されます。

`set` は1つの引数を取るメソッドです。この引数はストアの値に設定されるものです。ストアの値が引数の値と等しくない場合、引数の値がストアの値に設定されます。

`update` は1つの引数を取る関数です。この引数はコールバックです。このコールバックは、既存のストアの値を引数に取り、ストアに設定される新しい値を返します。

```js
/// file: store.js
import { writable } from 'svelte/store';

const count = writable(0);

count.subscribe((value) => {
	console.log(value);
}); // logs '0'

count.set(1); // logs '1'

count.update((n) => n + 1); // logs '2'
```

第2引数に関数が渡された場合、その関数はサブスクライバーの数が0から1になると呼び出されます (ただし、1から2になった場合などには呼び出されません)。その関数には、ストアの値を変更する `set` 関数と、ストアの `update` メソッドのようにストアの古い値から新しい値を計算するコールバックを取る `update` 関数が渡されます。サブスクライバーの数が1から0になったときに呼び出される `stop` 関数を返す必要があります。

```js
/// file: store.js
import { writable } from 'svelte/store';

const count = writable(0, () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

count.set(1); // does nothing

const unsubscribe = count.subscribe((value) => {
	console.log(value);
}); // logs 'got a subscriber', then '1'

unsubscribe(); // logs 'no more subscribers'
```

`writable` の値は、例えばページが更新されたときなど、破棄されたときに失われるので注意してください。ただし、`localStorage` などに値を同期する独自ロジックを作ることはできます。

## `readable`

> EXPORT_SNIPPET: svelte/store#readable

「外側」から値を設定できないストアを作成します。`readable` の第1引数はストアの初期値で、の第2引数は `writable` の第2引数と同じです。

```js
<!--- file: App.svelte --->
// ---cut---
import { readable } from 'svelte/store';

const time = readable(new Date(), (set) => {
	set(new Date());

	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return () => clearInterval(interval);
});

const ticktock = readable('tick', (set, update) => {
	const interval = setInterval(() => {
		update((sound) => (sound === 'tick' ? 'tock' : 'tick'));
	}, 1000);

	return () => clearInterval(interval);
});
```

## `derived`

> EXPORT_SNIPPET: svelte/store#derived

1つ以上の他のストアからストアを派生させます。コールバックは、最初のサブスクライバーがサブスクライブしたときに最初に実行され、それからはストアが依存しているものが変化するたびに実行されます。

最もシンプルな例だと、`derived` は単一のストアを受け取り、コールバックは派生値を返します。

```ts
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const a: Writable<number>;
}

export {};

// @filename: index.ts
// ---cut---
import { derived } from 'svelte/store';

const doubled = derived(a, ($a) => $a * 2);
```

コールバックは、第2引数に `set` を、オプションで第3引数に `update` を受け取り、適宜どちらかまたは両方を呼び出し、非同期に値を設定できます。

この場合、`derived` に第3引数として、`set` や `update` が最初に呼び出される前の derived ストアの初期値を渡すこともできます。もし初期値が指定されない場合、ストアの初期値は `undefined` となります。

```js
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const a: Writable<number>;
}

export {};

// @filename: index.ts
// @errors: 18046 2769 7006
// ---cut---
import { derived } from 'svelte/store';

const delayed = derived(a, ($a, set) => {
	setTimeout(() => set($a), 1000);
}, 2000);

const delayedIncrement = derived(a, ($a, set, update) => {
	set($a);
	setTimeout(() => update(x => x + 1), 1000);
	// every time $a produces a value, this produces two
	// values, $a immediately and then $a + 1 a second later
});
```

コールバックから関数を返すと、a）コールバックが再度実行される時や b）最後のサブスクライバーがサブスクライブを解除する時に呼び出されます。

```js
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const frequency: Writable<number>;
}

export {};

// @filename: index.ts
// ---cut---
import { derived } from 'svelte/store';

const tick = derived(
	frequency,
	($frequency, set) => {
		const interval = setInterval(() => {
			set(Date.now());
		}, 1000 / $frequency);

		return () => {
			clearInterval(interval);
		};
	},
	2000
);
```

どちらの場合も、第1引数として、ストア1つではなく、引数の配列を渡すことができます。

```ts
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const a: Writable<number>;
	const b: Writable<number>;
}

export {};

// @filename: index.ts

// ---cut---
import { derived } from 'svelte/store';

const summed = derived([a, b], ([$a, $b]) => $a + $b);

const delayed = derived([a, b], ([$a, $b], set) => {
	setTimeout(() => set($a + $b), 1000);
});
```

## `readonly`

> EXPORT_SNIPPET: svelte/store#readonly

このシンプルはヘルパー関数は、ストアを読み取り専用(readonly)にすることができます。新しい readable ストアを使用して、オリジナルのストアからの変更をサブスクライブすることができます。

```js
import { readonly, writable } from 'svelte/store';

const writableStore = writable(1);
const readableStore = readonly(writableStore);

readableStore.subscribe(console.log);

writableStore.set(2); // console: 2
// @errors: 2339
readableStore.set(2); // ERROR
```

## `get`

> EXPORT_SNIPPET: svelte/store#get

通常は、ストアの値を読み取るには、そのストアをサブスクライブし、時間とともに変化する値を使用したほうがよいでしょう。しかし、場合によっては、サブスクライブしていないストア値を取得する必要があります。`get` はそれができます。

> 内部的には、サブスクリプションを作成し、値を読み取ってから、サブスクリプションを解除する、ということを行っています。したがって、ホットコードパスではお勧めしません。

```js
// @filename: ambient.d.ts
import { type Writable } from 'svelte/store';

declare global {
	const store: Writable<string>;
}

export {};

// @filename: index.ts
// ---cut---
import { get } from 'svelte/store';

const value = get(store);
```

## Types

> TYPES: svelte/store
