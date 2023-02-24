---
title: Textarea inputs
---

Svelteでは、`<textarea>`要素はtext inputと同じように振る舞います。`<textarea>` の内容と `value` 変数の双方向バインディングを作成するには、`bind:value`を使います。

```html
<textarea bind:value={value}></textarea>
```

このように名前が一致する場合は、省略形を使用することもできます。

```html
<textarea bind:value></textarea>
```

これはtextareaに限らず全てのバインディングに適用されます。
