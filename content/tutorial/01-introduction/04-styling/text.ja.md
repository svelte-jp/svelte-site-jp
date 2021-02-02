---
title: Styling
---

HTMLと同じように、コンポーネントには`<style>`タグを置くことができます。`<p>`要素にいくつかスタイルを追加してみましょう。

```html
<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
```

重要なのは、これらのスタイルが*このコンポーネントにのみ適用されるということです*。次のステップで説明しますが、別の箇所の`<p>`要素のスタイルに影響を与えてしまうようなことはありません。