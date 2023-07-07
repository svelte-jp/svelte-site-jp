---
title: Basic markup
---

## タグ(Tags) <!--tags-->

`<div>` のような小文字のタグは、通常の HTML 要素を表します。大文字のタグ、例えば`<Widget>` や `<Namespace.Widget>` は コンポーネント を表します。

```svelte
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget />
</div>
```

## 属性(attributes) と props <!--attributes-and-props-->

デフォルトでは、属性は HTML と全く同じように動作します。

```svelte
<div class="foo">
	<button disabled>can't touch this</button>
</div>
```

HTML のように、値は引用符で囲まれていない場合があります。

```svelte
<input type="checkbox" />
```

属性値には JavaScript の式を含めることができます。

```svelte
<a href="page/{p}">page {p}</a>
```

あるいは、JavaScript の式にすることもできます。

```svelte
<button disabled={!clickable}>...</button>
```

Boolean の属性は、その値が [truthy](https://developer.mozilla.org/ja/docs/Glossary/Truthy) であれば要素に含まれ、[falsy](https://developer.mozilla.org/ja/docs/Glossary/Falsy) であれば除外されます。

それ以外の属性は、その値が [nullish](https://developer.mozilla.org/ja/docs/Glossary/Nullish) (`null` または `undefined`) でない限り含まれます。

```svelte
<input required={false} placeholder="This input field is not required" />
<div title={null}>This div has no title attribute</div>
```

式には、通常の HTML ではシンタックスハイライトに失敗するような文字が含まれている可能性があるので、値を引用符で囲むことが許可されています。引用符は値の解析方法には影響しません。

```svelte
<button disabled={number !== 42}>...</button>
```

属性名と値が一致する場合(`name={name}`)は、`{name}` で置き換えることができます。

```svelte
<button {disabled}>...</button>
<!-- equivalent to
<button disabled={disabled}>...</button>
-->
```

慣習として、コンポーネントに渡される値は DOM の機能である _属性_ ではなく、_プロパティ(properties)_ または _props_ と呼ばれます。

要素の場合と同様に、`name={name}` は `{name}` の短縮形に置き換えることができます。

```svelte
<Widget foo={bar} answer={42} text="hello" />
```

_スプレッド属性_ は、多くの属性やプロパティを一度に要素やコンポーネントに渡すことができます。

要素またはコンポーネントは、通常のものと混在させて、複数のスプレッド属性を持つことができます。

```svelte
<Widget {...things} />
```

`$$props` は、`export` で宣言されていないものも含めて、コンポーネントに渡されるすべてのプロパティ(props)を参照します。これは Svelte にとって最適化が難しくなるので、一般的には推奨されません。しかし、コンパイル時にどのようなプロパティがコンポーネントに渡されるかわからない場合など、稀なケースでは便利です。

```svelte
<Widget {...$$props} />
```

`$$restProps` には、`export` で宣言されていないプロパティ(props)のみが含まれます。これは他の未知の属性をコンポーネントの要素に渡すために使用できます。`$$props` と同じ最適化の問題を共有しており、同様に推奨されません。

```svelte
<input {...$$restProps} />
```

> `input` 要素やその子要素である `option` 要素の `value` 属性は、`bind:group` や `bind:checked` を使用している場合、スプレッド属性で設定してはいけません。このような場合、Svelte はその要素の `value` をマークアップの中で直接確認する必要があります、そうすることでバインドされた変数にリンクすることができるからです。

> Svelte は JavaScript で属性を順番に設定するため、その属性の順番が問題になることがあります。例えば、`<input type="range" min="0" max="1" value={0.5} step="0.1"/>` の場合、Svelte は value に `1` を設定し (step のデフォルトが 1 であるため、0.5 から切り上げられてしまいます)、そしてそのあとで step に `0.1` を設定します。これを修正するには、順序を `<input type="range" min="0" max="1" step="0.1" value={0.5}/>` のように変更してください。

> 別の例としては `<img src="..." loading="lazy" />` があります。Svelte は、img 要素を `loading="lazy"` にする前に、img の `src` を設定しますが、これでは遅すぎます。画像を遅延読み込みさせるには、`<img loading="lazy" src="...">` のように変更してください。

## Text expressions

```svelte
{expression}
```

テキストにも JavaScript の式(expression)を含めることができます。

> 正規表現 (`RegExp`) の [リテラル記法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor)を使用する場合、括弧で囲う必要があります。

```svelte
<h1>Hello {name}!</h1>
<p>{a} + {b} = {a + b}.</p>

<div>{/^[A-Za-z ]+$/.test(value) ? x : y}</div>
```

## Comments

コンポーネント内で HTML コメントを使用することができます。

```svelte
<!-- this is a comment! --><h1>Hello world</h1>
```

`svelte-ignore` で始まるコメントは、マークアップの次のブロックに対する警告を無効にします。通常、これらはアクセシビリティの警告です。正当な理由で警告を無効にしていることを確認してください。

```svelte
<!-- svelte-ignore a11y-autofocus -->
<input bind:value={name} autofocus />
```
