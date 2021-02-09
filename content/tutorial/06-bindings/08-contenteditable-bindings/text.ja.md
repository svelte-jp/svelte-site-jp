---
title: Contenteditable bindings
---

`contenteditable="true"` 属性を持つ要素は、`textContent` と `innerHTML` のバインディングをサポートします。

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```