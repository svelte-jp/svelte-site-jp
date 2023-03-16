---
title: Contenteditable bindings
---

`contenteditable` 属性を持つ要素は以下のバインディングをサポートします:
- [`innerHTML`](https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML)
- [`innerText`](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/innerText)
- [`textContent`](https://developer.mozilla.org/ja/docs/Web/API/Node/textContent)

それぞれ少し違いがありますので、詳細は[こちら](https://developer.mozilla.org/ja/docs/Web/API/Node/textContent#Differences_from_innerText)をお読みください。

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```
