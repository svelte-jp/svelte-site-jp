---
title: 'svelte/transition'
---

`svelte/transition` モジュールは `fade`、`blur`、`fly`、 `slide`、`scale`、`draw`、`crossfade` の7つの関数をエクスポートします。これらは Svelte [`transitions`](/docs/element-directives#transition-fn) で使用します。

## `fade`

> EXPORT_SNIPPET: svelte/transition#fade

```svelte
<!--- copy: false --->
transition:fade={params}
```

```svelte
<!--- copy: false --->
in:fade={params}
```

```svelte
<!--- copy: false --->
out:fade={params}
```

要素の opacity を、`in` トランジションでは 0 から現在の opacity まで、`out` トランジションでは現在の opacity から 0 までアニメーションします。

`fade` は以下のパラメータを受け付けます。

- `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
- `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
- `easing` (`function`, default `linear`) — [イージング関数](/docs/svelte-easing)

[transition チュートリアル](https://learn.svelte.jp/tutorial/transition)で `fade` トランジションの動作を見ることができまで `fade` トランジションの動作を見ることができます。

```svelte
<script>
	import { fade } from 'svelte/transition';
</script>

{#if condition}
	<div transition:fade={{ delay: 250, duration: 300 }}>fades in and out</div>
{/if}
```

## `blur`

> EXPORT_SNIPPET: svelte/transition#blur

```svelte
<!--- copy: false --->
transition:blur={params}
```

```svelte
<!--- copy: false --->
in:blur={params}
```

```svelte
<!--- copy: false --->
out:blur={params}
```

要素の opacity に合わせて `blur` フィルタをアニメーション化します。

`blur` は以下のパラメータを受け付けます。

- `delay` (`number`, default 0) —開始前の待ち時間のミリ秒
- `duration` (`number`, default 400) — アニメーションの持続時間のミリ秒
- `easing` (`function`, default `cubicInOut`) — [イージング関数](/docs/svelte-easing)
- `opacity` (`number`, default 0) - アニメーションする opacity の値 (out の場合はこの値に、in の場合はこの値から)
- `amount` (`number | string`, default 5) - ぼかし(blur)のサイズ。css の単位 (例: `"4rem"`) をサポートしています。デフォルトの単位は `px` です

```svelte
<script>
	import { blur } from 'svelte/transition';
</script>

{#if condition}
	<div transition:blur={{ amount: 10 }}>fades in and out</div>
{/if}
```

## `fly`

> EXPORT_SNIPPET: svelte/transition#fly

```svelte
<!--- copy: false --->
transition:fly={params}
```

```svelte
<!--- copy: false --->
in:fly={params}
```

```svelte
<!--- copy: false --->
out:fly={params}
```

要素の x と y の位置と opacity をアニメーション化します。`in` トランジションは、パラメータとして指定された値から要素のデフォルトの値にアニメーションします。`out` トランジションは、要素のデフォルトの値から指定された値にアニメーションします。

`fly` は以下のパラメータを受け付けます。

- `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
- `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
- `easing` (`function`, default `cubicOut`) — [イージング関数](/docs/svelte-easing)
- `x` (`number | string`, default 0) - アニメーションで移動する x 位置のオフセット (out の場合はこの値に、in の場合はこの値から)
- `y` (`number | string`, default 0) - アニメーションで移動する y 位置のオフセット (out の場合はこの値に、in の場合はこの値から)
- `opacity` (`number`, default 0) - アニメーションする opacity の値 (out の場合はこの値に、in の場合はこの値から)

x と y はデフォルトで `px` を使用しますが、css の単位もサポートしています。例えば `x: '100vw'` や `y: '50%'` にすることができます。
`fly` トランジションの動作は [トランジションチュートリアル](https://learn.svelte.jp/tutorial/adding-parameters-to-transitions)で見ることができます。

```svelte
<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div
		transition:fly={{ delay: 250, duration: 300, x: 100, y: 500, opacity: 0.5, easing: quintOut }}
	>
		flies in and out
	</div>
{/if}
```

## `slide`

> EXPORT_SNIPPET: svelte/transition#slide

```svelte
<!--- copy: false --->
transition:slide={params}
```

```svelte
<!--- copy: false --->
in:slide={params}
```

```svelte
<!--- copy: false --->
out:slide={params}
```

要素をスライドさせて出し入れします。

`slide` は下記のパラメータを受け付けます。

- `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
- `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
- `easing` (`function`, default `cubicOut`) — [イージング関数](/docs/svelte-easing)

* `axis` (`x` | `y`, default `y`) — トランジションが発生するモーションの軸

```svelte
<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
		slides in and out horizontally
	</div>
{/if}
```

## `scale`

> EXPORT_SNIPPET: svelte/transition#scale

```svelte
<!--- copy: false --->
transition:scale={params}
```

```svelte
<!--- copy: false --->
in:scale={params}
```

```svelte
<!--- copy: false --->
out:scale={params}
```

要素の opacity と scale をアニメーション化します。`in` トランジションは、要素の現在の(デフォルトの)値からパラメータとして渡された値にアニメーションします。`out` トランジションは、指定された値から要素のデフォルト値にアニメーションします。

`scale` は以下のパラメータを受け付けます。

- `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
- `duration` (`number`, default 400) — トランジションの持続時間のミリ秒
- `easing` (`function`, default `cubicOut`) — [イージング関数](/docs/svelte-easing)
- `start` (`number`, default 0) - アニメーションする scale の値 (out の場合はこの値に、in の場合はこの値から)
- `opacity` (`number`, default 0) - アニメーションする opacity の値 (out の場合はこの値に、in の場合はこの値から)

```svelte
<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:scale={{ duration: 500, delay: 500, opacity: 0.5, start: 0.5, easing: quintOut }}>
		scales in and out
	</div>
{/if}
```

## `draw`

> EXPORT_SNIPPET: svelte/transition#draw

```svelte
<!--- copy: false --->
transition:draw={params}
```

```svelte
<!--- copy: false --->
in:draw={params}
```

```svelte
<!--- copy: false --->
out:draw={params}
```

SVG 要素のストロークを蛇が管の中を進むようにアニメーション化します。`in` トランジションはパスが見えない状態から始まり、時間の経過とともにパスが画面に描画されます。`out` トランジションはパスが見える状態から始まり、徐々にパスを消していきます。`draw` は `<path>` や `<polyline>` のように `getTotalLength` メソッドを持つ要素でのみ動作します。

`draw` は以下のパラメータを受け付けます。

- `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
- `speed` (`number`, default undefined) - アニメーションの速度、下記を参照してください
- `duration` (`number` | `function`, default 800) — トランジションの持続時間のミリ秒
- `easing` (`function`, default `cubicInOut`) — [イージング関数](/docs/svelte-easing)

速度パラメータ `speed` はパスの長さに対する遷移の持続時間を設定する手段です。これはパスの長さに適用される修飾子で `duration = length / speed` となります。1000ピクセルで速度が1のパスの持続時間は `1000ms` であり、速度を `0.5` に設定すると持続時間は2倍になり、`2` に設定すると半分になります。

```svelte
<script>
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
	{#if condition}
		<path
			transition:draw={{ duration: 5000, delay: 500, easing: quintOut }}
			d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
			fill="none"
			stroke="cornflowerblue"
			stroke-width="0.1px"
			stroke-linejoin="round"
		/>
	{/if}
</svg>
```

## `crossfade`

> EXPORT_SNIPPET: svelte/transition#crossfade

`crossfade` 関数は `send` と `receive` という [トランジション](/docs/element-directives#transition-fn)のペアを作成します。ある要素が「送信」されると、それに対応する「受信」される要素を探し、その要素を相手の位置に変換してフェードアウトさせるトランジションを生成します。要素が「受信」されると、その逆が起こります。対応する要素がない場合は、`fallback` トランジションが使用されます。

`crossfade` は下のパラメータを受け付けます:

- `delay` (`number`, default 0) — 開始するまでのミリ秒
- `duration` (`number` | `function`, default 800) — トランジションが継続するミリ秒
- `easing` (`function`, default `cubicOut`) — [イージング関数](/docs/svelte-easing)
- `fallback` (`function`) — 受信している要素に一致するものがない場合の送信時や、送信している要素がない場合の受信時に使用するフォールバック[トランジション](/docs/element-directives#transition-fn)です。

```svelte
<script>
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const [send, receive] = crossfade({
		duration: 1500,
		easing: quintOut
	});
</script>

{#if condition}
	<h1 in:send={{ key }} out:receive={{ key }}>BIG ELEM</h1>
{:else}
	<small in:send={{ key }} out:receive={{ key }}>small elem</small>
{/if}
```

## Types

> TYPES: svelte/transition
