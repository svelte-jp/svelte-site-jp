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

`$state.frozen` で宣言された state は変更することができません、できるのは再代入だけです。言い換えると、もし更新したいのであれば、オブジェクトのプロパティに代入したり `push` のような配列のメソッドを使用するのではなく、オブジェクトや配列を完全に置き換える必要がある、ということです:

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

これによって、対象ををリアクティブにするコストを避けることができるため、変更するつもりのない大きな配列やオブジェクトを扱うときにパフォーマンスを改善することができます。凍結された(frozen) state にはリアテクティブな state を含めることができます(例えば、リアクティブなオブジェクトの凍結された配列、のように)。

> `$state.frozen` に渡されたオブジェクトや配列は、`Object.freeze()` を使用して浅く (shallowly) 凍結されます。こうしたくない場合は、代わりにオブジェクトや配列のクローンを渡してください。

## `$state.snapshot`

深い (deeply) リアクティブな `$state` proxy の静的なスナップショットを取得するには、`$state.snapshot` を使用します:

```svelte
<script>
	let counter = $state({ count: 0 });

	function onclick() {
		// `Proxy { ... }` ではなく`{ count: ... }` がログ出力される
		console.log($state.snapshot(counter));
	}
</script>
```

これは、例えば `structuredClone` のような、proxy を受け取ることを想定していない API や外部のライブラリに state を渡すときに役立ちます。

> `$state.snapshot` はリアクティビティを削除するときにそのデータをクローンしていることにご注意ください。渡された値が `$state` proxy でない場合は、そのまま返されます。

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

時には、短い式には収まらない、複雑な導出(derivations)を作成する必要あります。そのような場合は、関数を引数に取る `$derived.by` を使用します。

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

本質的には、`$derived(expression)` と `$derived.by(() => expression)` は同等のものです。

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

`$effect` は 同期的に読み取った `$state` や `$derived` の値を自動的にサブスクライブし、値が変わるたびに再実行されます。なお、その値が `await` の後や `setTimeout` の中にある場合はその値は追跡されません。`$effect` は DOM が更新されたあとに実行されます。

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);

	$effect(() => {
		// DOM が更新されたあとに実行されます。
		// コンポーネントがマウントされるときや、
		// `count` が変更されるたびに実行されますが、
		// `doubled` が変更されたときには実行されません。
		console.log(count);

		setTimeout(() => console.log(doubled));
	});
</script>

<button on:click={() => count++}>
	{doubled}
</button>

<p>{count} doubled is {doubled}</p>
```

effect は読み取ったオブジェクトが変更された場合には再実行されますが、そのオブジェクトが持つプロパティが変更された場合には再実行されません。もし開発時に、検査(inspection)目的でオブジェクト内部のあらゆる変更にリアクティブにしたければ、[`inspect`](#$inspect) を使用するとよいでしょう。

```svelte
<script>
	let object = $state({ count: 0 });
	let derived_object = $derived({
		doubled: object.count * 2
	});

	$effect(() => {
		// これは再実行されません。objectのプロパティ(object.count)は変更されますが、
		// object自体は変更されないからです。
		object;
		console.log('object');
	});

	$effect(() => {
		// これは再実行されます。object.count は変更されるからです。
		object.count;
		console.log('object.count');
	});

	$effect(() => {
		// これは再実行されます。$derived は派生元(object.count)が変更されるたびに、新しいオブジェクトを生成するからです。
		derived_object;
		console.log('derived_object');
	});
</script>

<button on:click={() => object.count++}>
	{derived_object.doubled}
</button>

