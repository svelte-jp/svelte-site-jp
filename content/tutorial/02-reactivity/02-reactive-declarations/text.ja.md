---
title: Declarations
---

Svelte は、コンポーネントの状態が変化すると自動的に DOM を更新します。しばしば、コンポーネントの状態のいくつかの部分は、*他の*部分(例えば `firstname` と `lastname` から派生した `fullname` など)から計算され、それらが変更されるたびに再計算される必要があります。

こういったことのために、*reactive declarations* があります。これは次のように書かれます。

```js
let count = 0;
$: doubled = count * 2;
```

> これが少し異質に見えても心配しないでください。これは（見慣れないかもしれませんが） [正しい](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) JavaScript で、Svelte は「参照される値が変わるたびにこのコードを再実行する」という意味だと解釈します。一度慣れてしまえば、もう後戻りはできません。

マークアップで `doubled` を使ってみましょう。

```html
<p>{count} doubled is {doubled}</p>
```

もちろん、代わりに `{count * 2}` とマークアップに書くだけでもよいでしょう。リアクティブな値を使用する必要はありません。リアクティブな値は、複数回参照する必要がある場合や、*他の* リアクティブな値に依存する値がある場合に特に価値があります。
