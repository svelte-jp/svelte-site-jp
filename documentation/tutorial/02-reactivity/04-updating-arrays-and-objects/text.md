---
title: Updating arrays and objects
---

Svelte のリアクティビティは代入によってトリガーされます。配列やオブジェクトを変更するようなメソッドでは、その更新がトリガーされません。

こちらの例では、"Add a number" ボタンをクリックして `addNumber` 関数を呼び出しますが、配列に数値が追加されるものの `sum` の再計算はトリガーされません。

これを修正する方法の1つとして、`numbers` に `numbers` 自身を代入することでその変更をコンパイラに教えることができます。

```js
function addNumber() {
	numbers.push(numbers.length + 1);
	numbers = numbers;
}
```

また、ES6 のスプレッド構文を使用してより簡潔に書くこともできます。

```js
function addNumber() {
	numbers = [...numbers, numbers.length + 1];
}
```

同じルールが、`pop`、`shift`、`splice` などの配列のメソッドや、`Map.set`、`Set.add` などのオブジェクトのメソッドにも適用されます。

配列やオブジェクトの _プロパティ_ への代入（例：`obj.foo += 1` や `array[i] = x`）は値自体への代入と同じように動作します。

```js
function addNumber() {
	numbers[numbers.length] = numbers.length + 1;
}
```

ただし、以下のケースのような参照への間接的な代入は…

```js
const foo = obj.foo;
foo.bar = 'baz';
```

または

```js
function quox(thing) {
	thing.foo.bar = 'baz';
}
quox(obj);
```

…`obj.foo.bar` に対するリアクティビティはトリガーされません。もしトリガーしたければ、`obj = obj` を続けて書く必要があります。

大まかなまとめ: 更新される変数は代入の左側に直接置かなければならない。
