---
title: Svelte components
---

コンポーネントは、Svelteアプリケーションを構成するブロックです。これらは `.svelte` ファイルにHTMLのスーパーセットを使って記述されます。

ここで説明される script 、 style 、マークアップのいずれもコンポーネントに必須のものではありません。

```svelte
<script>
	// ロジックを記述
</script>

<!-- 0個以上のマークアップを記述 -->

<style>
	/* styleを記述 */
</style>
```

## &lt;script&gt;

`<script>` ブロックは、コンポーネントのインスタンスが生成されるときに実行される JavaScript を含みます。トップレベルで宣言（またはインポート）された変数は、そのコンポーネントのマークアップから '見る' ことができます。 `<script>` には、4つのルールがあります。

### 1. `export` creates a component prop

Svelte では、変数の宣言を _プロパティ_（ _prop_ ）としてマークするために `export` キーワードを使います。これによってそのコンポーネントを使用する際にその変数にアクセスできるようになります（詳細は [属性とプロパティ](/docs/basic-markup#attributes-and-props) セクションをご覧ください）。

```svelte
<script>
	export let foo;

	// プロパティとして渡された変数は、
	// すぐに使うことができます
	console.log({ foo });
</script>
```

プロパティにはデフォルトの初期値を指定することができます。この初期値は、コンポーネントの初期化時にプロパティを指定しなかった場合（または初期値が `undefined` の場合）に使用されます。後でコンポーネントのプロパティの値を更新するときにデフォルトの初期値を持つプロパティに値が指定されない場合、そのプロパティの値は初期値ではなく `undefined` になることにご注意ください。

development モード ([コンパイラオプション](/docs/svelte-compiler#compile)を参照) では、コンポーネントを使用する際にプロパティに値を渡していない、かつデフォルトの初期値が指定されていない場合に警告が表示されます。この警告を解消するには、デフォルトの初期値に、たとえ `undefined` であっても指定する必要があります。

```svelte
<script>
	export let bar = 'optional default initial value';
	export let baz = undefined;
</script>
```

`const` や `class`、`function` をエクスポートすると、コンポーネントの外からは読み取り専用になります。ただし、以下で示すように、関数は有効なプロパティ値(valid prop values)です。

```svelte
<!--- file: App.svelte --->
<script>
	// これらは読み取り専用です
	export const thisIs = 'readonly';

	/** @param {string} name */
	export function greet(name) {
		alert(`hello ${name}!`);
	}

	// これはプロパティです
	export let format = (n) => n.toFixed(2);
</script>
```

読み取り専用のプロパティは要素のプロパティとしてアクセスでき、[`bind:this` 構文](/docs/component-directives#bind-this) を使用してコンポーネントに結び付けられます。

予約語もプロパティの名前として使用することができます。

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {string} */
	let className;

	// `class` は予約語ですが、
	// `class` プロパティを作ることができます
	export { className as class };
</script>
```

### 2. Assignments are 'reactive'

コンポーネントの状態を変更して再レンダリングをトリガーするために必要なのは、ローカルで宣言された変数に代入することだけです。

更新式 (`count += 1`) とプロパティの代入 (`obj.x = y`) には同じ効果があります。

```svelte
<script>
	let count = 0;

	function handleClick() {
		// マークアップが `count` を参照している場合、
		// この関数を呼び出すと更新がトリガーされます
		count = count + 1;
	}
</script>
```

Svelteのリアクティビティは代入に基づいているため、`.push()` や `.splice()` のような配列のメソッドを使用しても自動的に更新をトリガーしません。更新をトリガーするにはそれに続いて代入する必要があります。詳細については[チュートリアル](https://learn.svelte.jp/tutorial/updating-arrays-and-objects)をご覧ください。

```svelte
<script>
	let arr = [0, 1];

	function handleClick() {
		// this method call does not trigger an update
		arr.push(2);
		// this assignment will trigger an update
		// if the markup references `arr`
		arr = arr;
	}
</script>
```

Svelteの `<script>` ブロックはコンポーネントが作成されたときにのみ実行されるため、`<script>` ブロック内の代入は、プロパティの更新時に自動で再実行されません。プロパティの変更を追跡したい場合は、次のセクションの例をご覧ください。

```svelte
<script>
	export let person;
	// this will only set `name` on component creation
	// it will not update when `person` does
	let { name } = person;
</script>
```

### 3. `$:` marks a statement as reactive

トップレベルの（つまりブロック内や関数内でない）ステートメントは `$:` という [JS ラベル構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/label) の接頭辞をつけることでリアクティブにできます。リアクティブステートメントは、他のスクリプトコードの後、かつコンポーネントのマークアップがレンダリングされる前に実行されます。また、依存する値が変更されるたびにも実行されます。

```svelte
<script>
	export let title;
	export let person;

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

`$:` のブロック内に直接現れる値だけが、リアクティブステートメントの依存(dependencies)になります。例えば次のコードで `total` は `x` が変更された時にのみ更新され、`y` では更新されません。

```svelte
<!--- file: App.svelte --->
<script>
	let x = 0;
	let y = 0;

	/** @param {number} value */
	function yPlusAValue(value) {
		return value + y;
	}

	$: total = yPlusAValue(x);
</script>

Total: {total}
<button on:click={() => x++}> Increment X </button>

<button on:click={() => y++}> Increment Y </button>
```

リアクティブブロックは、コンパイル時にシンプルな静的解析によって順序付けられます。コンパイラが見るのはブロック自体に割り当てられる変数・使用される変数だけで、呼び出される関数の中にある変数までは見ないということを覚えておくのが大事です。つまり、以下の例では、`x` が更新されたとき、`yDependent` は更新されないということです。

```svelte
<script>
	let x = 0;
	let y = 0;

	/** @param {number} value */
	function setY(value) {
		y = value;
	}

	$: yDependent = y;
	$: setY(x);
</script>
```

`$: yDependent = y` という行を `$: setY(x)` の下に移動させると、`x` が更新されたときに `yDependent` が更新されるようになります。

ステートメント全体が、宣言されていない変数への代入で構成されている場合、Svelte はあなたの代わりに `let` 宣言を注入します。

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {number} */
	export let num;

	// `squared` や `cubed` を宣言する必要はありません
	// — Svelte がやってくれます
	$: squared = num * num;
	$: cubed = squared * num;
</script>
```

### 4. Prefix stores with `$` to access their values

_ストア(store)_ は、シンプルな _ストアコントラクト(store contract)_ を介して、値へのリアクティブなアクセスを可能にするオブジェクトです。[`svelte/store` モジュール](/docs/svelte-store) にはこのコントラクト(contract)を満たす最小限のストアの実装があります。

ストアへの参照を持っているときはいつでも、`$`を接頭辞として付けることで、コンポーネント内からその値にアクセスできます。これによってSvelteは接頭辞付きの変数を宣言し、ストアのサブスクリプションを設定します。このサブスクリプションは適切なタイミングで解除されます。

`$`接頭辞が付いた変数に代入するには、その変数が書き込み可能なストアである必要があります。また、代入時にはストアの `.set`メソッドが呼び出されます。 

ストアはコンポーネントのトップレベルで宣言しなければいけないことに注意してください。例えば、`if`ブロックや関数の中では宣言できません。

(ストア値ではない)ローカル変数には、`$` 接頭辞を付けてはいけません。

```svelte
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

#### Store contract

```ts
// @noErrors
store = { subscribe: (subscription: (value: any) => void) => (() => void), set?: (value: any) => void }
```

_ストアコントラクト(store contract)_ を実装すれば、[`svelte/store`](/docs/svelte-store) に依存しない独自のストアを作ることができます:

1. ストアは、サブスクリプション関数を引数に取る `.subscribe` メソッドを持つ必要があります。このサブスクリプション関数は、`.subscribe` が呼ばれたら即座に・同期的に、ストアの現在の値を渡して呼び出されるようにする必要があります。ストアのアクティブなサブスクリプション関数は全て、ストアの値が変更されるたびに同期的に呼び出される必要があります。
2. `.subscribe` メソッドは、サブスクリプションを解除する関数 (unsubscribe function) を返す必要があります。サブスクリプションを解除する関数が呼ばれたら、そのサブスクリプションを停止し、それに対応するサブスクリプション関数がそのストアから呼び出されないようにする必要があります。
3. ストアは _オプションで_ `.set` メソッドを持つことができます。`.set` メソッドは、引数としてストアの新しい値を受けとる必要があり、全てのアクティブなサブスクリプション関数を同期的に呼び出します。このようなストアは _書き込み可能なストア (writable store)_ と呼ばれます。

RxJS の Observables との相互運用性のため、`.subscribe` メソッドはサブスクリプションを解除する関数を直接返すのではなく、`.unsubscribe` メソッドを持つオブジェクトを返すこともできます。ただし、`.subscribe` が同期的にサブスクリプションを呼び出さない限り(これはObservableの仕様で要求されていませんが)、サブスクリプションを呼び出すまでは、Svelte がストアの値を `undefined` とみなすことに注意してください。

## &lt;script context="module"&gt;

`context="module"` 属性をもつ `<script>` タグは、コンポーネントインスタンスごとではなく、モジュールが最初に評価するときに1回実行されます。このブロックで宣言された値は、通常の `<script>`（およびコンポーネントのマークアップ）からアクセスできますが、その逆はできません。

このブロックからバインディングを `export` でき、それらはコンパイルされたモジュールのエクスポートになります。

デフォルトのエクスポートはコンポーネント自体であるため、`export default` はできません。

> `module` script で定義された変数はリアクティブではありません。つまり、変数の再代入は、変数自体の更新はしますが、再レンダリングのトリガーにはなりません。複数のコンポーネント間で共有される値については、[ストア(store)](/docs/svelte-store)の使用を検討してください。

```svelte
<script context="module">
	let totalComponents = 0;

	// the export keyword allows this function to imported with e.g.
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

## &lt;style&gt;

`<style>` ブロック内の CSS は、そのコンポーネントにスコープされます。

これは、影響を受ける要素にクラスを追加することで動作し、そのクラスはコンポーネントのスタイルのハッシュに基づいています (例えば `svelte-123xyz`)。

```svelte
<style>
	p {
		/* これはこのコンポーネントの <p> 要素にのみ影響します */
		color: burlywood;
	}
</style>
```

スタイルをグローバルなセレクタに適用するには、`:global(...)`修飾子を使用します。

```svelte
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
			 最初はマークアップに現れず、実行時に追加された場合
			 でも）。これは要素の classList プロパティを直接
			 更新するなど、要素のクラスが動的に適用されるときに
			 便利です。 */
	}
</style>
```

グローバルにアクセスできる @keyframes を作りたい場合は、keyframe の名前の前に `-global-` を付ける必要があります。

コンパイル時に `-global-` の部分は削除され、キーフレームはコード内の他の箇所では `my-animation-name` だけを使って参照されます。

```svelte
<style>
	@keyframes -global-my-animation-name {
		/* code goes here */
	}
</style>
```

トップレベルの `<style>` タグは、1 つのコンポーネントにつき 1 つだけにしなければなりません。

ただし、他の要素や論理ブロックの中に `<style>` タグを入れ子にすることは可能です。

その場合、 `<style>` タグはそのまま DOM に挿入され、 `<style>` タグのスコープや処理は行われません。

```svelte
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
