---
title: Declarations
---

Svelte のリアクティビティは、前のセクションで示したようにアプリケーションの変数とDOMを同期させて維持させるだけでなく、リアクティブ宣言(reactive declarations)を使用して変数と変数を同期させて維持させることもできます。次のように記述します:

```js
let count = 0;
$: doubled = count * 2;
```

> これが少し異質に見えても心配しないでください。これは（見慣れないかもしれませんが） [正しい](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) JavaScript で、Svelte は「参照される値が変わるたびにこのコードを再実行する」という意味だと解釈します。一度慣れてしまえば、もう後戻りはできません。

マークアップで `doubled` を使ってみましょう。

```svelte
<p>{count} doubled is {doubled}</p>
```

もちろん、代わりに `{count * 2}` とマークアップに書くだけでもよいでしょう。リアクティブな値を使用する必要はありません。リアクティブな値は、複数回参照する必要がある場合や、 _他の_ リアクティブな値に依存する値がある場合に特に価値があります。
