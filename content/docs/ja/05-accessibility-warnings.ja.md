---
title: Accessibility warnings
---

アクセシビリティ（a11yと略されます）を正しく理解することは容易ではありませんが、Svelteはアクセシブルではないマークアップを書いたときに警告してくれます。

Svelteが行うアクセシビリティチェックのリストは以下の通りです。

---

### `a11y-accesskey`

要素に`accesskey`を設定しないように強制します。アクセスキーとは、Web開発者が要素にキーボードのショートカットを割り当てることができるHTML属性です。キーボードショートカットと、スクリーンリーダーやキーボードのみのユーザが使用するキーボードコマンドの間に不整合があるとアクセシビリティ対応が複雑になるので、複雑さを避けるためにもアクセスキーを使用してはいけません。

```sv
<!-- A11y: accesskeyの使用を避けましょう -->
<div accessKey='z'></div>
```

---

### `a11y-aria-attributes`

DOM要素の中には、ARIAロールやステート、プロパティをサポートしていないものがあります。これは`meta`、`html`、`script`、`style`などのように、表示されないものがあるからです。このルールは、これらのDOM要素が`aria-*`プロパティを含まないことを強制します。

```sv
<!-- A11y: <meta>はaria-*属性を持つべきではありません -->
<meta aria-hidden="false">
```

---

### `a11y-autofocus`

要素で`autofocus`が使われないよう強制します。オートフォーカス要素は、目の見える人にも見えない人にもユーザビリティの問題を引き起こす可能性があります。

```sv
<!-- A11y: autofocusの使用を避けましょう -->
<input autofocus>
```

---

### `a11y-distracting-elements`

気が散るような要素が使われていないかを確認します。視覚的に邪魔になる要素は、視覚障害のあるユーザにアクセシビリティ上の問題を引き起こす可能性があります。このような要素は、ほとんどの場合非推奨であり、避けるべきです。

以下の要素は視覚的に気を散らす要素の`<marquee>`と`<blink>`です。

```sv
<!-- A11y: <marquee>要素の使用を避けましょう -->
<marquee />
```

---

### `a11y-hidden`

一部のDOM要素は、スクリーンリーダーのナビゲーションに有用であるため、非表示にすべきではありません。

```sv
<!-- A11y: <h2>要素を非表示にしてはなりません -->
<h2 aria-hidden>invisible header</h2>
```

---

### `a11y-img-redundant-alt`

imgのalt属性には、image、picture、またはphotoという単語は含んではいけません。スクリーンリーダーは、すでに`img`要素を画像として認識しています。_image_、_photo_、または _picture_ のような単語を使う必要はありません。

```sv
<img src="foo" alt="Foo eating a sandwich." />

<!-- aria-hiddenによりスクリーンリーダーでは読み上げられません -->
<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" />

<!-- A11y: スクリーンリーダーでは、すでに<img>要素を「画像」として読み上げています -->
<img src="foo" alt="Photo of foo being weird." />

<!-- A11y: スクリーンリーダーでは、すでに<img>要素を「画像」として読み上げています -->
<img src="bar" alt="Image of me at a bar!" />

<!-- A11y: スクリーンリーダーでは、すでに<img>要素を「画像」として読み上げています -->
<img src="foo" alt="Picture of baz fixing a bug." />
```

---

### `a11y-invalid-attribute`

アクセシビリティ属性が有効な値であることを強制します。

```sv
<!-- A11y: ''は有効なhref属性ではありません -->
<a href=''>invalid</a>
```

---

### `a11y-label-has-associated-control`

ラベルタグは、テキストラベルと関連するコントロールを持つことを強制します。

ラベルとコントロールの関連付けには、次の2つの方法があります。

- コントロールをラベルタグで囲む。
- ラベルに`for`を追加し、ページ上の入力を示すDOM ID文字列を割り当てます。

