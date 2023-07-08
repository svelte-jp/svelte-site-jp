---
title: Numeric inputs
---

DOMの中では、全てが文字列(string)です。これは、数値のinput（`type="number"` と `type="range"`）を扱う際、その値を取り出す時に`input.value`を使わなければならないため、不便です。

`bind:value`を使用すれば、Svelteがそれを代行してくれます。

```svelte
<input type="number" bind:value={a} min="0" max="10" />
<input type="range" bind:value={a} min="0" max="10" />
```
