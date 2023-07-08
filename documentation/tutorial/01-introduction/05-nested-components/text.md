---
title: Nested components
---

アプリ全体を単一のコンポーネントにまとめるのは現実的ではありません。代わりに、他のファイルからコンポーネントをインポートして、HTML要素を使用するのと同じようにコンポーネントを使用することができます。

右側のエディタに2つのファイルがあります。上部のバーにある `App.svelte` と `Nested.svelte` をクリックすると、それぞれのファイルが表示されます。

それぞれの `.svelte` ファイルには、再利用可能な、自己完結型の (HTML、CSS、JavaScript がカプセル化された) コードブロックが含まれています。

`<script>` タグを `App.svelte` に追加し、`Nested.svelte` をコンポーネントとしてアプリにインポートしましょう…

```svelte
<script>
	import Nested from './Nested.svelte';
</script>
```

…そして `Nested` コンポーネントをアプリのマークアップで使用してください:

```svelte
<p>This is a paragraph.</p>
<Nested />
```

`Nested.svelte` には `p` 要素がありますが、`App.svelte` のスタイルが適用されていないことに注目してください。

またコンポーネント名 `Nested` が大文字で始まっていることにも注目してください。この命名規則は、ユーザーが定義したコンポーネントと、通常のHTMLタグを区別するために採用されました。
