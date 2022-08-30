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

<!-- 0個以上のマークアップを記述 -->

<style>
	/* styleを記述 */
</style>
```

### &lt;script&gt;

`<script>` ブロックは、コンポーネントのインスタンスが生成されるときに実行される JavaScript を含みます。トップレベルで宣言（またはインポート）された変数は、そのコンポーネントのマークアップから '見る' ことができます。 `<script>` には、4つのルールがあります。

#### 1. `export` creates a component prop

---

Svelte では、 変数の宣言を *プロパティ*（*prop*）としてマークするために `export` キーワードを使います。これによってそのコンポーネントを使用する際にその変数にアクセスできるようになります（より詳しい情報は [属性とプロパティ](/docs#template-syntax-attributes-and-props)を見てください）。

```sv
<script>
	export let foo;

	// プロパティとして渡された変数は、
	// 即座に使用可能になります
	console.log({ foo });
</script>
```

---

プロパティはデフォルトの初期値を指定することができます。これはコンポーネントの初期化時にプロパティが指定されていない場合（または初期値が `undefined` の場合）に使用されます。プロパティを削除すると、その値は初期値ではなく `undefined` になることに注意してください。

development モード（[コンパイラオプション](/docs#compile-time-svelte-compile)を参照）では、 デフォルトの初期値が指定されておらず、使用時に値を指定していない場合警告が表示されます。この警告を解消するためには、たとえ `undefined` であってもデフォルトの初期値を指定してください。

```sv
<script>
	export let bar = 'optional default initial value';
	export let baz = undefined;
</script>
```

---

`const` や `class`、`function` をエクスポートすると、コンポーネントの外からは読み取り専用になります。ただし、以下で示すように、関数は有効なプロパティ値(valid prop values)です。

```sv
<script>
	// これらは読み取り専用です
	export const thisIs = 'readonly';

	export function greet(name) {
		alert(`hello ${name}!`);
	}

	// これはプロパティです
	export let format = n => n.toFixed(2);
</script>
```

読み取り専用のプロパティは要素のプロパティとしてアクセスでき、[`bind:this` 構文](/docs#template-syntax-component-directives-bind-this) を使用してコンポーネントに結び付けられます。

---

予約語もプロパティの名前として使用することができます。

```sv
<script>
	let className;

	// `class` は予約語ですが、
	// `class` プロパティを作ることができます
	export { className as class };
</script>
```

#### 2. Assignments are 'reactive'(代入は'リアクティブ')

---

コンポーネントの状態を変更して再レンダリングをトリガーするために必要なのは、ローカルで宣言された変数に代入することだけです。

更新式 (`count += 1`) とプロパティの代入 (`obj.x = y`) には同じ効果があります。

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

---

Svelteのリアクティビティは代入に基づいているため、`.push()` や `.splice()` のような配列のメソッドを使用しても自動的に更新をトリガーしません。これを回避する方法は[チュートリアル](/tutorial/updating-arrays-and-objects)に記載しています。

```sv
<script>
	let arr = [0, 1];

	function handleClick () {
		// this method call does not trigger an update
		arr.push(2);
		// this assignment will trigger an update
		// if the markup references `arr`
		arr = arr
	}
</script>
```

---

Svelteの `<script>` ブロックはコンポーネントが作成されたときのみ実行されるため、`<script>` ブロック内の代入は、プロパティの更新時に自動で再実行されません。プロパティの変更を追跡したい場合は、次のセクションの例をご覧ください。

```sv
<script>
	export let person;
	// this will only set `name` on component creation
	// it will not update when `person` does
	let { name } = person;
</script>
```

#### 3. `$:` marks a statement as reactive

---

トップレベルの（つまりブロック内や関数内でない）ステートメントは `$:` という [JS ラベル構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/label) の接頭辞をつけることでリアクティブにできます。リアクティブステートメントは、他のスクリプトコードの後、かつコンポーネントのマークアップがレンダリングされる前に実行されます。また、依存する値が変更されるたびにも実行されます。

```sv
<script>
	export let title;
	export let person

	// これは `title` プロパティが変わるたびに
	// `document.title` を更新します
	$: document.title = title;

	$: {
		console.log(`複数のステートメントをまとめることができます`);
		console.log(`現在のタイトルは ${title}`);
	}

	// this will update `name` when 'person' changes
	$: ({ name } = person);

	// don't do this. it will run before the previous line
	let name2 = name;
