---
title: 'Accessibility warnings'
---

アクセシビリティ（a11y と略されます）を正しく理解することは容易ではありませんが、Svelte は、アクセシブルではないマークアップを書くとコンパイル時に警告してくれます。しかし、多くのアクセシビリティの問題は、他の自動化されたツールを使用したり、手動でアプリケーションをテストするなど、実行時に特定できることを忘れないでください。

具体的なユースケースにおいては、警告が正しくないこともあるかもしれません。このような偽陽性を無効にするには、`<!-- svelte-ignore a11y-<code> -->` というコメントをその警告が発生している行の上においてください。例:

```svelte
<!-- svelte-ignore a11y-autofocus -->
<input autofocus />
```

Here is a list of accessibility checks Svelte will do for you.

## `a11y-accesskey`

要素に `accesskey` を設定しないように強制します。アクセスキーとは、Web 開発者が要素にキーボードのショートカットを割り当てることができる HTML 属性です。キーボードショートカットと、スクリーンリーダーやキーボードのみのユーザが使用するキーボードコマンドの間に不整合があるとアクセシビリティ対応が複雑になるので、複雑さを避けるためにもアクセスキーを使用してはいけません。

<!-- prettier-ignore -->
```svelte
<!-- A11y: Avoid using accesskey (accesskeyの使用を避けましょう) -->
<div accessKey="z" />
```

## `a11y-aria-activedescendant-has-tabindex`

`aria-activedescendant` がある要素はタブで移動できなければならない (tabbable) ので、固有の `tabindex` を持つか、属性として `tabindex` を宣言しなければなりません。

```svelte
<!-- A11y: Elements with attribute aria-activedescendant should have tabindex value -->
<div aria-activedescendant="some-id" />
```

## `a11y-aria-attributes`

DOM 要素の中には、ARIA role やステート、プロパティをサポートしていないものがあります。これは `meta`、`html`、`script`、`style` などのように、表示されないものがあるからです。このルールは、これらの DOM 要素が `aria-*` プロパティを含まないことを強制します。

```svelte
<!-- A11y: <meta> should not have aria-* attributes (<meta> は aria-* 属性を持つべきではありません) -->
<meta aria-hidden="false" />
```

## `a11y-autofocus`

要素で `autofocus` が使われないよう強制します。オートフォーカス要素は、目の見える人にも見えない人にもユーザビリティの問題を引き起こす可能性があります。

```svelte
<!-- A11y: Avoid using autofocus (autofocusの使用を避けましょう) -->
<input autofocus />
```

## `a11y-click-events-have-key-events`

`on:click` イベントを持つ visible で非インタラクティブな要素に、キーボードイベントハンドラを付けることを強制します。

ユーザーはまず、アクション向けの `<button type="button">` 要素、ナビゲーション向けの `<a>` 要素のようなインタラクティブな要素が適切かどうか検討すべきです。これらの要素はセマンティクス的により意味があり、ビルトインのキーハンドリングが付くことになります。例えば、`Space` と `Enter` は `<button>` を実行しますし、`Enter` は `<a>` 要素を実行します.

