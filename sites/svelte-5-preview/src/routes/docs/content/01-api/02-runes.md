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

オブジェクトと配列は [リアクティブになります](/#H4sIAAAAAAAAE42QwWrDMBBEf2URhUhUNEl7c21DviPOwZY3jVpZEtIqUBz9e-UUt9BTj7M784bdmZ21wciq48xsPyGr2MF7Jhl9-kXEKxrCoqNLQS2TOqqgPbWd7cgggU3TgCFCAw-RekJ-3Et4lvByEq-drbe_dlsPichZcFYZrT6amQto2pXw5FO88FUYtG90gUfYi3zvWrYL75vxL57zfA07_zfr23k1vjtt-aZ0bQTcbrDL5ZifZcAxKeS8lzDc8X0xDhJ2ItdbX1jlOZMb9VnjyCoKCfMpfwG975NFVwEAAA==):

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

非 rune における `$: double = count * 2` とおよそ同等ですが、気をつけるべき重要な違いがあります:

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

## `$effect`

ある値が変更されたときや、コンポーネントが DOM にマウントされたときにコードを実行するには、`$effect` rune を使用します:

```diff
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);

+	$effect(() => {
+		// runs when the component is mounted, and again
+		// whenever `count` or `doubled` change,
+		// after the DOM has been updated
+		console.log({ count, doubled });
+
+		return () => {
+			// if a callback is provided, it will run
+			// a) immediately before the effect re-runs
+			// b) when the component is destroyed
+			console.log('cleanup');
+		};
+	});
</script>

<button on:click={() => count++}>
	{doubled}
</button>

<p>{count} doubled is {doubled}</p>
```

### What this replaces

`$effect` rune は、(宣言に対してではなく) 副作用 (side-effects) のために使用されるときは、`$:` と大体同じです。重要な違いは以下の通りです:

- effect はブラウザでのみ実行されます。サーバーサイドレンダリングでは実行されません。
- これは DOM が更新された後に実行されますが、`$:` ステートメントはその直前に実行されます
- effect が再実行される度に呼び出される cleanup 関数を返すことができます

さらに、`onMount` や `afterUpdate` を使用していたすべての場所でこの effect が使用できることに気がつくでしょう (後者は Svelte 5 で非推奨となります)。

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

TypeScript を使用する場合、型引数 (type arguments) を使用することができます:

```ts
type MyProps = any;
// ---cut---
let { a, b, c, ...everythingElse } = $props<MyProps>();
```

親コンポーネントが `bind:` を使用していない限り、props を変更することはできません。開発時には、props を変更使用とするとエラーとなります。

### What this replaces

`$props` は、props を宣言する `export let` と `export { x as y }` 構文を置き換えます。また、`$$props` と `$$restProps`、そして知る人ぞ知る `interface $$Props {...}` construct も置き換えます。

なお、`export const` と `export function` を使用してコンポーネントのユーザーに諸々を公開することは可能です (例えば、`bind:this` を使用する場合など)。

## `$inspect`

`$inspect` rune は大まかには `console.log` と一緒ですが、与えられた引数が変わるたびに再実行されるという点が異なります。
`$inspect` はリアクティブな state を深く(deeply)追跡します。つまり、[fine-grained reactivity](/docs/fine-grained-reactivity) により、
オブジェクトや配列の内側で何かしらが更新されると、再実行されます。([デモ:](/#H4sIAAAAAAAAE0WQ0W6DMAxFf8WKKhXUquyZAtIe9w1lEjS4ENU4EXFaTRH_Plq69fH6nutrOaqLIfQqP0XF7YgqV5_Oqb2SH_cQ_oYkuGhvw6Qfk8LryTipaq6FUEDbwAIlbLy0gslHevxzRvS-7fHtbQckstsnsTAbw96hliSuS_b_iTk9QpbB3RAtFntLeCDbw31AhuYJN2AnaF6BBvTQco81F9n7PC7OQcQyWNZk9LWMSQpltZbtdnP1xXrCEVmKbCWXVGHYBYGz4S6_tRSwjK-SGbJqecRoO3Mx2KlcpoDz9_wLBx9LikMBAAA=))

```svelte
<script>
	let count = $state(0);
	let message = $state('hello');

	$inspect({ count, message }); // will console.log when `count` or `message` change
</script>

<button onclick={() => count++}>Increment</button>
<input bind:value={message} />
```

また、コールバックが提供される場合は、`console.log` の代わりにそのコールバックが実行されます。コールバックの第一引数は現在の値です。
第二引数は `"init"` か `"update"` です。[デモ:](/#H4sIAAAAAAAAE0VP24qDMBD9lSEUqlTqPlsj7ON-w1qojWM3rE5CMmkpkn_fxFL26XBuw5lVTHpGL5rvVdCwoGjEp7WiEvy0mfg7zoyJexOcykrrldOWu556npFBmUAMEnaeB8biozwlJ3k7Td6i4mILVPDGfLgE2cGaUz3rCYqsgZQS9sGO6cq-fLs9j3gNtxu6E9Q1GAcXZcibGY_sBoWXKmuPn1S6o4OnCfAYiF_lmCHmQW39v5raa2A2BIbUrNWvXIttz7bvcIjdFymHCxK39SvZpf8XM-pJ4ygadgHjOf4B8TXIiDoBAAA=)

```svelte
<script>
	let count = $state(0);

	$inspect(count, (count, type) => {
		if (type === 'update') {
			debugger; // or `console.trace`, or whatever you want
		}
	});
</script>

<button onclick={() => count++}>Increment</button>
```

第二引数に `console.trace` を渡すと、ある変更がどこで行われたかを簡単に確認することができます:

```js
// @errors: 2304
$inspect(stuff, console.trace);
```

> `$inspect` は開発時にのみ動作します。

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