```sv
<label for="id">B</label>

<label>C <input type="text" /></label>

<!-- A11y: フォームラベルは、コントロールに関連付ける必要があります -->
<label>A</label>
```

---

### `a11y-media-has-caption`

メディアにキャプションを提供することは、耳の不自由なユーザが情報を得るために不可欠です。キャプションは、ダイアログ、サウンドエフェクト、関連する音楽のキュー、およびその他の関連するオーディオ情報の転写または翻訳がなければなりません。これはアクセシビリティ上重要であるだけでなく、メディアが利用できない場合にすべてのユーザにとって有用です（画像が読み込めない場合に画像上に`alt`テキストを表示するのと同様です）。

キャプションには、対応するメディアを理解するための重要な関連情報をすべて含める必要があります。これは、キャプションがメディアコンテンツのダイアログと1対1で対応していないことを意味します。ただし、キャプションは`muted`属性を持つビデオコンポーネントには必要ありません。

```sv
<video><track kind="captions"/></video>

<audio muted></audio>

<!-- A11y: メディア要素には、<track kind=\"captions\">が必要です -->
<video></video>

<!-- A11y: メディア要素には、<track kind=\"captions\">が必要です -->
<video><track /></video>
```

---

### `a11y-misplaced-role`

DOM要素の中には、ARIAロールやステート、プロパティをサポートしていないものがあります。これは`meta`、`html`、`script`、`style`などのように、表示されないものがあるからです。このルールは、これらのDOM要素が`role`プロパティを含んでいないことを強制します。

```sv
<!-- A11y: <meta>はrole属性を持つべきではありません -->
<meta role="tooltip">
```

---

### `a11y-misplaced-scope`

scopeは、`<th>`要素でのみ使用してください。

```sv
<!-- A11y: scope属性は、<th>要素でのみ使用されます -->
<div scope/>
```

---

### `a11y-missing-attribute`

要素に必須のアクセシビリティ属性を持たせることを強制します。

```sv
<!-- A11y: <input type=\"image\">要素にはalt、aria-label、aria-labelledby属性が必要です -->
<input type="image">

<!-- A11y: <html>要素は、lang属性を持つ必要があります -->
<html></html>

<!-- A11y: <a>要素にはhref属性が必要です -->
<a>text</a>
```

---

### `a11y-missing-content`

見出し要素（`h1`、`h2`など）やアンカーにコンテンツがあり、そのコンテンツがスクリーンリーダーからアクセス可能であることを強制します。

```sv
<!-- A11y: <a>要素は子コンテンツを持つべきです -->
<a href='/foo'></a>

<!-- A11y: <h1>要素は子コンテンツを持つべきです -->
<h1></h1>
```

---

### `a11y-positive-tabindex`

ページの流れとキーボードのタブ順を同期させるために、`tabIndex`プロパティを正の値にすることは避けてください。

```sv
<!-- A11y: tabindexの値が0を超えないようにする -->
<div tabindex='1'/>
```

---

### `a11y-structure`

アクセシビリティに関する要素が正しい構造になっていない場合に警告します。

```sv
<!-- A11y: <figcaption>は、<figure>の直接の子でなければなりません -->
<div>
	<figcaption>Image caption</figcaption>
</div>
```

---

### `a11y-unknown-aria-attribute`

aria属性が無効です。[WAI-ARIA States and Properties spec](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties)に基づいて、有効な`aria-*`プロパティを強制します。

```sv
<!-- A11y: 不明なaria属性 'aria-labeledby'（'labelledby'ではないでしょうか） -->
<input type="image" aria-labeledby="foo">
```

---

### `a11y-unknown-role`

ARIAロールを持つ要素は有効で、抽象的でないARIAロールを使用しなければなりません。ロールの定義については、[WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions)サイトを参照してください。

```sv
<!-- A11y: 不明な'toooltip'ロール（'tooltip'ではないでしょうか） -->
<div role="toooltip"></div>
```
