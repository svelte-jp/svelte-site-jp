---
title: Component format
---

---

Components are the building blocks of Svelte applications. They are written into `.svelte` files, using a superset of HTML.

All three sections — script, styles and markup — are optional.

```sv
<script>
	// logic goes here
</script>

<style>
	/* styles go here */
</style>

<!-- markup (zero or more items) goes here -->
```

### &lt;script&gt;

A `<script>` block contains JavaScript that runs when a component instance is created. Variables declared (or imported) at the top level are 'visible' from the component's markup. There are four additional rules:

##### 1. `export` creates a component prop

---

Svelte uses the `export` keyword to mark a variable declaration as a *property* or *prop*, which means it becomes accessible to consumers of the component (see the section on [attributes and props](docs#Attributes_and_props) for more information).

```sv
<script>
	export let foo;

	// Values that are passed in as props
	// are immediately available
	console.log({ foo });
</script>
```

---

You can specify a default initial value for a prop. It will be used if the component's consumer doesn't specify the prop on the component (or if its initial value is `undefined`) when instantiating the component. Note that whenever a prop is removed by the consumer, its value is set to `undefined` rather than the initial value.

In development mode (see the [compiler options](docs#svelte_compile)), a warning will be printed if no default initial value is provided and the consumer does not specify a value. To squelch this warning, ensure that a default initial value is specified, even if it is `undefined`.

```sv
<script>
	export let bar = 'optional default initial value';
	export let baz = undefined;
</script>
```

---

If you export a `const`, `class` or `function`, it is readonly from outside the component. Function *expressions* are valid props, however.

```sv
<script>
	// these are readonly
	export const thisIs = 'readonly';

	export function greet(name) {
		alert(`hello ${name}!`);
	}

	// this is a prop
	export let format = n => n.toFixed(2);
</script>
```

---

You can use reserved words as prop names.

```sv
<script>
	let className;

	// creates a `class` property, even
	// though it is a reserved word
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

##### 4. ストアに`$`接頭辞を付けて値にアクセスする

---

*ストア*は、シンプルな*ストアコントラクト*(store contract)を介して値へのリアクティブなアクセスを可能にするオブジェクトです。[`svelte/store` モジュール](docs#svelte_store)にはこのコントラクト(contract)を満たす最小限のストア実装が含まれています。

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

##### ストアコントラクト(Store contract)

```js
store = { subscribe: (subscription: (value: any) => void) => (() => void), set?: (value: any) => void }
```

*ストアコントラクト*(store contract)を実装することで、[`svelte/store`](docs#svelte_store)に依存せずに独自のストアを作ることができます。

1. ストアは `.subscribe` メソッドを含まなければならず、その引数としてサブスクリプション関数を受けとる必要があります。このサブスクリプション関数は `.subscribe` が呼ばれたらストアの現在の値と同期して即座に呼び出されなければいけません。ストアのアクティブなサブスクリプション関数は全て、ストアの値が変更されるたびに同期して呼び出されなければいけません。
2. `.subscribe` メソッドはサブスクリプションを解除する関数を返さなければなりません。サブスクリプションを解除する関数が呼ばれたら、そのサブスクリプションを停止してそれに対応するサブスクリプション関数がそのストアから再び呼び出されないようにしなければいけません。
3. ストアはオプションで `.set` メソッドを含むことができ、その引数としてストアの新しい値を受けとる必要があります。このメソッドは全てのアクティブなサブスクリプション関数を同期的に呼び出します。このようなストアを *書き込み可能なストア* (writable store) と呼びます。

RxJSのObservablesとの相互運用性のため、`.subscribe` メソッドはサブスクリプションを解除する関数を直接返すのではなく、`.unsubscribe` メソッドを使用してオブジェクトを返すこともできます。ただし、`.subscribe` が同期的にサブスクリプションを呼び出さない限り(これはObservableの仕様で要求されていませんが)、Svelteはストアの値を `undefined` とみなすことに注意してください。


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
