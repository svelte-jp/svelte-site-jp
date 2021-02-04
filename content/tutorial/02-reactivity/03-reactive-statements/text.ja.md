---
title: Statements
---

リアクティブな *値* を宣言するだけでなく、任意の *ステートメント* をリアクティブに実行することもできます。
例えば、`count` の値が変化するたびにログを取ることができます。

```js
$: console.log(`the count is ${count}`);
```

ブロックで簡単にステートメントをグループ化することができます。

```js
$: {
	console.log(`the count is ${count}`);
	alert(`I SAID THE COUNT IS ${count}`);
}
```

`if` ブロックなどの前に `$:` を置くこともできます。

```js
$: if (count >= 10) {
	alert(`count is dangerously high!`);
	count = 9;
}
```