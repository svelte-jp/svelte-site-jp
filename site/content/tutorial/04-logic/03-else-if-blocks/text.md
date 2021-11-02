---
title: Else-if blocks
---

複数の条件を `else if` と一緒に '連結' することができます。

```html
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```