---
title: Default values
---

`Nested.svelte`のプロパティのデフォルト値を簡単に指定することができます。

```html
<script>
	export let answer = 'a mystery';
</script>
```

`answer`プロパティなしで2つ目のコンポーネントを追加すると、デフォルト値にフォールバックします。

```html
<Nested answer={42}/>
<Nested/>
```
