---
title: Run time
---


### `svelte`

`svelte` パッケージは、[ライフサイクル関数](tutorial/onmount) と [コンテキストAPI](tutorial/context-api) を公開します。

#### `onMount`

```js
onMount(callback: () => void)
```
```js
onMount(callback: () => () => void)
```

---

`onMount` 関数は、コンポーネントが DOM にマウントされるとすぐに実行されるコールバックをスケジュールします。これはコンポーネントの初期化中に呼び出されなければなりません (ただし、コンポーネントの *内部* に存在する必要はありません。外部モジュールから呼び出すことができます)。

`onMount` は [サーバーサイドコンポーネント](docs#Server-side_component_API) の内部では実行されません。

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

>この挙動は、`onMount` に渡された関数が *同期的に* 値を返す場合にのみ動作します。`async` の関数は常に `Promise` を返すため、*同期的に* 値を返すことはできません。

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

#### `createEventDispatcher`

```js
dispatch: ((name: string, detail?: any) => void) = createEventDispatcher();
```

---

[コンポーネントイベント](docs＃on_component_event) のディスパッチに使用できるイベントディスパッチャーを作成します。 イベントディスパッチャーは、 `name` と ` detail` の2つの引数を取る関数です。 

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

The `svelte/store` module exports functions for creating [readable](docs#readable), [writable](docs#writable) and [derived](docs#derived) stores.

Keep in mind that you don't *have* to use these functions to enjoy the [reactive `$store` syntax](docs#4_Prefix_stores_with_$_to_access_their_values) in your components. Any object that correctly implements `.subscribe`, unsubscribe, and (optionally) `.set` is a valid store, and will work both with the special syntax, and with Svelte's built-in [`derived` stores](docs#derived).

This makes it possible to wrap almost any other reactive state handling library for use in Svelte. Read more about the [store contract](docs#Store_contract) to see what a correct implementation looks like.

#### `writable`

```js
store = writable(value: any)
```
```js
store = writable(value: any, (set: (value: any) => void) => () => void)
```

---

Function that creates a store which has values that can be set from 'outside' components. It gets created as an object with additional `set` and `update` methods.

`set` is a method that takes one argument which is the value to be set. The store value gets set to the value of the argument if the store value is not already equal to it.

`update` is a method that takes one argument which is a callback. The callback takes the existing store value as its argument and returns the new value to be set to the store.

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

If a function is passed as the second argument, it will be called when the number of subscribers goes from zero to one (but not from one to two, etc). That function will be passed a `set` function which changes the value of the store. It must return a `stop` function that is called when the subscriber count goes from one to zero.

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

#### `readable`

```js
store = readable(value: any, (set: (value: any) => void) => () => void)
```

---

Creates a store whose value cannot be set from 'outside', the first argument is the store's initial value.

The second argument to `readable` is the same as the second argument to `writable`, except that it is required with `readable` (since otherwise there would be no way to update the store value).

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

Derives a store from one or more other stores. Whenever those dependencies change, the callback runs.

In the simplest version, `derived` takes a single store, and the callback returns a derived value.

```js
import { derived } from 'svelte/store';

const doubled = derived(a, $a => $a * 2);
```

---

The callback can set a value asynchronously by accepting a second argument, `set`, and calling it when appropriate.

In this case, you can also pass a third argument to `derived` — the initial value of the derived store before `set` is first called.

```js
import { derived } from 'svelte/store';

const delayed = derived(a, ($a, set) => {
	setTimeout(() => set($a), 1000);
}, 'one moment...');
```

---

If you return a function from the callback, it will be called when a) the callback runs again, or b) the last subscriber unsubscribes.

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

In both cases, an array of arguments can be passed as the first argument instead of a single store.

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

Generally, you should read the value of a store by subscribing to it and using the value as it changes over time. Occasionally, you may need to retrieve the value of a store to which you're not subscribed. `get` allows you to do so.

> This works by creating a subscription, reading the value, then unsubscribing. It's therefore not recommended in hot code paths.

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
* `duration` (`number`, default 400) — トゥイーンの持続時間のミリ秒
* `easing` (`function`, default `t => t`) — [イージング関数](docs#svelte_easing)
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

初期値が `undefined` または `null` の場合、最初の値の変更はすぐに有効になります。これは、props をベースにしたトゥイーン値を設定していて、コンポーネントの最初のレンダリング時にモーションをかけたくない場合に便利です。

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

[`tweened`](docs#tweened) ストアと同様に、`set` と `update` はスプリングが止まれば resolve する promise を返します。`store.stiffness` と `store.damping` プロパティはスプリングが動いている間に変更することができ、すぐに効果を発揮します。

`set` と `update` はどちらも第2引数として `hard` または `soft` プロパティを持つオブジェクトを取ることができます。`{ hard: true }` は対象の値を即座に設定します。`{ soft: n }` は既存の運動量を `n` 秒間保持してから止まります。`{ soft: true }` は `{ soft: 0.5 }` と同等です。

[スプリングチュートリアルの例を参照してください。](tutorial/spring)

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

`svelte/transition` モジュールは7つの関数をエクスポートします。`fade`、`blur`、`fly`、 `slide`、`scale`、`draw`、`crossfade` の7つの関数をエクスポートします。これらは Svelte [`transitions`](docs#transition_fn) で使用します。

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
* `easing` (`function`, default `linear`) — [イージング関数](docs#svelte_easing)

[トランジション チュートリアル](tutorial/transition) で `fade` トランジションの動作を見ることができます。

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

Animates a `blur` filter alongside an element's opacity.

`blur` accepts the following parameters:

* `delay` (`number`, default 0) — milliseconds before starting
* `duration` (`number`, default 400) — milliseconds the transition lasts
* `easing` (`function`, default `cubicInOut`) — an [easing function](docs#svelte_easing)
* `opacity` (`number`, default 0) - the opacity value to animate out to and in from
* `amount` (`number`, default 5) - the size of the blur in pixels

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

Animates the x and y positions and the opacity of an element. `in` transitions animate from an element's current (default) values to the provided values, passed as parameters. `out` transitions animate from the provided values to an element's default values.

`fly` accepts the following parameters:

* `delay` (`number`, default 0) — milliseconds before starting
* `duration` (`number`, default 400) — milliseconds the transition lasts
* `easing` (`function`, default `cubicOut`) — an [easing function](docs#svelte_easing)
* `x` (`number`, default 0) - the x offset to animate out to and in from
* `y` (`number`, default 0) - the y offset to animate out to and in from
* `opacity` (`number`, default 0) - the opacity value to animate out to and in from

You can see the `fly` transition in action in the [transition tutorial](tutorial/adding-parameters-to-transitions).

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

Slides an element in and out.

`slide` accepts the following parameters:

* `delay` (`number`, default 0) — milliseconds before starting
* `duration` (`number`, default 400) — milliseconds the transition lasts
* `easing` (`function`, default `cubicOut`) — an [easing function](docs#svelte_easing)

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

Animates the opacity and scale of an element. `in` transitions animate from an element's current (default) values to the provided values, passed as parameters. `out` transitions animate from the provided values to an element's default values.

`scale` accepts the following parameters:

* `delay` (`number`, default 0) — milliseconds before starting
* `duration` (`number`, default 400) — milliseconds the transition lasts
* `easing` (`function`, default `cubicOut`) — an [easing function](docs#svelte_easing)
* `start` (`number`, default 0) - the scale value to animate out to and in from
* `opacity` (`number`, default 0) - the opacity value to animate out to and in from

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

Animates the stroke of an SVG element, like a snake in a tube. `in` transitions begin with the path invisible and draw the path to the screen over time. `out` transitions start in a visible state and gradually erase the path. `draw` only works with elements that have a `getTotalLength` method, like `<path>` and `<polyline>`.

`draw` accepts the following parameters:

* `delay` (`number`, default 0) — milliseconds before starting
* `speed` (`number`, default undefined) - the speed of the animation, see below.
* `duration` (`number` | `function`, default 800) — milliseconds the transition lasts
* `easing` (`function`, default `cubicInOut`) — an [easing function](docs#svelte_easing)

The `speed` parameter is a means of setting the duration of the transition relative to the path's length. It is modifier that is applied to the length of the path: `duration = length / speed`. A path that is 1000 pixels with a speed of 1 will have a duration of `1000ms`, setting the speed to `0.5` will double that duration and setting it to `2` will halve it.

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


<!-- Crossfade is coming soon... -->



### `svelte/animate`

`svelte/animate` モジュールは、Svelte [animations](docs#animate_fn) で使用するための関数を1つエクスポートします。

#### `flip`

```sv
animate:flip={params}
```

`flip` 関数は要素の開始位置と終了位置を計算し、その間で `x` と `y` の値を変換してアニメーションを行います。`flip` は [First, Last, Invert, Invert, Play] の略です(https://aerotwist.com/blog/flip-your-animations/)。

`flip` は以下のパラメータを受け付けます。

* `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
* `duration` (`number` | `function`, default `d => Math.sqrt(d) * 120`) — 下記を参照してください
* `easing` (`function`, default `cubicOut`) — [イージング関数](docs#svelte_easing)


`duration` は、以下のいずれかを指定することができます。

- `number` はミリ秒単位です。
- 関数 `distance: number => duration: number` は、要素の移動距離をピクセル単位で受け取り、ミリ秒単位で返します。これにより、各要素の持続時間に対する移動距離を割り当てることができます。

---

[アニメーションのチュートリアル](tutorial/animate) で全ての例を見ることができます。


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

Easing functions specify the rate of change over time and are useful when working with Svelte's built-in transitions and animations as well as the tweened and spring utilities. `svelte/easing` contains 31 named exports, a `linear` ease and 3 variants of 10 different easing functions: `in`, `out` and `inOut`.

You can explore the various eases using the [ease visualiser](examples#easing) in the [examples section](examples).


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

To render Svelte components in Node.js without bundling, use `require('svelte/register')`. After that, you can use `require` to include any `.svelte` file.

```js
require('svelte/register');

const App = require('./App.svelte').default;

...

const { html, css, head } = App.render({ answer: 42 });
```

> The `.default` is necessary because we're converting from native JavaScript modules to the CommonJS modules recognised by Node. Note that if your component imports JavaScript modules, they will fail to load in Node and you will need to use a bundler instead.

To set compile options, or to use a custom file extension, call the `register` hook as a function:

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

A client-side component — that is, a component compiled with `generate: 'dom'` (or the `generate` option left unspecified) is a JavaScript class.

```js
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// assuming App.svelte contains something like
		// `export let answer`:
		answer: 42
	}
});
```

The following initialisation options can be provided:

| option | default | description |
| --- | --- | --- |
| `target` | **none** | An `HTMLElement` to render to. This option is required
| `anchor` | `null` | A child of `target` to render the component immediately before
| `props` | `{}` | An object of properties to supply to the component
| `hydrate` | `false` | See below
| `intro` | `false` | If `true`, will play transitions on initial render, rather than waiting for subsequent state changes

Existing children of `target` are left where they are.


---

The `hydrate` option instructs Svelte to upgrade existing DOM (usually from server-side rendering) rather than creating new elements. It will only work if the component was compiled with the [`hydratable: true` option](docs#svelte_compile). Hydration of `<head>` elements only works properly if the server-side rendering code was also compiled with `hydratable: true`, which adds a marker to each element in the `<head>` so that the component knows which elements it's responsible for removing during hydration.

Whereas children of `target` are normally left alone, `hydrate: true` will cause any children to be removed. For that reason, the `anchor` option cannot be used alongside `hydrate: true`.

The existing DOM doesn't need to match the component — Svelte will 'repair' the DOM as it goes.

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

Programmatically sets props on an instance. `component.$set({ x: 1 })` is equivalent to `x = 1` inside the component's `<script>` block.

Calling this method schedules an update for the next microtask — the DOM is *not* updated synchronously.

```js
component.$set({ answer: 42 });
```

#### `$on`

```js
component.$on(event, callback)
```

---

Causes the `callback` function to be called whenever the component dispatches an `event`.

A function is returned that will remove the event listener when called.

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

Removes a component from the DOM and triggers any `onDestroy` handlers.

#### Component props

```js
component.prop
```
```js
component.prop = value
```

---

If a component is compiled with `accessors: true`, each instance will have getters and setters corresponding to each of the component's props. Setting a value will cause a *synchronous* update, rather than the default async update caused by `component.$set(...)`.

By default, `accessors` is `false`, unless you're compiling as a custom element.

```js
console.log(app.count);
app.count += 1;
```


### Custom element API

---

Svelte components can also be compiled to custom elements (aka web components) using the `customElement: true` compiler option. You should specify a tag name for the component using the `<svelte:options>` [element](docs#svelte_options).

```sv
<svelte:options tag="my-element" />

<script>
	export let name = 'world';
</script>

<h1>Hello {name}!</h1>
<slot></slot>
```

---

Alternatively, use `tag={null}` to indicate that the consumer of the custom element should name it.

```js
import MyElement from './MyElement.svelte';

customElements.define('my-element', MyElement);
```

---

Once a custom element has been defined, it can be used as a regular DOM element:

```js
document.body.innerHTML = `
	<my-element>
		<p>This is some slotted content</p>
	</my-element>
`;
```

---

By default, custom elements are compiled with `accessors: true`, which means that any [props](docs#Attributes_and_props) are exposed as properties of the DOM element (as well as being readable/writable as attributes, where possible).

To prevent this, add `accessors={false}` to `<svelte:options>`.

```js
const el = document.querySelector('my-element');

// get the current value of the 'name' prop
console.log(el.name);

// set a new value, updating the shadow DOM
el.name = 'everybody';
```

Custom elements can be a useful way to package components for consumption in a non-Svelte app, as they will work with vanilla HTML and JavaScript as well as [most frameworks](https://custom-elements-everywhere.com/). There are, however, some important differences to be aware of:

* Styles are *encapsulated*, rather than merely *scoped*. This means that any non-component styles (such as you might have in a `global.css` file) will not apply to the custom element, including styles with the `:global(...)` modifier
* Instead of being extracted out as a separate .css file, styles are inlined into the component as a JavaScript string
* Custom elements are not generally suitable for server-side rendering, as the shadow DOM is invisible until JavaScript loads
* In Svelte, slotted content renders *lazily*. In the DOM, it renders *eagerly*. In other words, it will always be created even if the component's `<slot>` element is inside an `{#if ...}` block. Similarly, including a `<slot>` in an `{#each ...}` block will not cause the slotted content to be rendered multiple times
* The `let:` directive has no effect
* Polyfills are required to support older browsers



### Server-side component API

```js
const result = Component.render(...)
```

---

Unlike client-side components, server-side components don't have a lifespan after you render them — their whole job is to create some HTML and CSS. For that reason, the API is somewhat different.

A server-side component exposes a `render` method that can be called with optional props. It returns an object with `head`, `html`, and `css` properties, where `head` contains the contents of any `<svelte:head>` elements encountered.

You can import a Svelte component directly into Node using [`svelte/register`](docs#svelte_register).

```js
require('svelte/register');

const App = require('./App.svelte').default;

const { head, html, css } = App.render({
	answer: 42
});
```
