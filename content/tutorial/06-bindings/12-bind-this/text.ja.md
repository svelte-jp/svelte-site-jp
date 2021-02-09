---
title: This
---

読み取り専用の `this` バインディングは全要素（および 全コンポーネント）に適用され、レンダリングされた要素を参照することができます。例えば、`<canvas>` 要素への参照を得られます:

```html
<canvas bind:this="{canvas}" width="{32}" height="{32}"></canvas>
```

注意 `canvas` の値はコンポーネントがマウントされるまで `undefined` になるので、`onMount` という[ライフサイクル関数](tutorial/onmount)内にロジックを含めます。
