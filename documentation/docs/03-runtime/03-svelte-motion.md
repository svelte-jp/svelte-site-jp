---
title: 'svelte/motion'
---

`svelte/motion` モジュールは、`tweened` と `spring` という2つの関数をエクスポートします。これは書き込み可能なストア(writable store)を作成するためのもので、値がすぐにではなく、`set` と `update` の後に時間の経過とともに変化するものです。

## `tweened`

> EXPORT_SNIPPET: svelte/motion#tweened

tweened ストアは、指定された時間にわたって値を更新します。以下のオプションが利用可能です。

- `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
- `duration` (`number` | `function`, default 400) — tween の持続時間のミリ秒
- `easing` (`function`, default `t => t`) — [イージング関数](/docs/svelte-easing)
- `interpolate` (`function`) — 下記を参照してください

`store.set` と `store.update` は、インスタンス化時に渡されたオプションを上書きする第2引数 `options` を受け取ることができます。

どちらの関数も、tween が完了すると resolve する promise を返します。tween が中断されると、promise は resolve されません。

Svelte は2つの数値、2つの配列、または2つのオブジェクトの間を補間してくれます (配列とオブジェクトが同じ '形状' であり、それらの '子孫' プロパティも数値である限り)。

```svelte
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const size = tweened(1, {
		duration: 300,
		easing: cubicOut
	});

	function handleClick() {
		// this is equivalent to size.update(n => n + 1)
		$size += 1;
	}
</script>

<button on:click={handleClick} style="transform: scale({$size}); transform-origin: 0 0">
	embiggen
</button>
```

初期値が `undefined` または `null` の場合、最初の値の変更はすぐに有効になります。これは、props をベースにした tweend の値があり、コンポーネントの最初のレンダリング時にモーションをかけたくない場合に便利です。

```ts
// @filename: ambient.d.ts
declare global {
	var $size: number;
	var big: number;
}

export {};
// @filename: motion.ts
// ---cut---
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

const size = tweened(undefined, {
	duration: 300,
	easing: cubicOut
});

$: $size = big ? 100 : 10;
```

`interpolate` オプションを指定すると、 _任意の_ 値の間で tween を行うことができます。関数 `(a, b) => t => value` で、`a` は開始値、`b` は目標値、`t` は 0 から 1 の間の数値、`value` は結果です。例えば、[d3-interpolate](https://github.com/d3/d3-interpolate) パッケージを使えば、2つの色の間をスムーズに補間することができます。

```svelte
<script>
	import { interpolateLab } from 'd3-interpolate';
	import { tweened } from 'svelte/motion';

	const colors = ['rgb(255, 62, 0)', 'rgb(64, 179, 255)', 'rgb(103, 103, 120)'];

	const color = tweened(colors[0], {
		duration: 800,
		interpolate: interpolateLab
	});
</script>

{#each colors as c}
	<button style="background-color: {c}; color: white; border: none;" on:click={(e) => color.set(c)}>
		{c}
	</button>
{/each}

<h1 style="color: {$color}">{$color}</h1>
```

## `spring`

> EXPORT_SNIPPET: svelte/motion#spring

`spring` ストアは、`stiffness` と `damping` パラメータに基づいて目標値まで徐々に変化します。`tweened` ストアが一定のタイミングで値を変化させるのに対し、`spring` ストアは既存のベロシティによって決定されるタイミングで変化するため、多くの状況でより自然に見える動きを可能にします。以下のオプションが利用可能です。

- `stiffness` (`number`, default `0.15`) — 0 から 1 の間の値で、高い方が「よりタイトな」スプリングを意味します。
- `damping` (`number`, default `0.8`) — 0 から 1 の間の値で、少ない方が「より弾力のある」スプリングを意味します。
- `precision` (`number`, default `0.01`) — は、スプリングが「止まった」とみなされる閾値を決定します。少ない方がより精密であることを意味します。

上記のオプションは全て spring のモーション中に変更することができ、すぐにその効果に反映されます。

```js
import { spring } from 'svelte/motion';

const size = spring(100);
size.stiffness = 0.3;
size.damping = 0.4;
size.precision = 0.005;
```

[`tweened`](/docs/svelte-motion#tweened) ストアと同様に、`set` と `update` は spring が止まると resolve する promise を返します。

`set` と `update` はどちらも第2引数として `hard` または `soft` プロパティを持つオブジェクトを取ることができます。`{ hard: true }` は対象の値を即座に設定します。`{ soft: n }` は既存の運動量を `n` 秒間保持してから止まります。`{ soft: true }` は `{ soft: 0.5 }` と同等です。

```js
import { spring } from 'svelte/motion';

const coords = spring({ x: 50, y: 50 });
// updates the value immediately
coords.set({ x: 100, y: 200 }, { hard: true });
// preserves existing momentum for 1s
coords.update(
	(target_coords, coords) => {
		return { x: target_coords.x, y: coords.y };
	},
	{ soft: 1 }
);
```

[spring のチュートリアルで完全な例をご覧ください。](https://learn.svelte.jp/tutorial/springs)

```svelte
<script>
	import { spring } from 'svelte/motion';

	const coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);
</script>
```

初期値が `undefined` または `null` の場合、最初の値の変更は `tweened` の場合と同様に即座に有効になります (上記を参照)。

```ts
// @filename: ambient.d.ts
declare global {
	var $size: number;
	var big: number;
}

export {};

// @filename: motion.ts
// ---cut---
import { spring } from 'svelte/motion';

const size = spring();
$: $size = big ? 100 : 10;
```

## Types

> TYPES: svelte/motion
