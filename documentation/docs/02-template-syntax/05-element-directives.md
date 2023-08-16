---
title: Element directives
---

要素には、属性と同じように _ディレクティブ(directives)_ を持たせることができます。これによって要素の動作を制御します。

## on:_eventname_

```svelte
on:eventname={handler}
```

```svelte
on:eventname|modifiers={handler}
```

DOM イベントをリッスンするには `on:` ディレクティブを使用します。

```svelte
<!--- file: App.svelte --->
<script>
	let count = 0;

	/** @param {MouseEvent} event */
	function handleClick(event) {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	count: {count}
</button>
```

ハンドラはパフォーマンスを低下させることなくインラインで宣言できます。 属性と同様、ディレクティブの値はシンタックスハイライトのために引用符で囲むことができます。

```svelte
<button on:click={() => (count += 1)}>
	count: {count}
</button>
```

`|` の文字を使って DOM イベントに _修飾子(modifiers)_ を追加します。

```svelte
<form on:submit|preventDefault={handleSubmit}>
	<!-- `submit` イベントのデフォルトの動作が止められているため
	     ページはリロードされません -->
</form>
```

次の修飾子を使用できます:

- `preventDefault` — ハンドラを実行する前に `event.preventDefault()` を呼び出します
- `stopPropagation` — `event.stopPropagation()` を呼び出し、イベントが次の要素に到達するのを防ぎます
- `stopImmediatePropagation` - `event.stopImmediatePropagation()` を呼び出し、同じイベントの他のリスナーが呼び出されるのを防ぎます
- `passive` — タッチ/ホイールイベントのスクロールパフォーマンスを向上させます（Svelte は自動的に追加しても安全な箇所に追加します）
- `nonpassive` — 明示的に `passive: false` を設定します
- `capture` — _バブリング(bubbling)_ フェーズではなく _キャプチャ(capture)_ フェーズ中にハンドラを実行します
- `once` — ハンドラが最初に実行された後、そのハンドラを削除します
- `self` — `event.target` がその要素自体だった場合のみハンドラをトリガします
- `trusted` — `event.isTrusted` が `true` の場合にのみハンドラをトリガします。つまり、ユーザーのアクションによってイベントがトリガされた場合です。

修飾子は連鎖させることができます。例 `on:click|once|capture={...}`

`on:` ディレクティブが値なしで使用された場合、コンポーネントはイベントを _転送(forward)_ します。つまりコンポーネントを使用する側がイベントをリッスンできます。

```svelte
<button on:click> コンポーネント自体がクリックイベントを発火します </button>
```

同じイベントに対して複数のイベントリスナを持つことができます。

```svelte
<!--- file: App.svelte --->
<script>
	let counter = 0;
	function increment() {
		counter = counter + 1;
	}

	/** @param {MouseEvent} event */
	function track(event) {
		trackEvent(event);
	}
</script>

<button on:click={increment} on:click={track}>Click me!</button>
```

## bind:_property_

```svelte
bind:property={variable}
```

データは通常、親から子へと流れていきます。`bind:` ディレクティブにより、データを子から親へと逆方向に流すことができます。ほとんどのバインディングは特定の要素に固有のものです。

もっともシンプルなバインディングは、`input.value` のようなプロパティの値を反映します。

```svelte
<input bind:value={name} />
<textarea bind:value={text} />

<input type="checkbox" bind:checked={yes} />
```

名前が値と一致する場合は、省略形を使用できます。

```svelte
<input bind:value />
<!-- equivalent to
<input bind:value={value} />
-->
```

数値の入力値は強制されます。つまり、DOM に関する限り `input.value` は文字列ですが、Svelte はそれを数値として扱います。入力が empty や 無効な値の場合 (`type="number"` であれば) 値は `undefined` になります。

```svelte
<input type="number" bind:value={num} />
<input type="range" bind:value={num} />
```

