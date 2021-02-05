---
title: Default values
---

`Nested.svelte`のpropsのデフォルト値を簡単に指定することができます。

```html
<script>
	export let answer = 'a mystery';
</script>
```

`answer`propなしで2つ目のコンポーネントを追加すると、デフォルト値にフォールバックします。

```html
<Nested answer={42}/>
<Nested/>
```
