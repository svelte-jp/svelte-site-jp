---
title: Key blocks
---

Key ブロックは、式の値が変更されたときにその中身を破棄して再作成します。

```svelte
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

要素をDOMに出入りしたときだけでなく、値が変化したときにトランジションしたい場合に便利です。

`number` に依存したキーブロックで `<span>` を囲みます。これにより、increment ボタンを押すたびにアニメーションが再生されるようになります。
