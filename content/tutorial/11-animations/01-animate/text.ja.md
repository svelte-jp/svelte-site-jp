---
title: The animate directive
---

[前の章]（チュートリアル/遅延遷移）では、要素が1つのToDoリストから別のリストに移動するときに、遷移の遅延を使用して動きの錯覚を作成しました。

To complete the illusion, we also need to apply motion to the elements that *aren't* transitioning. For this, we use the `animate` directive.

この錯覚を完成させるには、遷移して *いない* 要素にモーションを適用する必要もあります。このために、 `animate` ディレクティブを使用します。

最初に `flip` 関数を — flip は ['First, Last, Invert, Play'](https://aerotwist.com/blog/flip-your-animations/) の略です — `svelte/animate` からインポートします

```js
import { flip } from 'svelte/animate';
```

次に、それを `<label>` 要素に追加します。 

```html
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip
>
```

この場合、動きが少し遅いので、`duration`パラメータを追加することができます。

```html
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip="{{duration: 200}}"
>
```

> `duration` は `d => ミリ秒` 関数にもなります。この `d` は，要素が移動する必要があるピクセル数です．


注意、すべてのトランジションとアニメーションは JavaScript ではなく CSS で適用されています。これはメインスレッドをブロックしない（もしくはブロックされない）ことを意味します。