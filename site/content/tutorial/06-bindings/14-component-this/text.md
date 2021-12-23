---
title: Binding to component instances
---

DOM要素にバインドできるのと同じように、コンポーネントのインスタンス自体にもバインドできます。たとえば、DOM要素をバインドするときと同じように、`<InputField>` のインスタンスを `field` 変数にバインドすることができます。

```html
<script>
	let field;
</script>

<InputField bind:this={field} />
```

これで、`field` を使って、このコンポーネントをプログラムで操作できるようになりました。

```html
<button on:click="{() => field.focus()}">
	Focus field
</button>
```

> なお、ボタンが最初にレンダリングされたとき、fieldは未定義であり、エラーが発生するため、`{field.focus}` をすることはできません。
