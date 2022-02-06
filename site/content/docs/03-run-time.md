---
title: Run time
---


### `svelte`

`svelte` パッケージは、[ライフサイクル関数](/tutorial/onmount) と [context API](/tutorial/context-api) を公開します。

#### `onMount`

```js
onMount(callback: () => void)
```
```js
onMount(callback: () => () => void)
```

---

`onMount` 関数は、コンポーネントが DOM にマウントされるとすぐに実行されるコールバックをスケジュールします。これはコンポーネントの初期化中に呼び出されなければなりません (ただし、コンポーネントの *内部* に存在する必要はありません。外部モジュールから呼び出すことができます)。

`onMount` は [サーバーサイドコンポーネント](/docs#run-time-server-side-component-api) の内部では実行されません。

```sv
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('the component has mounted');
	});
</script>
```

---

`onMount` から関数が返された場合、コンポーネントがアンマウントされたときに呼び出されます。

```sv
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const interval = setInterval(() => {
			console.log('beep');
		}, 1000);

		return () => clearInterval(interval);
	});
</script>
```

> この挙動は、`onMount` に渡された関数が *同期的に* 値を返す場合にのみ動作します。`async` の関数は常に `Promise` を返すため、*同期的に* 値を返すことはできません。

#### `beforeUpdate`

```js
beforeUpdate(callback: () => void)
```

---

state が変化した後、コンポーネントが更新される直前に実行されるコールバックをスケジュールします。

> コールバックが最初に実行されるのは、初回の `onMount` の前になります。

```sv
<script>
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		console.log('the component is about to update');
	});
</script>
```

#### `afterUpdate`

```js
afterUpdate(callback: () => void)
```

---

コンポーネントが更新された直後に実行するコールバックをスケジュールします。

> コールバック実行が最初に実行されるのは、最初の `onMount` の後です

```sv
<script>
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		console.log('the component just updated');
	});
</script>
```

#### `onDestroy`

```js
onDestroy(callback: () => void)
```

---

コンポーネントがアンマウントされる直前に実行するコールバックをスケジュールします。

`onMount`, `beforeUpdate`, `afterUpdate`, `onDestroy` のうち、サーバサイドコンポーネントの中で動作するのはこれだけです。

```sv
<script>
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		console.log('the component is being destroyed');
	});
</script>
```

#### `tick`

```js
promise: Promise = tick()
```

---

保留中の state の変更が適用されると resolve する promise を返します。もしくは何も保留していない場合に、その次のマイクロタスクで実行されます。

```sv
<script>
	import { beforeUpdate, tick } from 'svelte';

	beforeUpdate(async () => {
		console.log('the component is about to update');
		await tick();
		console.log('the component just updated');
	});
</script>
```

#### `setContext`

```js
setContext(key: any, context: any)
```

---

任意の `context` オブジェクトを現在のコンポーネントと指定された `key` に関連付けます。context は、コンポーネントの子 (スロットコンテンツを含む) が `getContext` で利用できるようになります。

ライフサイクル関数と同様に、これはコンポーネントの初期化時に呼ばれなければなりません。

```sv
<script>
	import { setContext } from 'svelte';

	setContext('answer', 42);
</script>
```

> context は本質的にリアクティブではありません。リアクティブな値が必要な場合は、context にストアを渡すことができます。これはリアクティブになります。

#### `getContext`

```js
context: any = getContext(key: any)
```

---

指定された `key` を持つ、最も近い親コンポーネントに属する context を取得します。コンポーネントの初期化中に呼び出されなければなりません。

```sv
<script>
	import { getContext } from 'svelte';

	const answer = getContext('answer');
</script>
```

#### `hasContext`

```js
hasContext: boolean = hasContext(key: any)
```

---

与えられた `key` が親コンポーネントの context に設定されているかどうかをチェックします。コンポーネントの初期化時に呼び出されなければなりません。

```sv
<script>
	import { hasContext } from 'svelte';

	if (hasContext('answer')) {
		// do something
	}
</script>
```

#### `getAllContexts`

```js
contexts: Map<any, any> = getAllContexts()
```

---

最も近い親コンポーネントにある全ての context マップを取得します。これはコンポーネントの初期化中に呼び出す必要があります。例えば、プログラムでコンポーネントを作成し、既存の context を渡したい場合などに便利です。

```sv
<script>
	import { getAllContexts } from 'svelte';

	const contexts = getAllContexts();
</script>
```

#### `createEventDispatcher`

```js
dispatch: ((name: string, detail?: any) => void) = createEventDispatcher();
```

---

[コンポーネントイベント](/docs＃template-syntax-component-directives-on-eventname) のディスパッチに使用できるイベントディスパッチャーを作成します。 イベントディスパッチャーは、 `name` と ` detail` の2つの引数を取る関数です。 

`createEventDispatcher` で作成されたコンポーネントイベントは [カスタムイベント](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) を作成します。これらのイベントは、[バブリング](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture) せず、`event.preventDefault()` でキャンセルできません。引数 `detail` は [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) プロパティに対応し、任意のタイプのデータを含むことができます。

```sv
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button on:click="{() => dispatch('notify', 'detail value')}">Fire Event</button>
```

---

子コンポーネントからディスパッチされたイベントは、親でリッスンできます。 イベントがディスパッチされたときに提供されたデータはすべて、イベントオブジェクトの `detail`プロパティで利用できます。 

```sv
<script>
	function callbackFunction(event) {
		console.log(`Notify fired! Detail: ${event.detail}`)
	}
</script>

<Child on:notify="{callbackFunction}"/>
```

### `svelte/store`

`svelte/store` モジュールは、[readable](/docs#run-time-svelte-store-readable)、[writable](/docs#run-time-svelte-store-writable)、 [derived](/docs#run-time-svelte-store-derived) ストアを作成するための関数をエクスポートします。

コンポーネントで[リアクティブな `$store` 構文](/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values)を便利に使うために、これらの関数を使用する必要がないことを覚えておいてください。`.subscribe` とそのサブスクライブの解除、（オプションで）`.set` を正しく実装したオブジェクトは有効なストアであり、その特殊な構文と Svelte に組み込まれた [`derived` ストア](/docs#run-time-svelte-store-derived)の両方で機能します。

これにより、Svelte で使用するための、ほぼすべての他のリアクティブ状態を扱うライブラリをラップすることが可能になります。続いて説明する正しい実装がどのようなものか理解するために、[store contract](/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract) も読んでみてください。

#### `writable`

```js
store = writable(value?: any)
```
```js
store = writable(value?: any, start?: (set: (value: any) => void) => () => void)
```

---

「外部」コンポーネントから設定できる値を持つストアを作成する関数。これは、`set` と `update` 関数を併せ持つオブジェクトを作成します。

`set` は、設定する値である1つの引数を受け取る関数です。ストア値が引数の値とまだ等しくない場合、ストア値は引数の値に設定されます。

`update` は、コールバックである1つの引数を受け取る関数です。コールバックは、既存のストア値を引数として受け取り、ストアに設定される新しい値を返します。

```js
import { writable } from 'svelte/store';

const count = writable(0);

count.subscribe(value => {
	console.log(value);
}); // logs '0'

count.set(1); // logs '1'

count.update(n => n + 1); // logs '2'
```

---

関数が第2引数として渡された場合、サブスクライバーの数が0から1になると呼び出されます（ただし、1から2になった場合などには呼び出されません）。その関数には、ストアの値を変更する `set` 関数が渡されます。その関数は、サブスクライバーの数が1から0になったときに呼び出される `stop` 関数を返す必要があります。

```js
import { writable } from 'svelte/store';

const count = writable(0, () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

count.set(1); // does nothing

const unsubscribe = count.subscribe(value => {
	console.log(value);
}); // logs 'got a subscriber', then '1'

unsubscribe(); // logs 'no more subscribers'
```

`writable` の値は、ページが更新されたときなど破棄されると失われるので注意してください。ただし、`localStorage` などに値を同期する独自ロジックを作ることはできます。

#### `readable`

```js
store = readable(value?: any, start?: (set: (value: any) => void) => () => void)
```

---

「外側」から値を設定できないストアを作成します。第1引数はストアの初期値です。`readable` の第2引数は `writable` の第2引数と同じです。

```js
import { readable } from 'svelte/store';

const time = readable(null, set => {
	set(new Date());

	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return () => clearInterval(interval);
});
```

#### `derived`

```js
store = derived(a, callback: (a: any) => any)
```
```js
store = derived(a, callback: (a: any, set: (value: any) => void) => void | () => void, initial_value: any)
```
```js
store = derived([a, ...b], callback: ([a: any, ...b: any[]]) => any)
```
```js
store = derived([a, ...b], callback: ([a: any, ...b: any[]], set: (value: any) => void) => void | () => void, initial_value: any)
```

---

1つ以上の他のストアからストアを派生させます。これらの依存しているものが変化するたびに、コールバックが実行されます。

最もシンプルな例だと、`derived` は単一のストアを受け取り、コールバックは派生値を返します。

```js
import { derived } from 'svelte/store';

const doubled = derived(a, $a => $a * 2);
```

---

コールバックは、第2引数に `set` を受け取り、しかるべき時にそれを呼び出すことで非同期に値を設定できます。

この場合、`derived` に第3引数として、`set` が初めて呼び出される前の派生ストアの初期値を渡すこともできます。

```js
import { derived } from 'svelte/store';

const delayed = derived(a, ($a, set) => {
	setTimeout(() => set($a), 1000);
}, 'one moment...');
```

---

コールバックから関数を返すと、a）コールバックが再度実行される時や b）最後のサブスクライバーがサブスクライブを解除する時に呼び出されます。

```js
import { derived } from 'svelte/store';

const tick = derived(frequency, ($frequency, set) => {
	const interval = setInterval(() => {
	  set(Date.now());
	}, 1000 / $frequency);

	return () => {
		clearInterval(interval);
	};
}, 'one moment...');
```

---

どちらの場合も、第1引数として、ストア1つではなく、引数の配列を渡すことができます。

```js
import { derived } from 'svelte/store';

const summed = derived([a, b], ([$a, $b]) => $a + $b);

const delayed = derived([a, b], ([$a, $b], set) => {
	setTimeout(() => set($a + $b), 1000);
});
```

#### `get`

```js
value: any = get(store)
```

---

通常は、ストアをサブスクライブして、ストア値が切り替わるたびに使用する方法で読み取るほうがよいでしょう。しかし、場合によっては、サブスクライブしていないストア値を取得する必要があります。`get` はそれを可能にします。

> これは、サブスクリプションを作成し、値を読み取ってから、サブスクリプションを解除することで機能します。したがって、ホットコードパスではお勧めしません。

```js
import { get } from 'svelte/store';

const value = get(store);
```


### `svelte/motion`

`svelte/motion` モジュールは、`tweened` と `spring` という2つの関数をエクスポートします。これは書き込み可能なストアを作成するためのもので、値がすぐにではなく、`set` と `update` の後に時間の経過とともに変化するものです。

#### `tweened`

```js
store = tweened(value: any, options)
```

トゥイーンされたストアは、一定の期間にわたって値を更新します。以下のオプションが利用可能です。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `duration` (`number` | `function`, default 400) — トゥイーンの持続時間のミリ秒
* `easing` (`function`, default `t => t`) — [イージング関数](/docs#run-time-svelte-easing)
* `interpolate` (`function`) — 下記を参照してください。

`store.set` と `store.update` は、インスタンス化時に渡されたオプションを上書きする第2引数 `options` を受け取ることができます。

どちらの関数も、トゥイーンが完了すると resolve する promise を返します。トゥイーンが中断されると、promise は resolve されません。

---

Svelte は2つの数値、2つの配列、または2つのオブジェクトの間を補間します(配列とオブジェクトが同じ '形状' であり、それらの '子孫' プロパティも数値である限り)。

```sv
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const size = tweened(1, {
		duration: 300,
		easing: cubicOut
	});

	function handleClick() {
		// これは size.update(n => n + 1) と等価です
		$size += 1;
	}
</script>

<button
	on:click={handleClick}
	style="transform: scale({$size}); transform-origin: 0 0"
>embiggen</button>
```

---

初期値が `undefined` または `null` の場合、最初の値の変更はすぐに有効になります。これは、プロパティをベースにしたトゥイーン値を設定していて、コンポーネントの最初のレンダリング時にモーションをかけたくない場合に便利です。

```js
const size = tweened(undefined, {
	duration: 300,
	easing: cubicOut
});

$: $size = big ? 100 : 10;
```

---

`interpolate` オプションを指定すると、*任意の* 値の間でトゥイーンを行うことができます。関数 `(a, b) => t => value` で、`a` は開始値、`b` は目標値、`t` は 0 から 1 の間の数値、`value` は結果です。例えば、[d3-interpolate](https://github.com/d3/d3-interpolate) パッケージを使えば、2つの色の間をスムーズに補間することができます。

```sv
<script>
	import { interpolateLab } from 'd3-interpolate';
	import { tweened } from 'svelte/motion';

	const colors = [
		'rgb(255, 62, 0)',
		'rgb(64, 179, 255)',
		'rgb(103, 103, 120)'
	];

	const color = tweened(colors[0], {
		duration: 800,
		interpolate: interpolateLab
	});
</script>

{#each colors as c}
	<button
		style="background-color: {c}; color: white; border: none;"
		on:click="{e => color.set(c)}"
	>{c}</button>
{/each}

<h1 style="color: {$color}">{$color}</h1>
```

#### `spring`

```js
store = spring(value: any, options)
```

`spring` ストアは、`stiffness` と `damping` パラメータに基づいて目標値まで徐々に変化します。`tweened` ストアが一定のタイミングで値を変化させるのに対し、`spring` ストアは既存の速度によって決定されるタイミングで変化するため、多くの状況でより自然に見える動きを可能にします。以下のオプションが利用可能です。

* `stiffness` (`number`, default `0.15`) — 0 から 1 の間の値で、高い方が「よりタイトな」スプリングを意味します。
* `damping` (`number`, default `0.8`) — 0 から 1 の間の値で、少ない方が「より弾力のある」スプリングを意味します。
* `precision` (`number`, default `0.001`) — は、スプリングが「止まった」とみなされる閾値を決定します。少ない方がより精密であることを意味します。

---

[`tweened`](/docs#run-time-svelte-motion-tweened) ストアと同様に、`set` と `update` はスプリングが止まれば resolve する promise を返します。`store.stiffness` と `store.damping` プロパティはスプリングが動いている間に変更することができ、すぐに効果を発揮します。

`set` と `update` はどちらも第2引数として `hard` または `soft` プロパティを持つオブジェクトを取ることができます。`{ hard: true }` は対象の値を即座に設定します。`{ soft: n }` は既存の運動量を `n` 秒間保持してから止まります。`{ soft: true }` は `{ soft: 0.5 }` と同等です。

[スプリングチュートリアルの例を参照してください。](/tutorial/spring)

```sv
<script>
	import { spring } from 'svelte/motion';

	const coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25
	});
</script>
```

---

初期値が `undefined` または `null` の場合、最初の値の変更は `tweened` の場合と同様に即座に有効になります (上記を参照)。

```js
const size = spring();
$: $size = big ? 100 : 10;
```

### `svelte/transition`

`svelte/transition` モジュールは7つの関数をエクスポートします。`fade`、`blur`、`fly`、 `slide`、`scale`、`draw`、`crossfade` の7つの関数をエクスポートします。これらは Svelte [`transitions`](/docs#template-syntax-element-directives-transition-fn) で使用します。

#### `fade`

```sv
transition:fade={params}
```
```sv
in:fade={params}
```
```sv
out:fade={params}
```

---

要素の opacity を、`in` トランジションでは 0 から現在の opacity まで、`out` トランジションでは現在の opacity から 0 までアニメーションします。

`fade` は以下のパラメータを受け付けます。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
* `easing` (`function`, default `linear`) — [イージング関数](/docs#run-time-svelte-easing)

[トランジション チュートリアル](/tutorial/transition) で `fade` トランジションの動作を見ることができます。

```sv
<script>
	import { fade } from 'svelte/transition';
</script>

{#if condition}
	<div transition:fade="{{delay: 250, duration: 300}}">
		fades in and out
	</div>
{/if}
```

#### `blur`

```sv
transition:blur={params}
```
```sv
in:blur={params}
```
```sv
out:blur={params}
```

---

要素の opacity で `blur` フィルタをアニメーション化します。

`blur` は以下のパラメータを受け付けます。

* `delay` (`number`, default 0) —開始前の待ち時間のミリ秒
* `duration` (`number`, default 400) — アニメーションの持続時間のミリ秒
* `easing` (`function`, default `cubicInOut`) — [イージング関数](/docs#run-time-svelte-easing)
* `opacity` (`number`, default 0) - アニメーション化する opacity の値
* `amount` (`number`, default 5) - ぼかしのサイズをピクセル単位で表します

```sv
<script>
	import { blur } from 'svelte/transition';
</script>

{#if condition}
	<div transition:blur="{{amount: 10}}">
		fades in and out
	</div>
{/if}
```

#### `fly`

```sv
transition:fly={params}
```
```sv
in:fly={params}
```
```sv
out:fly={params}
```

---

要素の x と y の位置と opacity をアニメーション化します。`in` トランジションは、要素の現在の(デフォルトの)値からパラメータとして渡された値にアニメーションします。`out` トランジションは、指定された値から要素のデフォルト値にアニメーションします。

`fly` は以下のパラメータを受け付けます。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
* `easing` (`function`, default `cubicOut`) — [イージング関数](/docs#run-time-svelte-easing)
* `x` (`number`, default 0) - アニメーションで移動する x 位置のオフセット 
* `y` (`number`, default 0) - アニメーションで移動する y 位置のオフセット
* `opacity` (`number`, default 0) - アニメーションで変化する opacity のオフセット

`fly` トランジションの動作は [トランジション チュートリアル](/tutorial/adding-parameters-to-transitions) で見ることができます。

```sv
<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:fly="{{delay: 250, duration: 300, x: 100, y: 500, opacity: 0.5, easing: quintOut}}">
		flies in and out
	</div>
{/if}
```

#### `slide`

```sv
transition:slide={params}
```
```sv
in:slide={params}
```
```sv
out:slide={params}
```

---

要素をスライドさせて出し入れします。

`slide` は下記のパラメータを受け付けます。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
* `easing` (`function`, default `cubicOut`) — [イージング関数](/docs#run-time-svelte-easing)

```sv
<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:slide="{{delay: 250, duration: 300, easing: quintOut }}">
		slides in and out
	</div>
{/if}
```

#### `scale`

```sv
transition:scale={params}
```
```sv
in:scale={params}
```
```sv
out:scale={params}
```

---

要素の opacity と scale をアニメーション化します。`in` トランジションは、要素の現在の(デフォルトの)値からパラメータとして渡された値にアニメーションします。`out` トランジションは、指定された値から要素のデフォルト値にアニメーションします。

`scale` は以下のパラメータを受け付けます。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
* `easing` (`function`, default `cubicOut`) — [イージング関数](/docs#run-time-svelte-easing)
* `start` (`number`, default 0) - アニメーションで変化する scale の値
* `opacity` (`number`, default 0) - アニメーションで変化する opacity の値

```sv
<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:scale="{{duration: 500, delay: 500, opacity: 0.5, start: 0.5, easing: quintOut}}">
		scales in and out
	</div>
{/if}
```

#### `draw`

```sv
transition:draw={params}
```
```sv
in:draw={params}
```
```sv
out:draw={params}
```

---

SVG 要素のストロークを蛇が管の中を進むようにアニメーション化します。`in` トランジションはパスが見えない状態から始まり、時間の経過とともにパスが画面に描画されます。`out` トランジションはパスが見える状態から始まり、徐々にパスを消していきます。`draw` は `<path>` や `<polyline>` のように `getTotalLength` メソッドを持つ要素でのみ動作します。

`draw` は以下のパラメータを受け付けます。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `speed` (`number`, default undefined) - アニメーションの速度、下記を参照してください
* `duration` (`number` | `function`, default 800) — トランジションの持続時間のミリ秒
* `easing` (`function`, default `cubicInOut`) — [イージング関数](/docs#run-time-svelte-easing)

速度パラメータ `speed` はパスの長さに対する遷移の持続時間を設定する手段です。これはパスの長さに適用される修飾子で `duration = length / speed` となります。1000ピクセルで速度が1のパスの持続時間は `1000ms` であり、速度を `0.5` に設定すると持続時間は2倍になり、`2` に設定すると半分になります。

```sv
<script>
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
	{#if condition}
		<path transition:draw="{{duration: 5000, delay: 500, easing: quintOut}}"
					d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
					fill="none"
					stroke="cornflowerblue"
					stroke-width="0.1px"
					stroke-linejoin="round"
		/>
	{/if}
</svg>

```


#### `crossfade`

`crossfade` 関数は `send` と `receive` という [トランジション](/docs#template-syntax-element-directives-transition-fn)のペアを作成します。ある要素が「送信」されると、それに対応する「受信」される要素を探し、その要素を相手の位置に変換してフェードアウトさせるトランジションを生成します。要素が「受信」されると、その逆が起こります。対応する要素がない場合は、`fallback` トランジションが使用されます。

---

`crossfade` は下のパラメータを受け付けます:

* `delay` (`number`, デフォルト 0) — 開始するまでのミリ秒
* `duration` (`number` | `function`, デフォルト 800) — トランジションが継続するミリ秒
* `easing` (`function`, デフォルト `cubicOut`) — [イージング関数](/docs#run-time-svelte-easing)
* `fallback` (`function`) — 受信している要素に一致するものがない場合の送信時や、送信している要素がない場合の受信時に使用するフォールバック[トランジション](/docs#template-syntax-element-directives-transition-fn)です。

```sv
<script>
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const [send, receive] = crossfade({
		duration:1500,
		easing: quintOut
	});
</script>

{#if condition}
	<h1 in:send={{key}} out:receive={{key}}>BIG ELEM</h1>
{:else}
	<small in:send={{key}} out:receive={{key}}>small elem</small>
{/if}
```


### `svelte/animate`

`svelte/animate` モジュールは、Svelte [animations](/docs#template-syntax-element-directives-animate-fn) で使用するための関数を1つエクスポートします。

#### `flip`

```sv
animate:flip={params}
```

`flip` 関数は要素の開始位置と終了位置を計算し、その間で `x` と `y` の値を変換してアニメーションを行います。`flip` は [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/) の略です。

`flip` は以下のパラメータを受け付けます。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `duration` (`number` | `function`, default `d => Math.sqrt(d) * 120`) — 下記を参照してください
* `easing` (`function`, default `cubicOut`) — [イージング関数](/docs#run-time-svelte-easing)


`duration` は、以下のいずれかを指定することができます。

- `number` はミリ秒単位です。
- 関数 `distance: number => duration: number` は、要素の移動距離をピクセル単位で受け取り、ミリ秒単位で返します。これにより、各要素の持続時間に対する移動距離を割り当てることができます。

---

[アニメーションのチュートリアル](/tutorial/animate) で全ての例を見ることができます。


```sv
<script>
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	let list = [1, 2, 3];
</script>

{#each list as n (n)}
	<div animate:flip="{{delay: 250, duration: 250, easing: quintOut}}">
		{n}
	</div>
{/each}
```



### `svelte/easing`

イージング関数は、時間の経過とともに変化する速度を指定するもので、Svelte に組み込まれたトランジションやアニメーション、tweened や spring ユーティリティの作業をする際に便利です。`svelte/easing` には、31の名前付きエクスポートが含まれています。`linear` イージング、10種類のイージング関数の3つのバリエーション `in`, `out`, `inOut` です。

[examples section](/examples) の [ease visualiser](/examples/easing) で様々なイージングを試してみることができます。


| ease | in | out | inOut |
| --- | --- | --- | --- |
| **back** | `backIn` | `backOut` | `backInOut` |
| **bounce** | `bounceIn` | `bounceOut` | `bounceInOut` |
| **circ** | `circIn` | `circOut` | `circInOut` |
| **cubic** | `cubicIn` | `cubicOut` | `cubicInOut` |
| **elastic** | `elasticIn` | `elasticOut` | `elasticInOut` |
| **expo** | `expoIn` | `expoOut` | `expoInOut` |
| **quad** | `quadIn` | `quadOut` | `quadInOut` |
| **quart** | `quartIn` | `quartOut` | `quartInOut` |
| **quint** | `quintIn` | `quintOut` | `quintInOut` |
| **sine** | `sineIn` | `sineOut` | `sineInOut` |


### `svelte/register`

Svelteコンポーネントをビルドせずに Node.js でレンダリングするには、`require('svelte/register')`を使います。その後 `require` を使って `.svelte` ファイルをインクルードすることができます。

```js
require('svelte/register');

const App = require('./App.svelte').default;

...

const { html, css, head } = App.render({ answer: 42 });
```

> `.default`は、ネイティブの JavaScript モジュールから Node が認識する CommonJS モジュールに変換するために必要です。コンポーネントが JavaScript モジュールをインポートすると、Node での読み込みに失敗するので、代わりにバンドラを使う必要があることに注意してください。

コンパイルオプションを設定したり、カスタムファイルの拡張子を使用したりするには、`register` フックを関数として呼び出します。

```js
require('svelte/register')({
  extensions: ['.customextension'], // defaults to ['.html', '.svelte']
	preserveComments: true
});
```


### Client-side component API

#### Creating a component

```js
const component = new Component(options)
```

クライアントサイドのコンポーネント、つまり `generate: 'dom'`（もしくは `generate` オプションを指定しないまま）でコンパイルされたコンポーネントは JavaScript のクラスです。

```js
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// App.svelte に `export let answer` のようなものが
		// 含まれていると仮定:
		answer: 42
	}
});
```

以下の初期化オプションを与えることができます。

| オプション | デフォルト | 説明 |
| --- | --- | --- |
| `target` | **none** | レンダリング先の `HTMLElement` または `ShadowRoot`。このオプションは必須です
| `anchor` | `null` | `target` の子要素。これのすぐ前にコンポーネントがレンダリングされます
| `props` | `{}` | コンポーネントに渡すプロパティのオブジェクト
| `context` | `new Map()` | コンポーネントに提供するルートレベルの context のキーと値のペアの `Map`
| `hydrate` | `false` | 下記参照
| `intro` | `false` | `true` なら、その後の状態変化を待つのではなく、初回レンダリング時にトランジションを再生します。

`target` の既存の子要素はそのまま残されます。


---

`hydrate` オプションは、新しい要素を作成するのではなく、既存の DOM を（大抵はサーバーサイドレンダリングから）アップグレードするよう Svelte に指示します。これはコンポーネントが [`hydratable: true` のオプション](/docs#compile-time-svelte-compile) でコンパイルされた場合にのみ機能します。`<head>` 要素のハイドレーションは、サーバーサイドレンダリングのコードも `hydratable: true` を使ってコンパイルされた場合にのみ適切に動作します。これは `head` 内の各要素にマーカーを追加して、コンポーネントがハイドレーション中にどの要素を除去すべきかを認識できるようにします。

通常、`target` の子要素はそのまま残されますが、`hydrate: true` ではすべての子要素が削除されます。そのため `anchor` オプションは `hydrate: true` と一緒に使用できません。

既存の DOM はコンポーネントと一致している必要はありません。Svelte は DOM をそのまま「修復」します。

```js
import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered-html'),
	hydrate: true
});
```

#### `$set`

```js
component.$set(props)
```

---

プログラムでインスタンスにプロパティ(props)をセットします。`component.$set({ x: 1 })` はコンポーネントの `<script>` ブロック内の `x = 1` と同じです。

このメソッドを呼ぶと次のマイクロタスクに更新がスケジュールされます。DOM は同期的に更新*されません*。

```js
component.$set({ answer: 42 });
```

#### `$on`

```js
component.$on(event, callback)
```

---

コンポーネントが `event` をディスパッチするたびに、`callback` 関数が呼び出されるようにします。

呼び出されたときにイベントリスナーを削除する関数が返されます。

```js
const off = app.$on('selected', event => {
	console.log(event.detail.selection);
});

off();
```

#### `$destroy`

```js
component.$destroy()
```

DOM からコンポーネントを削除し、すべての `onDestroy` ハンドラをトリガします。

#### Component props

```js
component.prop
```
```js
component.prop = value
```

---

コンポーネントが `accessors: true` でコンパイルされている場合、各インスタンスはコンポーネントの各プロパティ(props)に対するゲッターとセッターを持ちます。値をセットすると（`component.$set(...)` によって起こるデフォルトの非同期更新ではなく）、*同期的な*更新が起こります。

カスタム要素としてコンパイルする場合を除き、デフォルトでは `accessors` は `false` です。

```js
console.log(app.count);
app.count += 1;
```


### Custom element API

---

Svelte コンポーネントは、`customElement: true` コンパイラオプションを使ってカスタム要素 (別名Webコンポーネント) にコンパイルすることもできます。コンポーネントのタグ名は `<svelte:options>` [element](/docs#template-syntax-svelte-options) で指定する必要があります。

```sv
<svelte:options tag="my-element" />

<script>
	export let name = 'world';
</script>

<h1>Hello {name}!</h1>
<slot></slot>
```

---

あるいは、`tag={null}` を使って、カスタム要素の利用者がそれに名前を付けるべきであることを示します。

```js
import MyElement from './MyElement.svelte';

customElements.define('my-element', MyElement);
```

---

一度カスタム要素が定義されると、それを通常の DOM 要素として使用することができます。

```js
document.body.innerHTML = `
	<my-element>
		<p>This is some slotted content</p>
	</my-element>
`;
```

---

デフォルトでは、カスタム要素は `accessors: true` でコンパイルされます。これは、任意の [プロパティ](/docs#template-syntax-attributes-and-props) が DOM 要素のプロパティとして公開されることを意味します (また、可能であれば属性として読み書き可能です)。

これを防ぐには、`<svelte:options>` に `accessors={false}` を追加します。

```js
const el = document.querySelector('my-element');

// get the current value of the 'name' prop
console.log(el.name);

// set a new value, updating the shadow DOM
el.name = 'everybody';
```

カスタム要素は、非Svelteアプリで利用するためのコンポーネントをパッケージ化するのに便利な方法です。それらは純粋な HTML と JavaScript の同様に、[ほとんどのフレームワーク](https://custom-elements-everywhere.com/) でも動作します。しかし、注意すべき重要な違いがいくつかあります。

* スタイルは単なる *scoped* ではなく *encapsulated（カプセル化）* です。これは、`:global(...)` 修飾子を持つスタイルを含む、コンポーネントにはないスタイル (`global.css` ファイルにあるような) はカスタム要素には適用されないことを意味します。
* スタイルは、別の .css ファイルとして抽出されるのではなく、JavaScript の文字列としてコンポーネントにインライン化されます。
* JavaScript が読み込まれるまでシャドウ DOM は見えないので、カスタム要素は一般的にサーバーサイドのレンダリングには適していません。
* Svelte では、スロットコンテンツは *遅延して* レンダリングされます。DOMでは *先行して* レンダリングします。言い換えれば、コンポーネントの `<slot>` 要素が `{#if ...}` ブロックの中にあっても、常に作成されます。同様に、`{#each ...}` ブロックの中に `<slot>` 要素を含めても、スロットの内容が何度もレンダリングされることはありません。
* `let:` ディレクティブは何の効果もありません。
* 古いブラウザをサポートするにはポリフィルが必要です。



### Server-side component API

```js
const result = Component.render(...)
```

---

クライアント側のコンポーネントとは異なり、サーバー側のコンポーネントはレンダリングしてもライフサイクルがありません。-- それらは HTML と CSS を作成するのが仕事です。そのため API が多少異なります。

サーバーサイドコンポーネントは任意のプロパティ(props)と一緒に呼びだせる `render` メソッドを公開しています。これは `head`、 `html`、 `css` プロパティを持つオブジェクトを返します。この `head` は見つけた `<svelte:head>` 要素の内容を含みます。

Svelte コンポーネントを直接 Node にインポートするには、[`svelte/register`](/docs#run-time-svelte-register) を使ってください。

```js
require('svelte/register');

const App = require('./App.svelte').default;

const { head, html, css } = App.render({
	answer: 42
});
```

---

`.render()` メソッドは以下のパラメータを受け付けます:

| パラメータ | デフォルト | 説明 |
| --- | --- | --- |
| `props` | `{}` | コンポーネントに渡すプロパティのオブジェクト
| `options` | `{}` | オプションのオブジェクト

`options` オブジェクトは、以下のオプションを取ります:

| オプション | デフォルト | 説明 |
| --- | --- | --- |
| `context` | `new Map()` | コンポーネントに提供するルートレベルの context のキーと値のペアの `Map`

```js
const { head, html, css } = App.render(
	// props
	{ answer: 42 },
	// options
	{
		context: new Map([['context-key', 'context-value']])
	}
);
```