`type="file"` である `<input>` 要素では、[選択ファイルの `FileList`](https://developer.mozilla.org/ja/docs/Web/API/FileList) を取得するために `bind:files` を使用できます。これは読み取り専用です。

```svelte
<label for="avatar">Upload a picture:</label>
<input accept="image/png, image/jpeg" bind:files id="avatar" name="avatar" type="file" />
```

`bind:` ディレクティブと `on:` ディレクティブを一緒に使用する場合、イベントハンドラが呼ばれた際には、定義された順番がバインドされた変数の値に影響します。

```svelte
<script>
	let value = 'Hello World';
</script>

<input
	on:input={() => console.log('Old value:', value)}
	bind:value
	on:input={() => console.log('New value:', value)}
/>
```

ここではテキストの input の値を、`input` イベントを使用してバインドしています。他の要素のバインディングでは、例えば `change` などの異なるイベントが使用されることになります。

## Binding `<select>` value

`<select>` 値のバインディングは、選択された `<option>` の `value` プロパティに対応しており、(通常の DOM のように文字列だけでなく)どんな値でも設定できます。

```svelte
<select bind:value={selected}>
	<option value={a}>a</option>
	<option value={b}>b</option>
	<option value={c}>c</option>
</select>
```

`<select multiple>` 要素はチェックボックスのグループと同様の動作になります。バインドされる変数は、選択される各 `<option>` の `value` プロパティに対応するエントリーの配列です。

```svelte
<select multiple bind:value={fillings}>
	<option value="Rice">Rice</option>
	<option value="Beans">Beans</option>
	<option value="Cheese">Cheese</option>
	<option value="Guac (extra)">Guac (extra)</option>
</select>
```

`<option>` の値がテキスト内容と一致する場合、`value` 属性は省略できます。

```svelte
<select multiple bind:value={fillings}>
	<option>Rice</option>
	<option>Beans</option>
	<option>Cheese</option>
	<option>Guac (extra)</option>
</select>
```

`contenteditable` 属性を持つ要素は以下のバインディングをサポートします:

- [`innerHTML`](https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML)
- [`innerText`](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/innerText)
- [`textContent`](https://developer.mozilla.org/ja/docs/Web/API/Node/textContent)

それぞれ少し違いがありますので、詳細は[こちら](https://developer.mozilla.org/ja/docs/Web/API/Node/textContent#Differences_from_innerText)をお読みください。

```svelte
<div contenteditable="true" bind:innerHTML={html} />
```

`<details>` 要素は `open` プロパティのバインディングをサポートします。

```svelte
<details bind:open={isOpen}>
	<summary>Details</summary>
	<p>Something small enough to escape casual notice.</p>
</details>
```

## Media element bindings

Media 要素 (`<audio>` と `<video>`) には、独自のバインディングのセットがあります — 7つの _読み取り専用(readonly)_ バインディングと…

- `duration` (readonly) — 動画の総再生時間(秒単位)です
- `buffered` (readonly) —  `{start, end}` オブジェクトの配列です
- `played` (readonly) — 同上
- `seekable` (readonly) — 同上
- `seeking` (readonly) — boolean
- `ended` (readonly) — boolean
- `readyState` (readonly) — 0 から 4 までの数値

…そして5つの _双方向(two-way)_ バインディングがあります。

- `currentTime` — 動画の現在の再生時間、秒単位です
- `playbackRate` — どれぐらい早く、または遅く動画を再生するか、1 が '通常値' です
- `paused` — これは自明のはずです
- `volume` — 0 から 1 の間の値です
- `muted` — booleanの値で、`true` はミュートになります

動画にはさらに、`videoWidth` と `videoHeight` という読み取り専用のバインディングがあります。

```svelte
<video
	src={clip}
	bind:duration
	bind:buffered
	bind:played
	bind:seekable
	bind:seeking
	bind:ended
	bind:readyState
	bind:currentTime
	bind:playbackRate
	bind:paused
	bind:volume
	bind:muted
	bind:videoWidth
	bind:videoHeight
/>
```

## Image element bindings

Image 要素 (`<img>`) には2つの読取専用バインディングがあります:

- `naturalWidth` (readonly) — 画像(image)のオリジナルの width で、画像がロードされたあとに使用することができます。
- `naturalHeight` (readonly) — 画像(image)のオリジナルの height で、画像がロードされたあとに使用することができます。

```svelte
<img
	bind:naturalWidth
	bind:naturalHeight
></img>
```

## Block-level element bindings

ブロックレベル要素は、[この方法](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/)と同様の手法で測定された4つの読み取り専用バインディングを持っています。

- `clientWidth`
- `clientHeight`
- `offsetWidth`
- `offsetHeight`

```svelte
<div bind:offsetWidth={width} bind:offsetHeight={height}>
	<Chart {width} {height} />
</div>
```

## bind:group

```svelte
bind:group={variable}
```

グループ化させる input には `bind:group` を使用できます。

```svelte
<!--- file: App.svelte --->
<script>
	let tortilla = 'Plain';

	/** @type {Array<string>} */
	let fillings = [];
</script>

<!-- こちらのグループ化された radio input は相互に排他的です -->
<input type="radio" bind:group={tortilla} value="Plain" />
<input type="radio" bind:group={tortilla} value="Whole wheat" />
<input type="radio" bind:group={tortilla} value="Spinach" />

<!-- こちらのグループ化された checkbox input は配列にデータを挿入します -->
<input type="checkbox" bind:group={fillings} value="Rice" />
<input type="checkbox" bind:group={fillings} value="Beans" />
<input type="checkbox" bind:group={fillings} value="Cheese" />
<input type="checkbox" bind:group={fillings} value="Guac (extra)" />
```

> `bind:group` は複数の input が同じ Svelte コンポーネントにある場合にのみ機能します。

## bind:this

```svelte
bind:this={dom_node}
```

DOM ノードを参照するには `bind:this` を使用します。

```svelte
<!--- file: App.svelte --->
<script>
	import { onMount } from 'svelte';

	/** @type {HTMLCanvasElement} */
	let canvasElement;

	onMount(() => {
		const ctx = canvasElement.getContext('2d');
		drawStuff(ctx);
	});
</script>

<canvas bind:this={canvasElement} />
```

## class:_name_

```svelte
class:name={value}
```

```svelte
class:name
```

`class:` ディレクティブは要素の class を切り替えるための簡単な方法を提供します。

```svelte
<!-- この2つは同等です -->
<div class={isActive ? 'active' : ''}>...</div>
<div class:active={isActive}>...</div>

<!-- 名前と値が一致する場合の短縮形 -->
<div class:active>...</div>

<!-- 複数のクラスの切り替えを含めることができます -->
<div class:active class:inactive={!active} class:isAdmin>...</div>
```

## style:_property_

```svelte
style:property={value}
```

```svelte
style:property="value"
```

```svelte
style:property
```

`style:` ディレクティブは、要素に対して複数のスタイルをセットするためのショートハンドを提供します。

```svelte
<!-- この2つは同等です -->
<div style:color="red">...</div>
<div style="color: red;">...</div>

<!-- 変数を使用することができます -->
<div style:color={myColor}>...</div>

<!-- プロパティと変数の名前が一致する場合の短縮形 -->
<div style:color>...</div>

<!-- 複数のスタイルを含めることができます -->
<div style:color style:width="12rem" style:background-color={darkMode ? 'black' : 'white'}>...</div>

<!-- スタイルを important としてマークすることができます -->
<div style:color|important="red">...</div>
```

`style:` ディレクティブを `style` 属性と一緒に使用ている場合、`style:` ディレクティブのほうが優先されます。

```svelte
<div style="color: blue;" style:color="red">This will be red</div>
```

## use:_action_

```svelte
use:action
```

```svelte
use:action={parameters}
```

```ts
// @noErrors
action = (node: HTMLElement, parameters: any) => {
	update?: (parameters: any) => void,
	destroy?: () => void
}
```

action は、要素が作成されるときに呼び出される関数です。要素がアンマウントされるときに呼び出される `destroy` メソッドをもつオブジェクトを返すことができます。

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {import('svelte/action').Action}  */
	function foo(node) {
		// the node has been mounted in the DOM

		return {
			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo />
```

action はパラメータを取ることができます。戻り値に `update` メソッドがある場合は、そのパラメータが変化するたびに、Svelte がマークアップに更新を適用した直後に、そのメソッドが呼び出されます。

> すべてのコンポーネントインスタンスに対して `foo` 関数を再宣言していることについて心配する必要はありません。Svelte は、ローカル状態に依存しない関数をコンポーネント定義から巻き上げます。

```svelte
<!--- file: App.svelte --->
<script>
	export let bar;

	/** @type {import('svelte/action').Action}  */
	function foo(node, bar) {
		// the node has been mounted in the DOM

		return {
			update(bar) {
				// the value of `bar` has changed
			},

			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo={bar} />
```

詳細については [`svelte/action`](/docs/svelte-action) ページをご参照ください。

## transition:_fn_

```svelte
transition:fn
```

```svelte
transition:fn={params}
```

```svelte
transition:fn|global
```

```svelte
transition:fn|global={params}
```

```svelte
transition:fn|local
```

```svelte
transition:fn|local={params}
```

```js
// @noErrors
transition = (node: HTMLElement, params: any, options: { direction: 'in' | 'out' | 'both' }) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

トランジションは、状態変化の結果として DOM に出入りする要素によってトリガーされます。

ブロックが外へのトランジションをしているとき、ブロック内のすべての要素（独自のトランジションを持たない要素を含む）は、ブロック内のすべてのトランジジョンが完了するまで DOM に保持されます。

`transition:` ディレクティブは _双方向(bidirectional)_ トランジションであり、トランジションが進行している間でもスムーズに反転させることができます。

```svelte
{#if visible}
	<div transition:fade>fades in and out</div>
{/if}
```

トランジションはデフォルトでローカル(local)です (Svelte 3 では、デフォルトでグローバル(global)でした)。ローカルトランジションは、属するブロックが作成または破棄されるときにのみ再生され、親ブロックが作成または破棄されるときには再生されません。

```svelte
{#if x}
	{#if y}
		<!-- Svelte 3: <p transition:fade|local> -->
		<p transition:fade>fades in and out only when y changes</p>

		<!-- Svelte 3: <p transition:fade> -->
		<p transition:fade|global>fades in and out when x or y change</p>
	{/if}
{/if}
```

> デフォルトでは、イントロトランジションは最初のレンダリングでは再生されません。この動作は、[コンポーネントを作成する](/docs/client-side-component-api)ときに `intro: true` を設定し、トランジションを `global` にマークすることで変更できます。

## Transition parameters

action と同様に、トランジションはパラメータを持つことができます。

(二重の `{{中括弧}}` は特殊な構文ではありません。これは式タグ内のオブジェクトリテラルです)

```svelte
{#if visible}
	<div transition:fade={{ duration: 2000 }}>fades in and out over two seconds</div>
{/if}
```

## Custom transition functions

トランジションはカスタム関数を使うことができます。返されたオブジェクトに `css` 関数があれば、Svelte は要素上で再生される CSS アニメーションを作成します。

`css` に渡される `t` 引数は `easing` 関数を適用した後の `0` から `1` の間の値です。 _in_ トランジションは `0` から `1` まで、_out_ トランジションは `1` から `0` までの間で実行されます — 言い換えれば、`1` はトランジションが適用されていないかのような要素の自然な状態です。 引数 `u` は `1 - t` と等しくなります。

この関数はトランジションが始まる前に、`t` と `u` の引数を変えて繰り返し呼び出されます。

```svelte
<!--- file: App.svelte --->
<script>
	import { elasticOut } from 'svelte/easing';

	/** @type {boolean} */
	export let visible;

	/**
	 * @param {HTMLElement} node
	 * @param {{ delay?: number, duration?: number, easing?: (t: number) => number }} params
	 */
	function whoosh(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t, u) => `transform: ${existingTransform} scale(${t})`
		};
	}
</script>

{#if visible}
	<div in:whoosh>whooshes in</div>
{/if}
```

カスタムのトランジション関数は `tick` 関数を返すこともでき、これはトランジション中に同じ `t` と `u` の引数を取って呼び出されます。

> `tick` の代わりに `css` を使うことが可能ならば、そうしてください — CSS アニメーションはメインスレッドの外で実行することができるため、遅いデバイスでのジャンクを防ぐことができます。

```svelte
<!--- file: App.svelte --->
<script>
	export let visible = false;

	/**
	 * @param {HTMLElement} node
	 * @param {{ speed?: number }} params
	 */
	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

{#if visible}
	<p in:typewriter={{ speed: 1 }}>The quick brown fox jumps over the lazy dog</p>
{/if}
```

トランジションがトランジションオブジェクトではなく関数を返す場合、その関数は次のマイクロタスクで呼び出されます。これにより、複数のトランジションを調整することができ、[クロスフェード効果](https://learn.svelte.dev/tutorial/deferred-transitions) が可能になります。

トランジション関数は3つ目の引数 `options` を取ることができ、これにはトランジションの情報が含まれています。

`options` オブジェクトで利用可能な値は以下の通りです:

- `direction` - トランジションのタイプに応じて、`in`、`out`、`both` のいずれか

## Transition events

トランジションを持つ要素は、標準の DOM イベントに加えて以下のイベントをディスパッチします。

- `introstart`
- `introend`
- `outrostart`
- `outroend`

```svelte
{#if visible}
	<p
		transition:fly={{ y: 200, duration: 2000 }}
		on:introstart={() => (status = 'intro started')}
		on:outrostart={() => (status = 'outro started')}
		on:introend={() => (status = 'intro ended')}
		on:outroend={() => (status = 'outro ended')}
	>
		Flies in and out
	</p>
{/if}
```

## in:_fn_/out:_fn_

```svelte
in:fn
```

```svelte
in:fn={params}
```

```svelte
in:fn|global
```

```svelte
in:fn|global={params}
```

```svelte
in:fn|local
```

```svelte
in:fn|local={params}
```

```svelte
out:fn
```

```svelte
out:fn={params}
```

```svelte
out:fn|global
```

```svelte
out:fn|global={params}
```

```svelte
out:fn|local
```

```svelte
out:fn|local={params}
```

`transition:` に似ていますが、`in:` は DOM に入る要素だけに、`out:` は出る要素だけに適用されます。

`transition:` とは違って、`in:` と `out:` を適用したトランジションは双方向ではありません。つまり、もしトランジションの最中にブロックが外に出された場合、反転するのではなく、in のトランジションは out のトランジションと一緒に「再生」し続けます。out のトランジションが中断された場合、トランジションは最初から再開されます。

```svelte
{#if visible}
	<div in:fly out:fade>flies in, fades out</div>
{/if}
```

## animate:_fn_

```svelte
animate:name
```

```svelte
animate:name={params}
```

```js
// @noErrors
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

```ts
// @noErrors
DOMRect {
	bottom: number,
	height: number,
	​​left: number,
	right: number,
	​top: number,
	width: number,
	x: number,
	y: number
}
```

アニメーションは、[key 付き each ブロック(keyed each block)](/docs/logic-blocks#each) の中身が並び替えられたときに発生します。アニメーションは、要素が追加または削除されたときには実行されず、each ブロックの既存のデータアイテムのインデックスが変更されたときにのみ実行されます。animate ディレクティブは、key 付き each ブロックの _直接の_ 子要素に付けなければいけません。

アニメーションは Svelte の[組み込みアニメーション関数](/docs/svelte-animate) または [カスタムアニメーション関数](/docs/element-directives#custom-animation-functions) を使用することができます。

```svelte
<!-- When `list` is reordered the animation will run-->
{#each list as item, index (item)}
	<li animate:flip>{item}</li>
{/each}
```

## Animation Parameters

action やトランジションと同様に、アニメーションはパラメータを持つことができます。

(二重の `{{中括弧}}` は特殊な構文ではありません。これは式タグ内のオブジェクトリテラルです)

```svelte
{#each list as item, index (item)}
	<li animate:flip={{ delay: 500 }}>{item}</li>
{/each}
```

## Custom animation functions

アニメーションは、`node`、`animation` オブジェクト、および任意の `parameters` を引数に取るカスタム関数を使用することができます。`animation` パラメータは、`from` と `to` プロパティを含むオブジェクトで、それぞれ要素の `start` と `end` の位置におけるジオメトリを記述した [DOMRect](https://developer.mozilla.org/ja/docs/Web/API/DOMRect#Properties) を含みます。`from` プロパティは要素の開始位置の DOMRect であり、`to` プロパティはリストが並び替えられ DOM が更新された後の最終位置の DOMRect です。

返されたオブジェクトが `css` メソッドを持つ場合、Svelte は要素上で再生される CSS アニメーションを作成します。

`css` に渡される `t` 引数は `easing` 関数が適用された後の `0` と `1` の値です。引数 `u` は `1 - t` に等しい値です。

この関数はアニメーションが始まる前に、`t` と `u` の引数を変えて繰り返し呼び出されます。

<!-- TODO: Types -->

```svelte
<!--- file: App.svelte --->
<script>
	import { cubicOut } from 'svelte/easing';

	/**
	 * @param {HTMLElement} node
	 * @param {{ from: DOMRect; to: DOMRect }} states
	 * @param {any} params
	 */
	function whizz(node, { from, to }, params) {
		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			css: (t, u) => `transform: translate(${u * dx}px, ${u * dy}px) rotate(${t * 360}deg);`
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```

カスタムアニメーション関数は `tick` 関数を返すこともでき、これはアニメーションの中に同じ `t` と `u` の引数を取って呼び出されます。

> `tick` の代わりに `css` を使うことが可能ならば、そうしてください — CSS アニメーションはメインスレッドの外で実行することができるため、遅いデバイスでのジャンクを防ぐことができます。

```svelte
<!--- file: App.svelte --->
<script>
	import { cubicOut } from 'svelte/easing';

	/**
	 * @param {HTMLElement} node
	 * @param {{ from: DOMRect; to: DOMRect }} states
	 * @param {any} params
	 */
	function whizz(node, { from, to }, params) {
		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			tick: (t, u) => Object.assign(node.style, { color: t > 0.5 ? 'Pink' : 'Blue' })
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```
