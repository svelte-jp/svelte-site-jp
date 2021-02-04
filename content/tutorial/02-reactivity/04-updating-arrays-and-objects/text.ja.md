---
title: Updating arrays and objects
---

Svelte のリアクティビリティは代入によってトリガーされるので、`push` や `splice` のような配列メソッドを使っても自動的には更新されません。例えば、ボタンをクリックしても何もしません。

これを修正する1つの方法は、あるいは以下のような冗長な代入を追加することです。

```js
function addNumber() {
	numbers.push(numbers.length + 1);
	numbers = numbers;
}
```

しかし、もっと広く使われている解決策があります。

```js
function addNumber() {
	numbers = [...numbers, numbers.length + 1];
}
```

`pop`, `shift`, `unshift`, `splice` の代わりに、似たようなパターンを使うことができます。

配列やオブジェクトの *プロパティ* への代入 - 例：`obj.foo += 1` または `array[i] = x` - はそれらの値への代入と同じように動作します。

```js
function addNumber() {
	numbers[numbers.length] = numbers.length + 1;
}
```

簡単な経験則: 更新される変数の名前は、代入の左辺に置かなければなりません。例えばこの場合は...

```js
const foo = obj.foo;
foo.bar = 'baz';
```

... `obj = obj` を追記しない限り、`obj.foo.bar` への参照は更新されません。