<p>{object.count} doubled is {derived_object.doubled}</p>
```

`$effect` は関数を返すことができます。その関数は、effect が再実行される直前と、破棄される直前に実行されます ([デモ](/#H4sIAAAAAAAAE42SzW6DMBCEX2Vl5RDaVCQ9JoDUY--9lUox9lKsGBvZC1GEePcaKPnpqSe86_m0M2t6ViqNnu0_e2Z4jWzP3pqGbRhdmrHwHWrCUHvbOjF2Ei-caijLTU4aCYRtDUEKK0-ccL2NDstNrbRWHoU10t8Eu-121gTVCssSBa3XEaQZ9GMrpziGj0p5OAccCgSHwmEgJZwrNNihg6MyhK7j-gii4uYb_YyGUZ5guQwzPdL7b_U4ZNSOvp9T2B3m1rB5cLx4zMkhtc7AHz7YVCVwEFzrgosTBMuNs52SKDegaPbvWnMH8AhUXaNUIY6-hHCldQhUIcyLCFlfAuHvkCKaYk8iYevGGgy2wyyJnpy9oLwG0sjdNe2yhGhJN32HsUzi2xOapNpl_bSLIYnDeeoVLZE1YI3QSpzSfo7-8J5PKbwOmdf2jC6JZyD7HxpPaMk93aHhF6utVKVCyfbkWhy-hh9Z3o_2nQIAAA==)).

```svelte
<script>
	let count = $state(0);
	let milliseconds = $state(1000);

	$effect(() => {
		// この interval は `milliseconds`が変更されるたびに再作成されます 
		const interval = setInterval(() => {
			count += 1;
		}, milliseconds);

		return () => {
			// コールバックが提供される場合、以下のときに実行されます
			// a) effect が再実行される直前
			// b) コンポーネントが破棄されるとき
			clearInterval(interval);
		};
	});
</script>

<h1>{count}</h1>

<button onclick={() => (milliseconds *= 2)}>slower</button>
<button onclick={() => (milliseconds /= 2)}>faster</button>
```

### When not to use `$effect`

一般的には、`$effect` は、頻繁に使用すべきツールというよりは、なんらかの (例えばアナリティクスや直接的な DOM 操作を行うのに便利な) エスケープハッチであると考えたほうがよいでしょう。特に、state の同期に使用するのは避けましょう。こうする代わりに…

```svelte
<script>
	let count = $state(0);
	let doubled = $state();

	// これをやってはいけません！
	$effect(() => {
		doubled = count * 2;
	});
</script>
```

…こうしましょう:

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>
```

> `count * 2` のようなシンプルな式ではなく、もっと複雑なものを扱う場合は、[`$derived.by`](#$derived-by) を使うこともできます。

ある state の変更に対してリアクティブに反応し、その結果として別のステートに書き込む場合は、代わりにコールバック props が使用できないか検討しましょう。

```svelte
<!-- これをやってはいけません -->
<script>
	let value = $state();
	let value_uppercase = $state();
	$effect(() => {
		value_uppercase = value.toUpperCase();
	});
</script>

<Text bind:value />

<!-- 代わりにこうしましょう: -->
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

何かを (コンポーネントツリーの) 上側から更新したいけれど、下側からも変更したい場合 (つまり、ある種の "書き込み可能な (writable) `$derived`" が欲しい場合)、かつ、event が選択肢にない場合、getter と setter を持つオブジェクトを使うこともできます。

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

もし、どうしても `$state` を effect の中で更新する必要があり、同じ `$state` を読み書きするために無限ループになってしまう場合は、[untrack](functions#untrack) を使用しましょう。

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
		if (!div) return; // まだマウントされていない場合

		// `messages` を参照することで、これが変更されるたびにこのコードが再実行されます
		messages;

		// 新しい messages が追加されるたびに自動スクロールします
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

タイミング以外は、`$effect.pre` は [`$effect`](#$effect) と同じように動作します。詳細はドキュメントをご参照ください。

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

バインド可能 (bindable) な props を宣言するには、`$bindable()` を使用します。通常の props として使用するだけでなく、親がそれを `bind:` することができます(必須ではなく、あくまで可能であるというだけです)。

```svelte
<script>
	let { bindableProp = $bindable() } = $props();
</script>
```

`$bindable()` には引数を渡すことができます。この引数は、その props が `undefined` のときのフォールバック値として使用されます。

```svelte
<script>
	let { bindableProp = $bindable('fallback') } = $props();
</script>
```

フォールバックを持つ props を親が `bind:` している場合、親はその props に `undefined` を渡すことはできないことにご注意ください。

## `$inspect`

`$inspect` rune は大まかには `console.log` と一緒ですが、与えられた引数が変わるたびに再実行されるという点が異なります。
`$inspect` はリアクティブな state を深く(deeply)追跡します。つまり、[きめ細やかなリアクティビティ(fine-grained reactivity)](/docs/fine-grained-reactivity) によって
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
