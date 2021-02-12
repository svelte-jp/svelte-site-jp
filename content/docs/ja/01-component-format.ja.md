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

development モード（[コンパイラオプション](docs#svelte_compile)を参照）では、 デフォルトの初期値が指定されておらず、使用時に値を渡していない場合警告が表示されます。この警告を解消するためには、たとえ　`undefined` であっても初期値を指定してください。

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

##### 2. Assignments are 'reactive'

---

To change component state and trigger a re-render, just assign to a locally declared variable.

Update expressions (`count += 1`) and property assignments (`obj.x = y`) have the same effect.

Because Svelte's reactivity is based on assignments, using array methods like `.push()` and `.splice()` won't automatically trigger updates. Options for getting around this can be found in the [tutorial](tutorial/updating-arrays-and-objects).

```sv
<script>
	let count = 0;

	function handleClick () {
		// calling this function will trigger an
		// update if the markup references `count`
		count = count + 1;
	}
</script>
```

##### 3. `$:` marks a statement as reactive

---

Any top-level statement (i.e. not inside a block or a function) can be made reactive by prefixing it with the `$:` [JS label syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label). Reactive statements run immediately before the component updates, whenever the values that they depend on have changed.

```sv
<script>
	export let title;

	// this will update `document.title` whenever
	// the `title` prop changes
	$: document.title = title;

	$: {
		console.log(`multiple statements can be combined`);
		console.log(`the current title is ${title}`);
	}
</script>
```

---

Only values which directly appear within the `$:` block will become dependencies of the reactive statement. For example, in the code below `total` will only update when `x` changes, but not `y`.

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

If a statement consists entirely of an assignment to an undeclared variable, Svelte will inject a `let` declaration on your behalf.

```sv
<script>
	export let num;

	// we don't need to declare `squared` and `cubed`
	// — Svelte does it for us
	$: squared = num * num;
	$: cubed = squared * num;
</script>
```

##### 4. Prefix stores with `$` to access their values

---

A *store* is an object that allows reactive access to a value via a simple *store contract*. The [`svelte/store` module](docs#svelte_store) contains minimal store implementations which fulfil this contract.

Any time you have a reference to a store, you can access its value inside a component by prefixing it with the `$` character. This causes Svelte to declare the prefixed variable, and set up a store subscription that will be unsubscribed when appropriate.

Assignments to `$`-prefixed variables require that the variable be a writable store, and will result in a call to the store's `.set` method.

Note that the store must be declared at the top level of the component — not inside an `if` block or a function, for example.

Local variables (that do not represent store values) must *not* have a `$` prefix.

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

CSS inside a `<style>` block will be scoped to that component.

This works by adding a class to affected elements, which is based on a hash of the component styles (e.g. `svelte-123xyz`).

```sv
<style>
	p {
		/* this will only affect <p> elements in this component */
		color: burlywood;
	}
</style>
```

---

To apply styles to a selector globally, use the `:global(...)` modifier.

```sv
<style>
	:global(body) {
		/* this will apply to <body> */
		margin: 0;
	}

	div :global(strong) {
		/* this will apply to all <strong> elements, in any
			 component, that are inside <div> elements belonging
			 to this component */
		color: goldenrod;
	}
</style>
```

---

If you want to make @keyframes that are accessible globally, you need to prepend your keyframe names with `-global-`.

The `-global-` part will be removed when compiled, and the keyframe then be referenced using just `my-animation-name` elsewhere in your code.

```html
<style>
	@keyframes -global-my-animation-name {...}
</style>
```
