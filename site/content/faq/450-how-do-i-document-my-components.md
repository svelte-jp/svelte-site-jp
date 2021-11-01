---
question: コンポーネントのドキュメントを作成する方法はありますか？
---

Svelte Language Serverを使用するエディターでは、特別にフォーマットされたコメントを使用して、コンポーネント、関数、およびエクスポートを文書化することができます。

````svelte
<script>
	/** What should we call the user? */
	export let name = 'world';
</script>

<!--
@component
Here's some documentation for this component.
It will show up on hover.

- You can use markdown here.
- You can also use code blocks here.
- Usage:
  ```tsx
  <main name="Arethra">
  ```
-->
<main>
	<h1>
		Hello, {name}
	</h1>
</main>
````

Note:コンポーネントを記述するHTMLコメントには`@component`が必要です。
