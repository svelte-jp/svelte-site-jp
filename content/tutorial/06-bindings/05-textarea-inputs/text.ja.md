---
title: Textarea inputs
---

Svelteでは、`<textarea>`要素はテキストinputと同じように振る舞います。`bind:value`を使ってみましょう。

```html
<textarea bind:value={value}></textarea>
```

このように、名前が一致する場合は省略することもできます。

```html
<textarea bind:value></textarea>
```

これはtextareaに限らず全てのバインディングに適用されます。