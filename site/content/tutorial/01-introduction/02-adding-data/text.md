---
title: Adding data
---

静的なマークアップ(HTML)をレンダリングするだけでは面白くありません。いくつかデータを追加してみましょう。

まず、`script`タグを追加してその中に`name`変数を宣言します。

```html
<script>
	let name = 'world';
</script>

<h1>Hello world!</h1>
```

次に、マークアップから`name`を参照します。

```html
<h1>Hello {name}!</h1>
```

中括弧`{}`の中にはJavaScriptのコードを置くことができます。中括弧の中の`name`を`name.toUpperCase()`に置き換えてみましょう。