</script>
```

---

`$:` のブロック内に直接現れる値だけが、リアクティブステートメントが依存しているものになります。例えば次のコードで `total` は `x` が変更された時にのみ更新され、`y` では更新されません。

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

#### 4. Prefix stores with `$` to access their values

---

*ストア*は、シンプルな*ストアコントラクト*(store contract)を介して値へのリアクティブなアクセスを可能にするオブジェクトです。[`svelte/store` モジュール](/docs#run-time-svelte-store)にはこのコントラクト(contract)を満たす最小限のストア実装が含まれています。

ストアへの参照を持っているときはいつでも、`$`を接頭辞として付けることで、コンポーネント内からその値にアクセスできます。これによってSvelteは接頭辞付きの変数を宣言し、ストアのサブスクリプションを設定します。このサブスクリプションは適切なタイミングで解除されます。

`$`接頭辞が付いた変数に代入するには、その変数が書き込み可能なストアである必要があります。また、代入時にはストアの `.set`メソッドが呼び出されます。 

ストアはコンポーネントのトップレベルで宣言しなければいけないことに注意してください。例えば、`if`ブロックや関数の中では宣言できません。

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

*ストアコントラクト*(store contract)を実装することで、[`svelte/store`](/docs#run-time-svelte-store)に依存せずに独自のストアを作ることができます。

1. ストアは `.subscribe` メソッドを含まなければならず、その引数としてサブスクリプション関数を受けとる必要があります。このサブスクリプション関数は `.subscribe` が呼ばれたらストアの現在の値と同期して即座に呼び出されなければいけません。ストアのアクティブなサブスクリプション関数は全て、ストアの値が変更されるたびに同期して呼び出されなければいけません。
2. `.subscribe` メソッドはサブスクリプションを解除する関数を返さなければいけません。サブスクリプションを解除する関数が呼ばれたら、そのサブスクリプションを停止してそれに対応するサブスクリプション関数がそのストアから再び呼び出されないようにしなければいけません。
3. ストアは*オプションで* `.set` メソッドを含むことができます。`.set` メソッドは、引数としてストアの新しい値を受けとる必要があり、全てのアクティブなサブスクリプション関数を同期的に呼び出します。このようなストアは *書き込み可能なストア* (writable store) と呼ばれます。

RxJSのObservablesとの相互運用性のため、`.subscribe` メソッドはサブスクリプションを解除する関数を直接返すのではなく、`.unsubscribe` メソッドを持つオブジェクトを返すこともできます。ただし、`.subscribe` が同期的にサブスクリプションを呼び出さない限り(これはObservableの仕様で要求されていませんが)、サブスクリプションを呼び出すまでは、Svelte がストアの値を `undefined` とみなすことに注意してください。


### &lt;script context="module"&gt;

---

`context="module"` 属性をもつ `<script>` タグは、コンポーネントインスタンスごとではなく、モジュールが最初に評価するときに1回実行されます。このブロックで宣言された値は、通常の `<script>`（およびコンポーネントのマークアップ）からアクセスできますが、その逆はできません。

このブロックからバインディングを `export` でき、それらはコンパイルされたモジュールのエクスポートになります。

デフォルトのエクスポートはコンポーネント自体であるため、`export default` はできません。

> `module` スクリプトで定義された変数はリアクティブではありません。つまり、変数の再代入は、変数自体の更新はしますが、再レンダリングのトリガーにはなりません。複数のコンポーネント間で共有される値については、[ストア](/docs#run-time-svelte-store)の使用を検討してください。

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
		/* これは、このコンポーネント内の <div> 要素の中にある
			 任意のコンポーネント内の <strong> 要素に
			 適用されます */
		color: goldenrod;
	}

	p:global(.red) {
		/* これは、このコンポーネントに属し、red クラスを持つ
			 すべての <p> 要素に適用されます（class="red" が
			 最初のマークアップに現れず、実行時に追加された場合
			 でも）。これは要素の classList プロパティを直接
			 更新するなど、要素のクラスが動的に適用されるときに
			 便利です。 */
	}
</style>
```

---

グローバルにアクセスできる @keyframes を作りたい場合は、キーフレーム名の前に `-global-` を付ける必要があります。

コンパイル時に `-global-` の部分は削除され、キーフレームはコード内の他の箇所では `my-animation-name` だけを使って参照されます。

```html
<style>
	@keyframes -global-my-animation-name {...}
</style>
```

---

トップレベルの `<style>` タグは、1 つのコンポーネントにつき 1 つだけでなければなりません。

ただし、他の要素や論理ブロックの中に `<style>` タグを入れ子にすることは可能です。

その場合、 `<style>` タグはそのまま DOM に挿入され、 `<style>` タグのスコープや処理は行われません。

```html
<div>
	<style>
		/* この style タグはそのまま挿入されます */
		div {
			/* これは DOM 内のすべての `<div>` 要素に適用されます */
			color: red;
		}
	</style>
</div>
```
