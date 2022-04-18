---
title: Keyed each blocks
---

デフォルトでは、`each` ブロックの値を変更すると、ブロックの *末尾* にアイテムを追加・削除し、変更された値を更新します。これはあなたが望むものではないかもしれません。

It's easier to show why than to explain. Click the 'Remove first thing' button a few times, and notice what happens: it does not remove the first `<Thing>` component, but rather the *last* DOM node. Then it updates the `name` value in the remaining DOM nodes, but not the emoji. 

代わりに、先頭の `<Thing>` コンポーネントとそのDOMノードだけを削除して、残りには影響を与えないようにしたいと思います。

そのためには、`each` ブロックに一意な識別子 (または"key") を指定します。

```html
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

ここで、`(thing.id)` は *key* であり、コンポーネントが更新されたときに変更するDOMノードを特定する方法を Svelte に伝えます。

> Svelte は内部的に `Map` を使用しているので、どんなオブジェクトでもキーとして使用できます。つまり `(thing.id)` の代わりに `(thing)` を使うことができます。しかし、文字列または数値を使用する方が一般的に安全です。なぜなら、例えばAPIサーバーからの新しいデータで更新する場合に、参照が等しくなくても同一性が持続することを意味するからです。
