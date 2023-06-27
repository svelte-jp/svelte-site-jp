---
title: Derived stores
---

`derived` を使用して、1つまたはそれ以上の _他の_ ストアに基づいた値のストアを作成することができます。前の例を利用して、ページが開かれている時間を取得するストアを作成することができます。

```js
export const elapsed = derived(time, ($time) => Math.round(($time - start) / 1000));
```

> 複数の入力からストアを作成したり、値を返す代わりに `set` を使用して明示的に値をセットすることができます（これは非同期で値を取得する場合に役立ちます）。詳細については [API reference](/docs/svelte-store#derived) を参照してください。
