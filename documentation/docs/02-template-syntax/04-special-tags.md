---
title: Special tags
---

## {@html ...}

```svelte
{@html expression}
```

テキストの式では、 `<` や `>` のような文字はエスケープされますが、HTML の式ではエスケープされません。

HTML の式は単独で正しい HTML になっている必要があります。`{@html "<div>"}content{@html "</div>"}` は `</div>` の部分が正しい HTML ではないため、動作しません。また、Svelteコードをコンパイルすることもできません。

> Svelte は HTML を挿入する前に式をサニタイズしません。データが信頼できないソースからのものである場合は自分でサニタイズする必要があります。そうしないと、ユーザーを XSS の脆弱性にさらしてしまいます。

```svelte
<div class="blog-post">
	<h1>{post.title}</h1>
	{@html post.content}
</div>
```

## {@debug ...}

```svelte
{@debug}
```

```svelte
{@debug var1, var2, ..., varN}
```

`{@debug ...}` タグは `console.log(...)` の代わりになります。指定した変数の値が変更されるたびログに出力し、devtools を開いている場合はコードの実行を一時停止します。

```svelte
<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

{@debug user}

<h1>Hello {user.firstname}!</h1>
```

`{@debug ...}` はカンマ区切りの（任意の式ではなく）変数名のリストを受け取ります。

```svelte
<!-- コンパイルできる -->
{@debug user}
{@debug user1, user2, user3}

<!-- コンパイルできない -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```

引数なしの `{@debug}` タグは、（変数を指定した場合とは逆に）何らかの状態が変化した時にトリガされる `debugger` 文を挿入します。

## {@const ...}

```svelte
{@const assignment}
```

`{@const ...}` タグはローカル定数を定義します。

```svelte
<script>
	export let boxes;
</script>

{#each boxes as box}
	{@const area = box.width * box.height}
	{box.width} * {box.height} = {area}
{/each}
```

`{@const}` は、`{#if}`、`{:else if}`、`{:else}`、`{#each}`、`{:then}`、`{:catch}`、`<Component />`、`<svelte:fragment />` の直下にのみ配置することができます。
