---
title: Each block bindings
---

`each` ブロック内のプロパティにバインドすることもできます。

```html
<input type="checkbox" bind:checked="{todo.done}" />

<input placeholder="What needs to be done?" bind:value="{todo.text}" />
```

> これらの `<input>` 要素と互いに作用すると、配列が突然変化することに注意してください。不変のデータを扱いたい場合は、バインディングを避け、代わりにイベントハンドラを使用する必要があります。
