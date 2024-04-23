---
title: Event handlers
---

Svelte 5 ではイベントハンドラが刷新されました。Svelte 4 では要素にイベントリスナーをアタッチするのに `on:` ディレクティブを使用していましたが、Svelte 5 では他のプロパティと同じように扱うことができます:

```diff
<script>
	let count = $state(0);
</script>

-<button on:click={() => count++}>
+<button onclick={() => count++}>
	clicks: {count}
</button>
```

ただのプロパティとして扱えるため、おなじみの短縮構文(shorthand syntax)を使うことができます…

```svelte
<script>
	let count = $state(0);

	function onclick() {
		count++;
	}
</script>

<button {onclick}>
	clicks: {count}
</button>
```

…ただし、名前付きのイベントハンドラ関数を使用する場合は、より明確な名前を使用したほうがよいでしょう。

従来の `on:` イベントハンドラも使用することができますが、Svelte 5 では非推奨となります。

## Component events

Svelte 4 では、[`createEventDispatcher`](https://svelte.jp/docs/svelte#createeventdispatcher) を使用して dispatcher を作成すること、コンポーネントはイベントを発行していました。

Svelte 5 では `createEventDispatcher` は非推奨となります。代わりに、コンポーネントで _コールバック props_ を受け取ります ([デモ](/#H4sIAAAAAAAAE41TS27bMBC9ykBtELu1ZTmAG0C2hPYG3dddyPIwJkKRAjmy4wrad9VFL5BV75cjlKQof5osutCHb968-XCmjRgXaKL0WxvJosIojb7UdTSJ6Fi7g9mjILRnoxpdOmRlSs1rytdyTbyqlSb42lQ1MK0quI1n7hD3brdLR3KPQALDfyBk8N5QQTiaL8bLwbJptKGziRXCoLdaO2tkSVxJ0GiQRmNovSYFtfmij0GDhnf2WLeWq9k5WblymfmsJRM2TtZatSy_EvyYwSDIGYw8lsP9YnzKkXQT5Dv33uJbWhe-ybgvfDooO7-ZT6h9Z3le10utNg2RLVTJUvDyMWt9xV0u8QCbQgilbD09xzd_ZepCQikKY7J1tFGqWkf5y_PvP7Zqa7GcNkXbjO4Nci-3jsDQUaBFTFkITKFN4mQOH3zKnZXry3l5_vXTi5yEZ5x1vqfe39N8gFB_rQx3l5YC40-4DR0VyCiFJJxI1efDgW9pl8I8SW4CskP-sKMriClJU5eZR_eHQQifaFoI_mDDlSgJ9RCPS5yedJZDatxRpri3VJOCVPI0Lu4Th94MpZAu5FCMbxIk8Z259rCtH-iF5FXRsz2cxAsDTOlDobdXXp8f8ci03TgDl_7JDbQQLiOJP0HXw3eLK_x-MRhcey4sPdxPfrgZu7uV2nLGcRulbnq7yWnV3Ub87667RW0h7M4EwuBD5_a21qo2I7ey1xv370QH7y4PPxfz_IobAnR5-DlxXxf0vfsLb_4Z08cEAAA=)):

```svelte
<script>
	import Pump from './Pump.svelte';

	let size = $state(15);
	let burst = $state(false);

	function reset() {
		size = 15;
		burst = false;
	}
</script>

<Pump
	inflate={() => {
		size += 5;
		if (size > 75) burst = true;
	}}
	deflate={() => {
		if (size > 0) size -= 5;
	}}
/>

{#if burst}
	<button onclick={reset}>new balloon</button>
	<span class="boom">💥</span>
{:else}
	<span class="balloon" style="scale: {0.01 * size}">
		🎈
	</span>
{/if}
```

```svelte
<script>
	let { inflate, deflate } = $props();
</script>

<button onclick={inflate}>inflate</button>
<button onclick={deflate}>deflate</button>
```

## Bubbling events

要素からイベントを 'forward' するのに `<button on:click>` を使用する代わりに、コンポーネントで `onclick` コールバック prop を受け取りましょう:

```svelte
<script>
	let { onclick, children } = $props();
</script>

<button {onclick}>
	{@render children()}
</button>
```

これはつまり、要素に対してイベントハンドラを他の props と一緒に 'spread' することができるということです:

```svelte
<script>
	let { children, ...props } = $props();
</script>

<button {...props}>
	{@render children()}
</button>
```

## Event modifiers

Svelte 4 では、イベントの修飾子 (modifier) をハンドラに付けることができます:

```svelte
<button on:click|once|preventDefault={handler}>...</button>
```

修飾子は `on:` に固有のもので、このモダンなイベントハンドラでは動作しません。`event.preventDefault()` などはハンドラ自体の内側に追加することが望ましいです。なぜなら全てのロジックがハンドラと修飾子の間で分割されるのではなく、1つの場所に存在するからです。

イベントハンドラはただの関数なので、必要に応じてラッパーを作成することができます:

```svelte
<script>
	function once(fn) {
		return function (event) {
			if (fn) fn.call(this, event);
			fn = null;
		};
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault();
			fn.call(this, event);
		};
	}
</script>

<button onclick={once(preventDefault(handler))}>...</button>
```

3つの修飾子 — `capture`、`passive`、`nonpassive` — は、イベントハンドラが実行されるときではなく、イベントハンドラがバインドされるときに適用する必要があるため、ラッパー関数で表現することができません。

`capture` の場合は、イベント名に修飾子を追加します:

```svelte
<button onclickcapture={...}>...</button>
```

一方、イベントハンドラの [`passive`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners) オプションを変更することは、安易に行ってよいことではありません。もしそのようなユースケースがあれば (おそらくないとは思いますが)、ご自身でイベントハンドラに適用する action を使用する必要があります。

## Multiple event handlers

Svelte 4 では、以下のようにすることができました:

```svelte
<button on:click={one} on:click={two}>...</button>
```

これはアンチパターンの一種で、可読性が悪くなり (もし属性が多い場合、隣同士に配置しないと2つのハンドラがあることに気が付くことが難しくなる)、また、実際には `one` の中に `event.stopImmediatePropagation()` などがあれば `two` が呼び出されるのを止めることができるのに、2つのハンドラが独立しているように見えてしまいます。

イベントハンドラも含め、要素の属性/プロパティが重複することは許されません。代わりに、以下のようにしてください:

```svelte
<button
	onclick={(e) => {
		one(e);
		two(e);
	}}
>
	...
</button>
```

## Why the change?

`createEventDispatcher` と `on:` ディレクティブを非推奨にしてコールバック props と通常の要素プロパティを使用することによって:

- Svelte の学習曲線を短くします
- ボイラープレートを削除します (特に `createEventDispatcher` 周り)
- リスナーが存在しない可能性があるイベントのための `CustomEvent` オブジェクトを作成することによるオーバーヘッドを削除します
- イベントハンドラを spread できるようにします
- どのイベントハンドラがコンポーネントに提供されたかわかるようにします
- 提供されたイベントハンドラが必須かオプションか表現できるようにします
- 型安全性を強化します (以前は、あるコンポーネントが特定のイベントを発行しないことを Svelte が保証することは事実上不可能でした)
