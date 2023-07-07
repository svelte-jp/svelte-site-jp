---
title: Special elements
---

## `<slot>`

```svelte
<slot><!-- optional fallback --></slot>
```

```svelte
<slot name="x"><!-- optional fallback --></slot>
```

```svelte
<slot prop={value} />
```

コンポーネントは要素と同じ様に、子コンテンツを持つことができます。

コンテンツは `<slot>` 要素を用いて子コンポーネントに公開されます。子が提供されない場合にレンダリングされるフォールバックのコンテンツを含めることができます。

```svelte
<!-- Widget.svelte -->
<div>
	<slot>
		this fallback content will be rendered when no content is provided, like in the first example
	</slot>
</div>

<!-- App.svelte -->
<Widget />
<!-- this component will render the default content -->

<Widget>
	<p>this is some child content that will overwrite the default slot content</p>
</Widget>
```

Note: 通常の `<slot>` 要素をレンダリングしたい場合は、`<svelte:element this="slot" />` を使用します。

Note: If you want to render regular `<slot>` element, You can use `<svelte:element this="slot" />`.

### `<slot name="`_name_`">`

名前付き slot (Named slot) は、特定の場所をターゲットにすることを可能にします。 また、フォールバックのコンテンツを含むこともできます。

```svelte
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer" />
</div>

<!-- App.svelte -->
<Widget>
	<h1 slot="header">Hello</h1>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</Widget>
```

`<Component slot="name" />` という構文を使って、コンポーネントを名前付き slot に入れることができます。
ラッパー要素無しでコンテンツを slot に入れるために、特別な要素 `<svelte:fragment>` を使うことができます。

```svelte
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer" />
</div>

<!-- App.svelte -->
<Widget>
	<HeaderComponent slot="header" />
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```

### $$slots

`$$slots` は、親からコンポーネントに渡された slot の名前が key となるオブジェクトです。親が特定の名前の slot を渡さなかった場合、その名前は `$$slots` には存在しません。これにより、親が slot を指定した場合にのみコンポーネントが slot (と他の要素、例えばスタイリング用のラッパーなど)をレンダリングすることができます。

明示的に空の名前付き slot を渡すと、その slot の名前が `$$slots` に追加されることにご注意ください。例えば、親が `<div slot="title" />` を子コンポーネントに渡した場合、`$$slots.title` は子コンポーネント内で有効になります。

```svelte
<!-- Card.svelte -->
<div>
	<slot name="title" />
	{#if $$slots.description}
		<!-- この <hr> と slot は、"description" という名前の slot が提供されている場合にのみレンダリングされます。 -->
		<hr />
		<slot name="description" />
	{/if}
</div>

<!-- App.svelte -->
<Card>
	<h1 slot="title">Blog Post Title</h1>
	<!-- "description"という名前の slot は提供されていないので、該当しない slot はレンダリングされません。 -->
</Card>
```

### `<slot key={`_value_`}>`

slot は0回以上レンダリングすることができ、props を使って親に値を _戻す_ ことができます。親はその値を `let:` ディレクティブを使って slot テンプレートに公開します。

通常の短縮ルールが適用されます — `let:item` は `let:item={item}` と同等であり、`<slot {item}>` は `<slot item={item}>` と同等です。

```svelte
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot prop={item} />
		</li>
	{/each}
</ul>

<!-- App.svelte -->
<FancyList {items} let:prop={thing}>
	<div>{thing.text}</div>
</FancyList>
```

名前付き slot は値を公開することもできます。`let:` ディレクティブは `slot` 属性を持つ要素に適用されます。

```svelte
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot name="item" {item} />
		</li>
	{/each}
</ul>

<slot name="footer" />

<!-- App.svelte -->
<FancyList {items}>
	<div slot="item" let:item>{item.text}</div>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```

## `<svelte:self>`

`<svelte:self>` 要素を使用すると、コンポーネントにそれ自体を再帰的に含めることができます。

マークアップのトップレベルに置くことはできません。また、無限ループを防ぐために、 `if` や `each` ブロックの内側に入れるか、コンポーネントの slot に渡す必要があります。

```svelte
<script>
	/** @type {number} */
	export let count;
</script>

{#if count > 0}
	<p>counting down... {count}</p>
	<svelte:self count={count - 1} />
{:else}
	<p>lift-off!</p>
{/if}
```

## `<svelte:component>`

```svelte
<svelte:component this={expression} />
```

`<svelte:component>` 要素は、 `this` プロパティで指定されたコンポーネントのコンストラクタを用いて、コンポーネントを動的にレンダリングします。プロパティが変更されると、コンポーネントは破棄されて再生成されます。

`this` が falsy である場合、コンポーネントはレンダリングされません。

```svelte
<svelte:component this={currentSelection.component} foo={bar} />
```

## `<svelte:element>`

```svelte
<svelte:element this={expression} />
```

`<svelte:element>` 要素は、動的に指定されたタイプの要素をレンダリングさせることができます。これは例えば、CMS のリッチなテキストコンテンツを表示する場合などに便利です。プロパティやリスナーが存在する場合は、その要素に適用されます。

Svelte がビルド時に処理する、要素タイプ固有のバインディング (例: input 要素 の `bind:value`) は動的なタグタイプでは動作しないため、サポートされているバインディングは `bind:this` のみです。

