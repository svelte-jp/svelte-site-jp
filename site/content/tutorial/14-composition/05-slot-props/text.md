---
title: Slot props
---

このアプリには、現在マウスがその上に乗ったかどうかを追跡する `<Hoverable>` コンポーネントがあります。スロットの中身を更新できるように、そのデータを親コンポーネントに *戻す* 必要があります。

これには *slotプロパティ(slot props)* を使います。`Hoverable.svelte` の中で `hovering` の値をスロットに渡します。

```html
<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot hovering={hovering}></slot>
</div>
```

> お好みであれば、`{hovering}` というショートハンドを使えるのを覚えておいてください。

そして `<Hoverable>` コンポーネントの内容に `hovering` を公開するには、`let` ディレクティブを使います。

```html
<Hoverable let:hovering={hovering}>
	<div class:active={hovering}>
		{#if hovering}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

必要に応じて変数の名前を変更することができます。親コンポーネントでは `active` と呼ぶようにしましょう。

```html
<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

これらのコンポーネントは好きなだけ持つことができ、slotプロパティは、それらが宣言されているコンポーネントに対してローカルであり続けます。

> 名前付きスロットはプロパティを持つこともできます。コンポーネント自身ではなく、`slot="...."` 属性を持つ要素に対して `let` ディレクティブを使用してください。
