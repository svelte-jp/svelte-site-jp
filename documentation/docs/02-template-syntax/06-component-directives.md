---
title: Component directives
---

## on:_eventname_

```svelte
<!--- copy: false --->
on:eventname={handler}
```

コンポーネントは [`createEventDispatcher`](/docs/svelte#createeventdispatcher) を用いるか、または DOM イベントを転送(forward)することでイベントを発火することができます。

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<!-- programmatic dispatching -->
<button on:click={() => dispatch('hello')}> one </button>

<!-- declarative event forwarding -->
<button on:click> two </button>
```

コンポーネントのイベントをリッスンするための書き方は、DOM イベントをリッスンする書き方と同じです:

```svelte
<SomeComponent on:whatever={handler} />
```

DOM イベントと同様に、`on:` ディレクティブが値なしで使われる場合、イベントは転送(forward)されます、これはつまり、コンポーネントを使用する側でイベントをリッスンできることを意味します。

```svelte
<SomeComponent on:whatever />
```

## --style-props

```svelte
<!--- copy: false --->
--style-props="anycssvalue"
```

テーマ設定のためにスタイルをプロパティとしてコンポーネントに渡すことができます。これには CSS カスタムプロパティを使用します。

Svelte の実装は、本質的にはラッパー要素を追加するためのシンタックスシュガー(糖衣構文)です。この例では:

```svelte
<Slider bind:value min={0} --rail-color="black" --track-color="rgb(0, 0, 255)" />
```

デシュガー(脱糖)すると:

```svelte
<div style="display: contents; --rail-color: black; --track-color: rgb(0, 0, 255)">
	<Slider bind:value min={0} max={100} />
</div>
```

**注意**: 余分な `<div>` が追加されるため、あなたのCSS構造が誤ってこれをターゲットにしてしまう可能性があるので注意してください。この機能を使用する際は、この追加されるラッパー要素に気をつけてください。

SVG namespace の場合、上記の例はデシュガー(脱糖)すると `<g>` が代わりに使用されます:

```svelte
<g style="--rail-color: black; --track-color: rgb(0, 0, 255)">
	<Slider bind:value min={0} max={100} />
</g>
```

**Note**: 余分な `<g>` が追加されるため、あなたのCSS構造が誤ってこれをターゲットにしてしまう可能性があるので注意してください。この機能を利用する際は、この追加されるラッパー要素に気をつけてください。

Svelte の CSS Variables サポートによって、テーマに沿ったコンポーネントを簡単に作ることができます:

```svelte
<style>
	.potato-slider-rail {
		background-color: var(--rail-color, var(--theme-color, 'purple'));
	}
</style>
```

ハイレベルなテーマカラーを設定できますし、

```css
/* global.css */
html {
	--theme-color: black;
}
```

コンシューマーレベルでそれをオーバーライドできます。

```svelte
<Slider --rail-color="goldenrod" />
```

## bind:_property_

```svelte
bind:property={variable}
```

要素の場合と同じ構文を用いてコンポーネントの props をバインドすることができます。

```svelte
<Keypad bind:value={pin} />
```

While Svelte props are reactive without binding, that reactivity only flows downward into the component by default. Using `bind:property` allows changes to the property from within the component to flow back up out of the component.

## bind:this

```svelte
<!--- copy: false --->
bind:this={component_instance}
```

コンポーネントは `bind:this` もサポートしており、これを用いることでコンポーネントのインスタンスをプログラムで操作できるようになります。

```svelte
<ShoppingCart bind:this={cart} />

<button on:click={() => cart.empty()}> Empty shopping cart </button>
```

> ボタンが最初にレンダリングされるときには `cart` が `undefined` であり、エラーを投げるので、`{cart.empty}` を実行できないことに注意してください。
