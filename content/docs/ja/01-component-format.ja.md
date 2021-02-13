---
title: Component format
---

---

コンポーネントは、Svelteアプリケーションを構成するブロックです。これらは `.svelte` ファイルにHTMLのスーパーセットを使って記述されます。

ここで説明される script 、 style 、マークアップのいずれもコンポーネントに必須のものではありません。

```sv
<script>
	// ロジックを記述
</script>

<style>
	/* styleを記述 */
</style>

<!-- 0個以上のマークアップを記述 -->
```

### &lt;script&gt;

`<script>` ブロックは、コンポーネントのインスタンスが生成されるときに実行される JavaScript を含みます。トップレベルで宣言（またはインポート）された変数は、そのコンポーネントのマークアップから '見る' ことができます。 `<script>` には、4つのルールがあります。

##### 1. `export` creates a component prop

---

Svelte では、 変数の宣言を *prop* （*プロパティ*）としてマークするために `export` キーワードを使います。これによってそのコンポーネントを使用する際にその変数にアクセスできるようになります（より詳しい情報は [属性と props ](docs#Attributes_and_props)を見てください）。

```sv
<script>
	export let foo;

	// propsとして渡された変数は、
	// 即座に使用可能になります
	console.log({ foo });
</script>
```

---

prop はデフォルトの初期値を指定することができます。これはコンポーネントの初期化時に prop が指定されていない場合（または初期値が `undefined` の場合）に使用されます。prop を削除すると、その値は初期値ではなく `undefined` になることに注意してください。

development モード（[コンパイラオプション](docs#svelte_compile)を参照）では、 デフォルトの初期値が指定されておらず、使用時に値を指定していない場合警告が表示されます。この警告を解消するためには、たとえ　`undefined` であっても初期値を指定してください。

```sv
<script>
	export let bar = 'optional default initial value';
	export let baz = undefined;
</script>
```

---

`const`、 `class`、 または `function` をエクスポートする場合、コンポーネントの外からは読み取り専用になります。ただし、関数（function）の *式* は props です。

```sv
<script>
	// これらは読み取り専用です
	export const thisIs = 'readonly';

	export function greet(name) {
		alert(`hello ${name}!`);
	}

	// これはpropです
	export let format = n => n.toFixed(2);
</script>
```

---

予約語も prop の名前として使用することができます。

```sv
<script>
	let className;

	// `class` は予約語ですが、
	// `class` プロパティを作ることができます
	export { className as class };
</script>
```

##### 2. 代入は'リアクティブ'

---

コンポーネントの状態を変更して再レンダリングをトリガーするために必要なのは、ローカルで宣言された変数に代入することだけです。

更新式 (`count += 1`) とプロパティの代入 (`obj.x = y`) には同じ効果があります。

Svelteのリアクティビティは代入に基づいているため、`.push()` や `.splice()` のような配列のメソッドを使用しても自動的に更新をトリガーしません。これを回避する方法は[チュートリアル](tutorial/updating-arrays-and-objects)に記載しています。

```sv
<script>
	let count = 0;

	function handleClick () {
		// マークアップが `count` を参照している場合、
		// この関数を呼び出すと更新がトリガーされます
		count = count + 1;
	}
</script>
```

##### 3. `$:` はステートメントがリアクティブであることを示す

---

トップレベルの（つまりブロック内や関数内でない）ステートメントは `$:` という [JS ラベル構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/label) のプレフィックスをつけることでリアクティブにできます。リアクティブステートメントは依存する値が変更されるたび、コンポーネント更新の直前に実行されます。

```sv
<script>
	export let title;

	// これは `title` prop が変わるたびに
	// `document.title` を更新します
	$: document.title = title;

	$: {
		console.log(`複数のステートメントをまとめることができます`);
		console.log(`現在のタイトルは ${title}`);
	}
</script>
```

---

`$:` のブロック内に直接現れる値だけがリアクティブステートメントの依存関係になります。例えば次のコードで `total` は `x` が変更された時にのみ更新され、`y` では更新されません。

```sv
<script>
	let x = 0;
	let y = 0;
	
	function yPlusAValue(value) {
		return value + y;
	}
	
	$: total = yPlusAValue(x);
</script>

Total: {total}
<button on:click={() => x++}>
	Increment X
</button>

<button on:click={() => y++}>
	Increment Y
</button>
```

---

宣言されていない変数への代入だけでステートメントが構成されている場合、Svelte はあなたの代わりに `let` 宣言を挿入します。

```sv
<script>
	export let num;

	// `squared` や `cubed` を宣言する必要はありません
	// — Svelte がやってくれます
	$: squared = num * num;
	$: cubed = squared * num;
</script>
```

##### 4. ストアに`$`接頭辞を付けて値にアクセスする

---

*ストア*は、シンプルな*ストア契約*(store contract)を介して値へのリアクティブなアクセスを可能にするオブジェクトです。[`svelte/store` モジュール](docs#svelte_store)にはこの契約を満たす最小限のストア実装が含まれています。

ストアへの参照を持っているときはいつでも、`$`を接頭辞として付けることで、コンポーネント内からその値にアクセスできます。これによってSvelteは接頭辞付きの変数を宣言し、ストアのサブスクリプションを設定します。このサブスクリプションは適切なタイミングで解除されます。

`$`接頭辞が付いた変数に代入するには、その変数が書き込み可能なストアである必要があります。また、代入時にはストアの `.set`メソッドが呼び出されます。 

ストアはコンポーネントのトップレベルで宣言しなければならないことに注意してください - 例えば、`if`ブロックや関数の中では宣言できません。

(ストア値を表すものではない)ローカル変数には、`$`接頭辞を付けてはいけません。

```sv
<script>
	import { writable } from 'svelte/store';

	const count = writable(0);
	console.log($count); // logs 0

	count.set(1);
	console.log($count); // logs 1

	$count = 2;
	console.log($count); // logs 2
</script>
```

##### Store contract

```js
store = { subscribe: (subscription: (value: any) => void) => (() => void), set?: (value: any) => void }
```

You can create your own stores without relying on [`svelte/store`](docs#svelte_store), by implementing the *store contract*:

1. A store must contain a `.subscribe` method, which must accept as its argument a subscription function. This subscription function must be immediately and synchronously called with the store's current value upon calling `.subscribe`. All of a store's active subscription functions must later be synchronously called whenever the store's value changes.
2. The `.subscribe` method must return an unsubscribe function. Calling an unsubscribe function must stop its subscription, and its corresponding subscription function must not be called again by the store.
3. A store may *optionally* contain a `.set` method, which must accept as its argument a new value for the store, and which synchronously calls all of the store's active subscription functions. Such a store is called a *writable store*.

For interoperability with RxJS Observables, the `.subscribe` method is also allowed to return an object with an `.unsubscribe` method, rather than return the unsubscription function directly. Note however that unless `.subscribe` synchronously calls the subscription (which is not required by the Observable spec), Svelte will see the value of the store as `undefined` until it does.


### &lt;script context="module"&gt;

---

A `<script>` tag with a `context="module"` attribute runs once when the module first evaluates, rather than for each component instance. Values declared in this block are accessible from a regular `<script>` (and the component markup) but not vice versa.

You can `export` bindings from this block, and they will become exports of the compiled module.

You cannot `export default`, since the default export is the component itself.

> Variables defined in `module` scripts are not reactive — reassigning them will not trigger a rerender even though the variable itself will update. For values shared between multiple components, consider using a [store](docs#svelte_store).

```sv
<script context="module">
	let totalComponents = 0;

	// this allows an importer to do e.g.
	// `import Example, { alertTotal } from './Example.svelte'`
	export function alertTotal() {
		alert(totalComponents);
	}
</script>

<script>
	totalComponents += 1;
	console.log(`total number of times this component has been created: ${totalComponents}`);
</script>
```


### &lt;style&gt;

---

`<style>` ブロック内の CSS は、そのコンポーネントにスコープされます。

これは、影響を受ける要素にクラスを追加することで動作し、そのクラスはコンポーネントのスタイルのハッシュに基づいています (例えば `svelte-123xyz`)。

```sv
<style>
	p {
		/* これはこのコンポーネントの <p> 要素にのみ影響します */
		color: burlywood;
	}
</style>
```

---

スタイルをグローバルなセレクタに適用するには、`:global(...)`修飾子を使用します。

```sv
<style>
	:global(body) {
		/* これは <body> に適用されます */
		margin: 0;
	}

	div :global(strong) {
		/*
			これは、このコンポーネント内の <div> 要素の中にある
			すべての <strong> 要素に適用されます
		*/
		color: goldenrod;
	}
</style>
```

---

グローバルにアクセスできる @keyframe を作りたい場合は、キーフレーム名の前に `-global-` を付ける必要があります。

コンパイル時に `-global-` の部分は削除され、キーフレームはコード内の他の箇所では `my-animation-name` だけを使って参照されます。

```html
<style>
	@keyframes -global-my-animation-name {...}
</style>
```
