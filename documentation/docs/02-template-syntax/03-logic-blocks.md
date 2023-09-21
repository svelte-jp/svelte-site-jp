---
title: Logic blocks
---

## {#if ...}

```svelte
<!--- copy: false  --->
{#if expression}...{/if}
```

```svelte
<!--- copy: false  --->
{#if expression}...{:else if expression}...{/if}
```

```svelte
<!--- copy: false  --->
{#if expression}...{:else}...{/if}
```

条件付きでレンダリングされるコンテンツは、if ブロックで囲むことができます。

```svelte
{#if answer === 42}
	<p>what was the question?</p>
{/if}
```

追加の条件は `{:else if expression}` で付け足すことができ、`{:else}` 句で終わらせることもできます。

```svelte
{#if porridge.temperature > 100}
	<p>too hot!</p>
{:else if 80 > porridge.temperature}
	<p>too cold!</p>
{:else}
	<p>just right!</p>
{/if}
```

(ブロックは要素をラップする必要はなく、要素の中のテキストをラップすることもできます！)

## {#each ...}

```svelte
<!--- copy: false  --->
{#each expression as name}...{/each}
```

```svelte
<!--- copy: false  --->
{#each expression as name, index}...{/each}
```

```svelte
<!--- copy: false  --->
{#each expression as name (key)}...{/each}
```

```svelte
<!--- copy: false  --->
{#each expression as name, index (key)}...{/each}
```

```svelte
<!--- copy: false  --->
{#each expression as name}...{:else}...{/each}
```

each ブロックで値のリストの反復処理ができます。

```svelte
<h1>Shopping list</h1>
<ul>
	{#each items as item}
		<li>{item.name} x {item.qty}</li>
	{/each}
</ul>
```

配列や配列のような値（つまり `length` プロパティを持つオブジェクト）を反復処理するのに each ブロックを使用できます。

each ブロックは `array.map(...)` のコールバックの第二引数に相当する _インデックス_ を指定することもできます。

```svelte
{#each items as item, i}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

_key_ の式（各リストアイテムを一意に識別できる必要があります）が与えられた場合、Svelte は、データが変化したときに（末尾にアイテムを追加したり削除するのではなく）その key を使用してリストの差分を取ります。key はどんなオブジェクトでもよいですが、そのオブジェクト自体が変更されたときに同一性を維持できるようにするため、文字列か数値をお勧めします。

```svelte
{#each items as item (item.id)}
	<li>{item.name} x {item.qty}</li>
{/each}

<!-- もしくはインデックスを追加 -->
{#each items as item, i (item.id)}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

each ブロックでは分割代入や残余構文のパターンを自由に使えます。

```svelte
{#each items as { id, name, qty }, i (id)}
	<li>{i + 1}: {name} x {qty}</li>
{/each}

{#each objects as { id, ...rest }}
	<li><span>{id}</span><MyComponent {...rest} /></li>
{/each}

{#each items as [id, ...rest]}
	<li><span>{id}</span><MyComponent values={rest} /></li>
{/each}
```

each ブロックには `{:else}` 句を入れることもできます。これはリストが空の場合にレンダリングされます。

```svelte
{#each todos as todo}
	<p>{todo.text}</p>
{:else}
	<p>No tasks today!</p>
{/each}
```

Svelte 4 からは `Map` や `Set` などの iterables を反復処理することが可能です。iterables は有限で静的 (反復処理中に変化してはならない)でなければいけません。内部では、レンダリングに渡される前に `Array.from` を使用して配列に変換しています。もしパフォーマンスが要求されるコードを書くのであれば、iterables を避け、通常の配列を使用してください、そのほうがよりパフォーマンスが良くなります。

## {#await ...}

```svelte
<!--- copy: false  --->
{#await expression}...{:then name}...{:catch name}...{/await}
```

```svelte
<!--- copy: false  --->
{#await expression}...{:then name}...{/await}
```

```svelte
<!--- copy: false  --->
{#await expression then name}...{/await}
```

```svelte
<!--- copy: false  --->
{#await expression catch name}...{/await}
```

await ブロックを使用すると、Promise が取りうる 3 つの状態（pending(保留中)、fulfilled(成功)、rejected(失敗)）に分岐できます。SSR モードでは、サーバー上では pending の状態だけがレンダリングされます。

```svelte
{#await promise}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise was fulfilled -->
	<p>The value is {value}</p>
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
```

promise が rejected、つまり失敗した時に何もレンダリングする必要がない場合（もしくはエラーが発生しない場合）は `catch` ブロックを省略できます。

```svelte
{#await promise}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise was fulfilled -->
	<p>The value is {value}</p>
{/await}
```

pending の状態を気にする必要がない場合は、最初のブロックを省略することもできます。

```svelte
{#await promise then value}
	<p>The value is {value}</p>
{/await}
```

同様に、エラー状態のみを表示したい場合は `then` ブロックを省略できます。

```svelte
{#await promise catch error}
	<p>The error is {error}</p>
{/await}
```

## {#key ...}

```svelte
<!--- copy: false  --->
{#key expression}...{/key}
```

key ブロックは式(expression)の値が変更されたときに、その中身を破棄して再作成します。

これは、ある値が変更されるたびに要素のトランジションを再生したい場合に便利です。

```svelte
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

コンポーネントを囲んで使用した場合、コンポーネントの再インスタンス化と再初期化をもたらします。

```svelte
{#key value}
	<Component />
{/key}
```
