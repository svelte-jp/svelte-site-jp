---
title: Runes
---

Svelte 5 では _rune_ を導入します。これはリアクティビティをコントロールするためのパワフルなプリミティブセットで、Svelte コンポーネントはもちろん、今回ついに `.svelte.js` と `.svelte.ts` モジュールでも使えるようになりました。

Rune は関数ライクなシンボルで、Svelte コンパイラに命令(instructions)を提供します。Svelte を使用するとき、これをインポートする必要はありません — これは言語の一部だからです。

[rune モードを使用する](#how-to-opt-in)場合は、'What this replaces' セクションにリストアップされている非rune の機能は使用できません。

> このドキュメントに飛び込む前に、ブログ記事の [Rune 導入](https://svelte.jp/blog/runes) をチェックしてみてください！

## `$state`

リアクティブなステートは `$state` rune で宣言します:

```svelte
<script>
	let count = $state(0);
</script>

<button on:click={() => count++}>
	clicks: {count}
</button>
```

また、class の field で `$state` を使用することもできます (public と private のどちらでも):

```js
// @errors: 7006 2554
class Todo {
	done = $state(false);
	text = $state();

	constructor(text) {
		this.text = text;
	}
}
```

> この例では、コンパイラは `done` と `text` を、private field を参照する class prototype の `get`/`set` メソッドに変換します

オブジェクトと配列は、[`Proxies`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) でラップされるため、[深くリアクティブ(deeply reactive)になります](/#H4sIAAAAAAAAE42QwWrDMBBEf2URhUhUNEl7c21DviPOwZY3jVpZEtIqUBz9e-UUt9BTj7M784bdmZ21wciq48xsPyGr2MF7Jhl9-kXEKxrCoqNLQS2TOqqgPbWd7cgggU3TgCFCAw-RekJ-3Et4lvByEq-drbe_dlsPichZcFYZrT6amQto2pXw5FO88FUYtG90gUfYi3zvWrYL75vxL57zfA07_zfr23k1vjtt-aZ0bQTcbrDL5ZifZcAxKeS8lzDc8X0xDhJ2ItdbX1jlOZMb9VnjyCoKCfMpfwG975NFVwEAAA==) by wrapping them with [`Proxies`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy):

```svelte
<script>
	let numbers = $state([1, 2, 3]);
</script>

<button onclick={() => numbers.push(numbers.length + 1)}>
	push
</button>

<button onclick={() => numbers.pop()}> pop </button>

<p>
	{numbers.join(' + ') || 0}
	=
	{numbers.reduce((a, b) => a + b, 0)}
</p>
```

### What this replaces

非 rune モードでは、`let` 宣言がありそれがどこかで更新されている場合にリアクティブなステートとして扱われます。`$state(...)` はアプリのどこでも動作しますが、`let` の場合はコンポーネントのトップレベルにある場合にのみリアクティブなステートとして振る舞います。

## `$state.frozen`

State declared with `$state.frozen` cannot be mutated; it can only be _reassigned_. In other words, rather than assigning to a property of an object, or using an array method like `push`, replace the object or array altogether if you'd like to update it:

```diff
<script>
-	let numbers = $state([1, 2, 3]);
+	let numbers = $state.frozen([1, 2, 3]);
</script>

-<button onclick={() => numbers.push(numbers.length + 1)}>
+<button onclick={() => numbers = [...numbers, numbers.length + 1]}>
	push
</button>

-<button onclick={() => numbers.pop()}> pop </button>
+<button onclick={() => numbers = numbers.slice(0, -1)}> pop </button>

<p>
	{numbers.join(' + ') || 0}
	=
	{numbers.reduce((a, b) => a + b, 0)}
</p>
```

This can improve performance with large arrays and objects that you weren't planning to mutate anyway, since it avoids the cost of making them reactive. Note that frozen state can _contain_ reactive state (for example, a frozen array of reactive objects).

> Objects and arrays passed to `$state.frozen` will be shallowly frozen using `Object.freeze()`. If you don't want this, pass in a clone of the object or array instead.

## `$state.snapshot`

To take a static snapshot of a deeply reactive `$state` proxy, use `$state.snapshot`:

```svelte
<script>
	let counter = $state({ count: 0 });

	function onclick() {
		// Will log `{ count: ... }` rather than `Proxy { ... }`
		console.log($state.snapshot(counter));
	}
</script>
```

This is handy when you want to pass some state to an external library or API that doesn't expect a proxy, such as `structuredClone`.

> Note that `$state.snapshot` will clone the data when removing reactivity. If the value passed isn't a `$state` proxy, it will be returned as-is.

## `$derived`

派生するステートは `$derived` rune で宣言します:

```diff
<script>
	let count = $state(0);
+	let doubled = $derived(count * 2);
</script>

<button on:click={() => count++}>
	{doubled}
</button>

+<p>{count} doubled is {doubled}</p>
```

`$derived(...)` の内側の式は、副作用 (side-effects) があってはいけません。Svelte は derived の内側の式でステートの変更 (例: `count++`) を許しません。

`$state` と同様、class の fields で `$derived` を使用することができます。

### What this replaces

これまでは `$: double = count * 2` や `$: { double = count * 2; }` といった形式で、リアクティブな変数の値が算出されていた場合、`$derived` で置き換える必要があります。ただし、気をつけるべき重要な違いがいくつかあります:

- `$derived` rune の場合、`double` の値は常に最新です (例えば、`count` を更新してすぐに `console.log(double)` してみてください)。`$:` 宣言の場合、Svelte が DOM を更新する直前まで値が更新されません
- 非 rune モードでは、Svelte は `count * 2` という式を静的に解析することで `double` の依存関係 (dependencies) を決定します。もしこのようにリファクタリングすると…
  ```js
  // @errors: 2304
  const doubleCount = () => count * 2;
  $: double = doubleCount();
  ```
  …依存関係の情報 (dependency information) が失われてしまい、`count` が変更されても `double` は更新されなくなります。rune では、依存関係 (dependencies) はランタイムが追跡します。
- 非 rune モードでは、リアクティブステートメントは _トポロジカルに_ オーダーされるため、このようなケースでは…
  ```js
  // @errors: 2304
  $: triple = double + count;
  $: double = count * 2;
  ```
  …`double` はソースの順序に関係なく、最初に計算されます。rune モードでは、`triple` は `double` を参照できません。`double` が先に宣言されていないからです。

## `$derived.by`

Sometimes you need to create complex derivations that don't fit inside a short expression. In these cases, you can use `$derived.by` which accepts a function as its argument.

```svelte
<script>
	let numbers = $state([1, 2, 3]);
	let total = $derived.by(() => {
		let total = 0;
		for (const n of numbers) {
			total += n;
		}
		return total;
	});
</script>

<button on:click={() => numbers.push(numbers.length + 1)}>
	{numbers.join(' + ')} = {total}
</button>
```

In essence, `$derived(expression)` is equivalent to `$derived.by(() => expression)`.

## `$effect`

ある値が変更されたときやコンポーネントが DOM にマウントされたときに、ロギングやアナリティクスのような副作用 (side-effects) を実行するには、`$effect` rune を使用します:

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);

	$effect(() => {
		console.log({ count, doubled });
	});
</script>

<button on:click={() => count++}>
	{doubled}
</button>

<p>{count} doubled is {doubled}</p>
```

`$effect` will automatically subscribe to any `$state` or `$derived` values it reads _synchronously_ and reruns whenever their values change — that means, values after an `await` or inside a `setTimeout` will _not_ be tracked. `$effect` will run after the DOM has been updated.

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);

	$effect(() => {
		// runs after the DOM has been updated
		// when the component is mounted
		// and whenever `count` changes,
		// but not when `doubled` changes,
		console.log(count);

		setTimeout(() => console.log(doubled));
	});
</script>

<button on:click={() => count++}>
	{doubled}
</button>

<p>{count} doubled is {doubled}</p>
```

An effect only reruns when the object it reads changes, not when a property inside it changes. If you want to react to _any_ change inside an object for inspection purposes at dev time, you may want to use [`inspect`](#$inspect).

```svelte
<script>
	let object = $state({ count: 0 });
	let derived_object = $derived({
		doubled: object.count * 2
	});

	$effect(() => {
		// never reruns, because object does not change,
		// only its property changes
		object;
		console.log('object');
	});

	$effect(() => {
		// reruns, because object.count changes
		object.count;
		console.log('object.count');
	});

	$effect(() => {
		// reruns, because $derived produces a new object on each rerun
		derived_object;
		console.log('derived_object');
	});
</script>

<button on:click={() => object.count++}>
	{derived_object.doubled}
</button>

<p>{object.count} doubled is {derived_object.doubled}</p>
```

You can return a function from `$effect`, which will run immediately before the effect re-runs, and before it is destroyed ([demo](/#H4sIAAAAAAAAE42SzW6DMBCEX2Vl5RDaVCQ9JoDUY--9lUox9lKsGBvZC1GEePcaKPnpqSe86_m0M2t6ViqNnu0_e2Z4jWzP3pqGbRhdmrHwHWrCUHvbOjF2Ei-caijLTU4aCYRtDUEKK0-ccL2NDstNrbRWHoU10t8Eu-121gTVCssSBa3XEaQZ9GMrpziGj0p5OAccCgSHwmEgJZwrNNihg6MyhK7j-gii4uYb_YyGUZ5guQwzPdL7b_U4ZNSOvp9T2B3m1rB5cLx4zMkhtc7AHz7YVCVwEFzrgosTBMuNs52SKDegaPbvWnMH8AhUXaNUIY6-hHCldQhUIcyLCFlfAuHvkCKaYk8iYevGGgy2wyyJnpy9oLwG0sjdNe2yhGhJN32HsUzi2xOapNpl_bSLIYnDeeoVLZE1YI3QSpzSfo7-8J5PKbwOmdf2jC6JZyD7HxpPaMk93aHhF6utVKVCyfbkWhy-hh9Z3o_2nQIAAA==)).

```svelte
<script>
	let count = $state(0);
	let milliseconds = $state(1000);

	$effect(() => {
		// This will be recreated whenever `milliseconds` changes
		const interval = setInterval(() => {
			count += 1;
		}, milliseconds);

		return () => {
			// if a callback is provided, it will run
			// a) immediately before the effect re-runs
			// b) when the component is destroyed
			clearInterval(interval);
		};
	});
</script>

<h1>{count}</h1>

<button onclick={() => (milliseconds *= 2)}>slower</button>
<button onclick={() => (milliseconds /= 2)}>faster</button>
```

### When not to use `$effect`

In general, `$effect` is best considered something of an escape hatch — useful for things like analytics and direct DOM manipulation — rather than a tool you should use frequently. In particular, avoid using it to synchronise state. Instead of this...

```svelte
<script>
	let count = $state(0);
	let doubled = $state();

	// don't do this!
	$effect(() => {
		doubled = count * 2;
	});
</script>
```

...do this:

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>
```

> For things that are more complicated than a simple expression like `count * 2`, you can also use [`$derived.by`](#$derived-by).

When reacting to a state change and writing to a different state as a result, think about if it's possible to use callback props instead.

```svelte
<!-- Don't do this -->
<script>
	let value = $state();
	let value_uppercase = $state();
	$effect(() => {
		value_uppercase = value.toUpperCase();
	});
</script>

<Text bind:value />

<!-- Do this instead: -->
<script>
	let value = $state();
	let value_uppercase = $state();
	function onValueChange(new_text) {
		value = new_text;
		value_uppercase = new_text.toUpperCase();
	}
</script>

<Text {value} {onValueChange}>
```

If you want to have something update from above but also modify it from below (i.e. you want some kind of "writable `$derived`"), and events aren't an option, you can also use an object with getters and setters.

```svelte
<script>
	let { value } = $props();
	let facade = {
		get value() {
			return value.toUpperCase();
		},
		set value(val) {
			value = val.toLowerCase();
		}
	};
</script>

<input bind:value={facade.value} />
```

If you absolutely have to update `$state` within an effect and run into an infinite loop because you read and write to the same `$state`, use [untrack](functions#untrack).

### What this replaces

`$: {}` で実行されていたコードのうち、副作用 (side-effects) をトリガーする部分は `$effect` で置き換え、リアクティブな変数の更新には `$derived` を使用するように注意して移行する必要があります。重要な違いは以下の通りです:

- effect はブラウザでのみ実行されます。サーバーサイドレンダリングでは実行されません。
- これは DOM が更新された後に実行されますが、`$:` ステートメントはその直前に実行されます
- effect が再実行される度に呼び出される cleanup 関数を返すことができます

付け加えると、以前は `onMount` や `afterUpdate` (後者は Svelte 5 で非推奨となります) を使用していた部分でも、effects を使用したいケースがあると思います。これらの API にはいくつか異なる部分があり、リアクティブな値を算出するのに `$effect` を使用するべきではありません。なぜなら、参照されるリアクティブな値が変更されると、そのたびに `$effect` がトリガーされてしまうからです (`untrack` を使用しない限り)。

## `$effect.pre`

まれに、DOM が更新される前にコードを実行させたいことがあるでしょう。その場合は `$effect.pre` rune を使用します:

```svelte
<script>
	import { tick } from 'svelte';

	let div;
	let messages = [];

	// ...

	$effect.pre(() => {
		if (!div) return; // not yet mounted

		// reference `messages` so that this code re-runs whenever it changes
		messages;

		// autoscroll when new messages are added
		if (
			div.offsetHeight + div.scrollTop >
			div.scrollHeight - 20
		) {
			tick().then(() => {
				div.scrollTo(0, div.scrollHeight);
			});
		}
	});
</script>

<div bind:this={div}>
	{#each messages as message}
		<p>{message}</p>
	{/each}
</div>
```

Apart from the timing, `$effect.pre` works exactly like [`$effect`](#$effect) — refer to its documentation for more info.

### What this replaces

これまで `beforeUpdate` を使用してきた場所で使うことができます。`afterUpdate` と同様に、Svelte 5 では `beforeUpdate` は非推奨となります。

## `$effect.active`

`$effect.active` rune は、コードが effect の内側で実行されているのか、テンプレート内で実行されているのかを教えてくれる高度な機能です ([デモ](/#H4sIAAAAAAAAE3XP0QrCMAwF0F-JRXAD595rLfgdzodRUyl0bVgzQcb-3VYFQfExl5tDMgvrPCYhT7MI_YBCiiOR2Aq-UxnSDT1jnlOcRlMSlczoiHUXOjYxpOhx5-O12rgAJg4UAwaGhDyR3Gxhjdai4V1v2N2wqus9tC3Y3ifMQjbehaqq4aBhLtEv_Or893icCsdLve-Caj8nBkU67zMO5HtGCfM3sKiWNKhV0zwVaBqd3x3ixVmHFyFLuJyXB-moOe8pAQAA)):

```svelte
<script>
	console.log('in component setup:', $effect.active()); // false

	$effect(() => {
		console.log('in effect:', $effect.active()); // true
	});
</script>

<p>in template: {$effect.active()}</p> <!-- true -->
```

(例えば) これを子の effect に置くことによって、サブスクリプションなどをメモリリークなしで追加することができます。

## `$effect.root`

`$effect.root` rune は、自動クリーンアップされない非追跡のスコープを作成することができる高度な機能です。
これは手動でコントロールしたいネストした effect を扱うのに有用です。また、この rune によって、コンポーネントの初期化フェーズ以外で effect を作成することができます。

```svelte
<script>
	let count = $state(0);

	const cleanup = $effect.root(() => {
		$effect(() => {
			console.log(count);
		});

		return () => {
			console.log('effect root cleanup');
		};
	});
</script>
```

## `$props`

コンポーネントの props を宣言するには、`$props` rune を使用します:

```js
let { optionalProp = 42, requiredProp } = $props();
```

(例えば) `<MyComponent catch={22} />` にある `catch` のような予約語を使用する必要がある場合、馴染みのある分割構文 (destructuring syntax) を使用して props をリネームすることができます:

```js
let { catch: theCatch } = $props();
```

全てのプロパティを取得するには、残余構文 (rest syntax) を使用します:

```js
let { a, b, c, ...everythingElse } = $props();
```

TypeScript を使用する場合、prop の型を宣言することができます:

```ts
type MyProps = any;
// ---cut---
let { a, b, c, ...everythingElse }: MyProps = $props();
```

> 初期のプレビューでは、`$props()` は型引数を取っていました。これはバグを発生させていました。それは例えばこのような場合に…
>
> ```ts
> // @errors: 2558
> let { x = 42 } = $props<{ x: string }>();
> ```
>
> …TypeScript はこれをエラーにせずに、`x` が `string | number` であるというように[型を広げてしまう](https://www.typescriptlang.org/play?#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwBIAHGHIgZwB4AVeAXnilQE8A+ACgEoAueagbgBQgiCAzwA3vAAe9eABYATPAC+c4qQqUp03uQwwsqAOaqOnIfCsB6a-AB6AfiA)のです。

もし JavaScript を使用している場合、JSDoc を使用して prop の型を宣言することができます。

```js
/** @type {{ x: string }} */
let { x } = $props();

// or use @typedef if you want to document the properties:

/**
 * @typedef {Object} MyProps
 * @property {string} y Some documentation
 */

/** @type {MyProps} */
let { y } = $props();
```

デフォルトでは、props は読み取り専用として扱われます。つまり、再代入は上位へ伝搬(propagate)せず、変更した場合は開発モードでの実行時に警告となります。また、親コンポーネントの読み取り専用の props に `bind:` しようとすると、実行時エラーとなります。バインド可能な props を宣言するには、[`$bindable()`](#$bindable) を使用します。

### What this replaces

`$props` は、props を宣言する `export let` と `export { x as y }` 構文を置き換えます。また、`$$props` と `$$restProps`、そして知る人ぞ知る `interface $$Props {...}` construct も置き換えます。

なお、`export const` と `export function` を使用してコンポーネントのユーザーに諸々を公開することは可能です (例えば、`bind:this` を使用する場合など)。

## `$bindable`

To declare props as bindable, use `$bindable()`. Besides using them as regular props, the parent can (_can_, not _must_) then also `bind:` to them.

```svelte
<script>
	let { bindableProp = $bindable() } = $props();
</script>
```

You can pass an argument to `$bindable()`. This argument is used as a fallback value when the property is `undefined`.

```svelte
<script>
	let { bindableProp = $bindable('fallback') } = $props();
</script>
```

Note that the parent is not allowed to pass `undefined` to a property with a fallback if it `bind:`s to that property.

## `$inspect`

`$inspect` rune は大まかには `console.log` と一緒ですが、与えられた引数が変わるたびに再実行されるという点が異なります。
`$inspect` はリアクティブな state を深く(deeply)追跡します。つまり、[fine-grained reactivity](/docs/fine-grained-reactivity) によって
オブジェクトや配列の内側で何かしらが更新されると再実行されます。([デモ:](/#H4sIAAAAAAAACkWQ0YqDQAxFfyUMhSotdZ-tCvu431AXtGOqQ2NmmMm0LOK_r7Utfby5JzeXTOpiCIPKT5PidkSVq2_n1F7Jn3uIcEMSXHSw0evHpAjaGydVzbUQCmgbWaCETZBWMPlKj29nxBDaHj_edkAiu12JhdkYDg61JGvE_s2nR8gyuBuiJZuDJTyQ7eE-IEOzog1YD80Lb0APLfdYc5F9qnFxjiKWwbImo6_llKRQVs-2u91c_bD2OCJLkT3JZasw7KLA2XCX31qKWE6vIzNk1fKE0XbmYrBTufiI8-_8D2cUWBA_AQAA))

```svelte
<script>
	let count = $state(0);
	let message = $state('hello');

	$inspect(count, message); // will console.log when `count` or `message` change
</script>

<button onclick={() => count++}>Increment</button>
<input bind:value={message} />
```

`$inspect` は `with` を返します。これにコールバックを渡すことで、`console.log` の代わりにコールバックを呼び出すことができます。コールバックの第一引数は `"init"` か `"update"` で、それに続く引数は `$inspect` に渡された値です。[デモ:](/#H4sIAAAAAAAACkVQ24qDMBD9lSEUqlTqPlsj7ON-w7pQG8c2VCchmVSK-O-bKMs-DefKYRYx6BG9qL4XQd2EohKf1opC8Nsm4F84MkbsTXAqMbVXTltuWmp5RAZlAjFIOHjuGLOP_BKVqB00eYuKs82Qn2fNjyxLtcWeyUE2sCRry3qATQIpJRyD7WPVMf9TW-7xFu53dBcoSzAOrsqQNyOe2XUKr0Xi5kcMvdDB2wSYO-I9vKazplV1-T-d6ltgNgSG1KjVUy7ZtmdbdjqtzRcphxMS1-XubOITJtPrQWMvKnYB15_1F7KKadA_AQAA)

```svelte
<script>
	let count = $state(0);

	$inspect(count).with((type, count) => {
		if (type === 'update') {
			debugger; // or `console.trace`, or whatever you want
		}
	});
</script>

<button onclick={() => count++}>Increment</button>
```

`with` に `console.trace` を渡すと、値の変更がどこで行われたかを簡単に確認することができます:

```js
// @errors: 2304
$inspect(stuff).with(console.trace);
```

> `$inspect` は開発時にのみ動作します。

## `$host`

Retrieves the `this` reference of the custom element that contains this component. Example:

```svelte
<svelte:options customElement="my-element" />

<script>
	function greet(greeting) {
		$host().dispatchEvent(
			new CustomEvent('greeting', { detail: greeting })
		);
	}
</script>

<button onclick={() => greet('hello')}>say hello</button>
```

> Only available inside custom element components, and only on the client-side

## How to opt in

現在の Svelte のコードは調整することなく引き続き動作します。Svelte 4 の構文を使用しているコンポーネントは Rune を使用するコンポーネントを使用することができます。その逆も同様に使用できます。

Rune モードを選択する最も簡単な方法は、コードで rune を実際に使用することです。他の方法としては、コンポーネントごとに rune モードか非 rune モードかをコンパイラに強制させることもできます…

<!-- prettier-ignore -->
```svelte
<!--- file: YourComponent.svelte --->
<!-- this can be `true` or `false` -->
<svelte:options runes={true} />
```

…または、アプリ全体に対して設定することもできます:

```js
/// file: svelte.config.js
export default {
	compilerOptions: {
		runes: true
	}
};
```
