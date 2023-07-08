---
title: Group inputs
---

同じ値に関係する複数のinputがあるなら、`value`属性に加えて`bind:group`を使用できます。同じグループ内のラジオinputは相互に排他的で、同じグループ内のチェックボックスinputは選択された値の配列を形成します。 

各inputに`bind:group`を追加しましょう。

```svelte
<input type="radio" bind:group={scoops} name="scoops" value={1} />
```

この場合、チェックボックスinputを`each`ブロックに移動させることでコードをよりシンプルにすることができます。まず、`<script>`ブロックに`menu`変数を追加します。

```js
let menu = ['Cookies and cream', 'Mint choc chip', 'Raspberry ripple'];
```

…それから2つ目のセクションを置き換えます。

```svelte
<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type="checkbox" bind:group={flavours} name="flavours" value={flavour} />
		{flavour}
	</label>
{/each}
```

アイスクリームのメニューを新しいエキサイティングな方向に簡単に拡張できるようになりました。
