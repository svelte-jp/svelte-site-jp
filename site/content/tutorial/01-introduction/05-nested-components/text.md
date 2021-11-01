---
title: Nested components
---

アプリ全体を単一のコンポーネントにまとめるのは現実的ではありません。代わりに、他のファイルからコンポーネントをインポートして、HTML要素を使用するのと同じようにコンポーネントを使用することができます。

`<script>`タグを追加して`Nested.svelte`をインポートします…

```html
<script>
	import Nested from './Nested.svelte';
</script>
```

…そしてそれを追加します。

```html
<p>This is a paragraph.</p>
<Nested/>
```

`Nested.svelte`には`p`要素がありますが、`App.svelte`のスタイルが適用されていないことに注目してください。

またコンポーネント名`Nested`が大文字で始まっていることにも注目してください。この命名規則は、ユーザーが定義したコンポーネントと、通常のHTMLタグを区別するために採用されました。
