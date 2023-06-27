---
title: Store bindings
---

ストアが書き込み可能、つまり `set` メソッドを持っている場合は、ローカルコンポーネントの状態にバインドするのと同じように、ストアの値にバインドできます。

この例では、書き込み可能なストア `name` と派生ストア（derived store）の `greeting` があります。`<input>` 要素を以下のように更新してください:

```svelte
<input bind:value={$name} />
```

入力値を変更すると `name` とそれに依存しているもの全てが更新されます。

また、コンポーネント内でストアの値に直接代入することもできます。以下の通り `<button>` 要素を追加してください:

```svelte
<button on:click={() => ($name += '!')}> Add exclamation mark! </button>
```

`$name += '!'` の代入は `name.set($name + '!')` と同等です。