非インタラクティブな要素が必要な場合は、`on:click` に `on:keyup` や `on:keydown` ハンドラを追加して、ユーザーがキーボードから同等のアクションを実行できるようにする必要があります。ユーザーがキー入力を実行できるようにするためには、[`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) を追加して要素をフォーカスできるようにする必要があります。`on:keypress` ハンドラを追加することでもこの警告を無効にできますが、`keypress` イベントは非推奨であることにご注意ください。

```svelte
<!-- A11y: visible, non-interactive elements with an on:click event must be accompanied by a keyboard event handler. -->
<div on:click={() => {}} />
```

キーボード操作用のコーディングは、マウスを使用することができないユーザーや、支援技術(AT)の互換性、スクリーンリーダーを使用するユーザーのためにとても重要です。

## `a11y-distracting-elements`

気が散るような要素が使われていないかを確認します。視覚的に邪魔になる要素は、視覚障害のあるユーザにアクセシビリティ上の問題を引き起こす可能性があります。このような要素は、ほとんどの場合非推奨であり、避けるべきです。

以下の要素は視覚的に気を散らす要素の `<marquee>` と `<blink>` です。

```svelte
<!-- A11y: Avoid <marquee> elements (<marquee>要素の使用を避けましょう) -->
<marquee />
```

## `a11y-hidden`

一部の DOM 要素は、スクリーンリーダーのナビゲーションに有用であるため、非表示にすべきではありません。

<!-- prettier-ignore -->
```svelte
<!-- A11y: <h2> element should not be hidden (<h2> 要素を非表示にしてはなりません) -->
<h2 aria-hidden="true">invisible header</h2>
```

## `a11y-img-redundant-alt`

img の alt 属性には、image、picture、または photo という単語は含んではいけません。スクリーンリーダーは、すでに `img` 要素を画像として認識しています。_image_、_photo_、または _picture_ のような単語を使う必要はありません。

```svelte
<img src="foo" alt="Foo eating a sandwich." />

<!-- aria-hiddenによりスクリーンリーダーでは読み上げられません -->
<img src="bar" aria-hidden="true" alt="Picture of me taking a photo of an image" />

<!-- A11y: スクリーンリーダーでは、すでに<img>要素を「画像」として読み上げています -->
<img src="foo" alt="Photo of foo being weird." />

<!-- A11y: スクリーンリーダーでは、すでに<img>要素を「画像」として読み上げています -->
<img src="bar" alt="Image of me at a bar!" />

<!-- A11y: スクリーンリーダーでは、すでに<img>要素を「画像」として読み上げています -->
<img src="foo" alt="Picture of baz fixing a bug." />
```

## `a11y-incorrect-aria-attribute-type`

ARIA 属性に正しいタイプの値のみが使用されることを強制します。
例えば、`aria-hidden` は boolean のみを受け取ります。

```svelte
<!-- A11y: The value of 'aria-hidden' must be exactly one of true or false -->
<div aria-hidden="yes" />
```

## `a11y-invalid-attribute`

アクセシビリティ属性が有効な値であることを強制します。例えば `href` を空にすべきではないし、`'#'` や `javascript:` にすべきではありません。

```svelte
<!-- A11y: '' is not a valid href attribute (''は有効なhref属性ではありません) -->
<a href="">invalid</a>
```

## `a11y-interactive-supports-focus`

インタラクティブな role やインタラクティブなハンドラ (マウスやキー押下) を持つ要素は、フォーカス可能でありタブ移動が可能でなければなりません。

```svelte
<!-- A11y: Elements with the 'button' interactive role must have a tabindex value. -->
<div role="button" on:keypress={() => {}} />
```

## `a11y-label-has-associated-control`

ラベルタグは、テキストラベルと関連するコントロールを持つことを強制します。

ラベルとコントロールの関連付けには、次の2つの方法があります。

- コントロールをラベルタグで囲む。
- ラベルに `for` を追加し、ページ上の入力を示す ID 文字列を割り当てます。

```svelte
<label for="id">B</label>

<label>C <input type="text" /></label>

<!-- A11y: フォームラベルは、コントロールに関連付ける必要があります -->
<label>A</label>
```

## `a11y-media-has-caption`

メディアにキャプションを提供することは、耳の不自由なユーザが情報を得るために不可欠です。キャプションは、ダイアログ、サウンドエフェクト、関連する音楽のキュー、およびその他の関連するオーディオ情報の文字起こしまたは翻訳がなければなりません。これはアクセシビリティ上重要であるだけでなく、メディアが利用できない場合にすべてのユーザにとって有用です（画像が読み込めない場合に画像上に `alt` テキストを表示するのと同様です）。

キャプションには、対応するメディアを理解するための重要な関連情報をすべて含める必要があります。これは、キャプションがメディアコンテンツのダイアログと1対1で対応していないことを意味します。ただし、キャプションは `muted` 属性を持つビデオコンポーネントには必要ありません。

```svelte
<video><track kind="captions" /></video>

<audio muted />

<!-- A11y: Media elements must have a <track kind=\"captions\"> (メディア要素には <track kind=\"captions\"> が必要です) -->
<video />

<!-- A11y: Media elements must have a <track kind=\"captions\"> (メディア要素には <track kind=\"captions\"> が必要です) -->
<video><track /></video>
```

## `a11y-misplaced-role`

DOM 要素の中には、ARIA role やステート、プロパティをサポートしていないものがあります。これは `meta`、`html`、`script`、`style` などのように、表示されないものがあるからです。このルールは、これらの DOM 要素が `role` プロパティを含んでいないことを強制します。

```svelte
<!-- A11y: <meta> should not have role attribute (<meta>はrole属性を持つべきではありません) -->
<meta role="tooltip" />
```

## `a11y-misplaced-scope`

scope 属性は、`<th>` 要素でのみ使用してください。

<!-- prettier-ignore -->
```svelte
<!-- A11y: The scope attribute should only be used with <th> elements (scope 属性は、<th> 要素でのみ使用されます) -->
<div scope="row" />
```

## `a11y-missing-attribute`

アクセシビリティに必要な属性が要素上に存在することを強制します。以下のチェックが含まれます。

- `<a>` には href が必要です ([fragment-defining tag](https://github.com/sveltejs/svelte/issues/4697) ではない限り)
- `<area>` には alt、aria-label または aria-labelledby が必要です
- `<html>` には lang が必要です
- `<iframe>` には title が必要です
- `<img>` には alt が必要です
- `<object>` には title、aria-label または aria-labelledby が必要です
- `<input type="image">` には alt、aria-label または aria-labelledby が必要です。

```svelte
<!-- A11y: <input type=\"image\"> element should have an alt, aria-label or aria-labelledby attribute (<input type=\"image\">要素にはalt、aria-label、aria-labelledby属性が必要です) -->
<input type="image" />

<!-- A11y: <html> element should have a lang attribute (<html>要素は、lang属性を持つ必要があります) -->
<html />

<!-- A11y: <a>要素にはhref属性が必要です -->
<a>text</a>
```

## `a11y-missing-content`

見出し要素（`h1`、`h2` など）とアンカーに対し、コンテンツを持つこと、そのコンテンツがスクリーンリーダーからアクセス可能であることを強制します。

```svelte
<!-- A11y: <a> element should have child content (<a>要素は子コンテンツを持つべきです) -->
<a href="/foo" />

<!-- A11y: <h1> element should have child content (<h1>要素は子コンテンツを持つべきです) -->
<h1 />
```

## `a11y-mouse-events-have-key-events`

`on:mouseover` と `on:mouseout` に対し、それぞれ `on:focus` と `on:blur` を付けることを強制します。これにより、こららのマウスイベントによってトリガされる機能が、キーボードユーザーもアクセス可能であることが保証されます。

```svelte
<!-- A11y: on:mouseover must be accompanied by on:focus -->
<div on:mouseover={handleMouseover} />

<!-- A11y: on:mouseout must be accompanied by on:blur -->
<div on:mouseout={handleMouseout} />
```

## `a11y-no-redundant-roles`

HTML の要素には、デフォルトで ARIA role を持つものがあります。対象の要素に、すでにブラウザで設定されている ARIA role を与えても[効果はなく](https://www.w3.org/TR/using-aria/#aria-does-nothing)、冗長になるだけです。

```svelte
<!-- A11y: Redundant role 'button' (冗長な　role 'button') -->
<button role="button" />

<!-- A11y: 冗長な　role 'img' -->
<img role="img" src="foo.jpg" />
```

## `a11y-no-interactive-element-to-noninteractive-role`

[WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) role を、インタラクティブな要素を非インタラクティブな要素に変換するために使用してはいけません。非インタラクティブな ARIA role には、`article`、`banner`、`complementary`、`img`、`listitem`、`main`、`region`、`tooltip` が含まれます。

```svelte
<!-- A11y: <textarea> cannot have role 'listitem' -->
<textarea role="listitem" />
```

### `a11y-no-noninteractive-element-interactions`

A non-interactive element does not support event handlers (mouse and key handlers). Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<p>`, `<img>`, `<li>`, `<ul>` and `<ol>`. Non-interactive [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

```sv
<!-- `A11y: Non-interactive element <li> should not be assigned mouse or keyboard event listeners.` -->
<li on:click={() => {}} />

<!-- `A11y: Non-interactive element <div> should not be assigned mouse or keyboard event listeners.` -->
<div role="listitem" on:click={() => {}} />
```

### `a11y-no-noninteractive-element-to-interactive-role`

[WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) role を、非インタラクティブな要素をインタラクティブな要素に変換するために使用してはいけません。インタラクティブな ARIA role には、`button`、`link`、`checkbox`、`menuitem`、`menuitemcheckbox`、`menuitemradio`、`option`、`radio`、`searchbox`、`switch`、`textbox` が含まれます。

```svelte
<!-- A11y: Non-interactive element <h3> cannot have interactive role 'searchbox' -->
<h3 role="searchbox">Button</h3>
```

## `a11y-no-noninteractive-tabindex`

タブキーでのナビゲーションは、ページ上のインタラクティブに操作できる要素に限定する必要があります。

<!-- prettier-ignore -->
```svelte
<!-- A11y: noninteractive element cannot have nonnegative tabIndex value -->
<div tabindex="0" />
```

## a11y-no-static-element-interactions

Elements like `<div>` with interactive handlers like `click` must have an ARIA role.

<!-- prettier-ignore -->
```svelte
<!-- A11y: <div> with click handler must have an ARIA role -->
<div on:click={() => ''} />
```

## `a11y-positive-tabindex`

`tabIndex` プロパティを正の値にすることは避けてください。要素が期待されるタブの順序から外れてしまい、キーボードユーザーに混乱を招くことになります。

<!-- prettier-ignore -->
```svelte
<!-- A11y: avoid tabindex values above zero (tabindexの値が0を超えないようにする) -->
<div tabindex="1" />
```

## `a11y-role-has-required-aria-props`

ARIA role を持つ要素は、その role に必要な属性をすべて持つ必要があります。

```svelte
<!-- A11y: A11y: Elements with the ARIA role "checkbox" must have the following attributes defined: "aria-checked" -->
<span role="checkbox" aria-labelledby="foo" tabindex="0" />
```

## `a11y-role-supports-aria-props`

明示的または暗黙的な、定義された role を持つ要素は、その role がサポートする `aria-*` プロパティのみを含むようにします。

```svelte
<!-- A11y: The attribute 'aria-multiline' is not supported by the role 'link'. -->
<div role="link" aria-multiline />

<!-- A11y: The attribute 'aria-required' is not supported by the role 'listitem'. This role is implicit on the element <li>. -->
<li aria-required />
```

## `a11y-structure`

特定の DOM 要素が正しい構造を持つことを強制します。

```svelte
<!-- A11y: <figcaption> must be an immediate child of <figure> (<figcaption>は、<figure>の直接の子でなければなりません) -->
<div>
	<figcaption>Image caption</figcaption>
</div>
```

## `a11y-unknown-aria-attribute`

[WAI-ARIA States and Properties spec](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties)に基づいて、既知の ARIA 属性のみを使用することを強制します。

```svelte
<!-- A11y: Unknown aria attribute 'aria-labeledby' (did you mean 'labelledby'?) (不明なaria属性 'aria-labeledby'（'labelledby'ではないでしょうか）) -->
<input type="image" aria-labeledby="foo" />
```

## `a11y-unknown-role`

ARIA role を持つ要素は有効で、抽象的でない ARIA role を使用しなければなりません。role の定義については、[WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions)サイトを参照してください。

<!-- prettier-ignore -->
```svelte
<!-- A11y: Unknown role 'toooltip' (did you mean 'tooltip'?) (不明な'toooltip' role ('tooltip'では？)) -->
<div role="toooltip" />
```
