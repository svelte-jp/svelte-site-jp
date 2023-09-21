---
title: 'svelte/animate'
---

`svelte/animate` モジュールは、Svelte [animations](/docs/element-directives#animate-fn) で使用するための関数を1つエクスポートします。

## `flip`

> EXPORT_SNIPPET: svelte/animate#flip

```svelte
<!--- copy: false --->
animate:flip={params}
```

`flip` 関数は要素の開始位置と終了位置を計算し、その間で `x` と `y` の値を変換してアニメーションを行います。`flip` は [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/) の略です。

`flip` は以下のパラメータを受け付けます。

- `delay` (`number`, default 0) — 開始前の待ち時間のミリ秒
- `duration` (`number` | `function`, default `d => Math.sqrt(d) * 120`) — 下記を参照してください
- `easing` (`function`, default `cubicOut`) — [イージング関数](/docs/svelte-easing)

`duration` は、以下のいずれかを指定することができます。

- `number` — ミリ秒単位です。
- 関数 `distance: number => duration: number` — 要素の移動距離をピクセル単位で受け取り、その時間をミリ秒単位で返します。これにより、各要素の持続時間に対する移動距離を割り当てることができます。

[アニメーションのチュートリアル](https://learn.svelte.jp/tutorial/animate)で完全な例をご覧ください。

```svelte
<script>
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	let list = [1, 2, 3];
</script>

{#each list as n (n)}
	<div animate:flip={{ delay: 250, duration: 250, easing: quintOut }}>
		{n}
	</div>
{/each}
```

## Types

> TYPES: svelte/animate