`this` が nullish な値である場合、その要素と子要素はレンダリングされません。

`this` が[空要素(void element)](https://developer.mozilla.org/ja/docs/Glossary/Void_element)のタグ名 (例えば `br`) で、`<svelte:element>` が子要素を持っている場合、開発モードの場合はランタイムエラーがスローされます。

```svelte
<script>
	let tag = 'div';

	/** @type {(e: MouseEvent) => void} */
	export let handler;
</script>

<svelte:element this={tag} on:click={handler}>Foo</svelte:element>
```

## `<svelte:window>`

```svelte
<svelte:window on:event={handler} />
```

```svelte
<svelte:window bind:prop={value} />
```

`<svelte:window>` 要素を使うと、コンポーネントが破棄されたときにイベントリスナーを削除したり、サーバサイドでレンダリングするときに `window` が存在するかどうかをチェックしたりすることなく、`window` オブジェクトにイベントリスナーを追加することができます。

`<svelte:self>` とは逆に、この要素はコンポーネントのトップレベルにのみ置くことができ、ブロックや要素の中に置くことはできません。

```svelte
<script>
	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		alert(`pressed the ${event.key} key`);
	}
</script>

<svelte:window on:keydown={handleKeydown} />
```

また、以下のプロパティをバインドすることもできます:

- `innerWidth`
- `innerHeight`
- `outerWidth`
- `outerHeight`
- `scrollX`
- `scrollY`
- `online` — `window.navigator.onLine` の別名です
- `devicePixelRatio`

`scrollX` と `scrollY` 以外はすべて読取専用です。

```svelte
<svelte:window bind:scrollY={y} />
```

> アクセシビリティの問題を避けるため、ページは初期値にスクロールされないことにご注意ください。`scrollX` と `scrollY` にバインドされている変数が変更された後にのみ、スクロールが発生します。ただし、スクロールの挙動が必要であれば、`onMount()` 内で `scrollTo()` を呼び出してください。

## `<svelte:document>`

```svelte
<svelte:document on:event={handler} />
```

```svelte
<svelte:document bind:prop={value} />
```

`<svelte:window>` と似ていますが、この要素では、`window` では発生しない `visibilitychange` などのイベントに対するリスナーを `document` に追加することができます。また、`document` で [action](/docs/element-directives#use-action) を使用することもできます。

`<svelte:window>` と同様、この要素はコンポーネントのトップレベルにのみ置くことができ、ブロックや要素の中に置くことはできません。

```svelte
<svelte:document on:visibilitychange={handleVisibilityChange} use:someAction />
```

以下のプロパティをバインドすることもできます:

- `fullscreenElement`
- `visibilityState`

すべて読取専用です。

## `<svelte:body>`

```svelte
<svelte:body on:event={handler} />
```

`<svelte:window>` と似ていますが、この要素では、`window` では発生しない `mouseenter` や `mouseleave` などのイベントに対するリスナーを `document.body` に追加することができます。また、`<body>` 要素で [action](/docs/element-directives#use-action) を使用することもできます。

`<svelte:window>`、`<svelte:document>` と同様に、この要素はコンポーネントのトップレベルにのみ置くことができ、ブロックや要素の中に置くことはできません。

```svelte
<svelte:body on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave} use:someAction />
```

## `<svelte:head>`

```svelte
<svelte:head>...</svelte:head>
```

この要素を使うと、 `document.head` に要素を挿入することができます。サーバサイドのレンダリングでは、`head` の内容はメインの `html` の内容とは別に公開されます。

`<svelte:window>`、`<svelte:document>`、`<svelte:body>` と同様に、この要素はコンポーネントのトップレベルにのみ置くことができ、ブロックや要素の中に置くことはできません。

```svelte
<svelte:head>
	<title>Hello world!</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>
```

## `<svelte:options>`

```svelte
<svelte:options option={value} />
```

`<svelte:options>` 要素を使用すると、コンポーネントごとにコンパイラオプションを指定することができます。これらは [コンパイラセクション](/docs/svelte-compiler#compile) で詳しく説明されています。使用できるオプションは以下の通りです。

- `immutable={true}` — ミュータブルなデータは絶対に使いません。そのため、コンパイラは値が変更されたかどうかを判断するために単純な参照等価性チェックを行うことができます
- `immutable={false}` — デフォルトです。Svelte は、ミュータブルなオブジェクトが変更されたかどうかについて、より保守的になります
- `accessors={true}` — コンポーネントの props の getter と setter を追加します
- `accessors={false}` — デフォルトです
- `namespace="..."` — このコンポーネントが使用される名前空間、よく指定されるのは "svg" です。大文字小文字を区別しない属性名とHTML固有の警告を除外するには "foreign" 名前空間を使用します
- `customElement="..."` — このコンポーネントをカスタム要素(custom element)としてコンパイルする際に使用する名前

```svelte
<svelte:options customElement="my-custom-element" />
```

## `<svelte:fragment>`

`<svelte:fragment>` 要素によって、コンテナとなる DOM 要素でラップすることなく[名前付き slot](/docs/special-elements#slot-slot-name-name) にコンテンツを入れることができます。これにより、ドキュメントのフローレイアウトがそのまま維持されます。

```svelte
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer" />
</div>

<!-- App.svelte -->
<Widget>
	<h1 slot="header">Hello</h1>
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```
