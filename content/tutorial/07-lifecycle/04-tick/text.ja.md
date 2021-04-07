---
title: tick
---

`tick` 関数は他のライフサイクル関数とは異なり、コンポーネントが最初に初期化されたときだけでなく、いつでも呼び出すことができます。この関数は、保留中の状態変更が DOM に適用されるとすぐに (保留中の状態変更がない場合はすぐに) resolve する promise を返します。

Svelte でコンポーネントの状態を更新しても、すぐに DOM を更新するわけではありません。その代わりに、次の *マイクロタスク* まで待って、他のコンポーネントも含めて適用する必要のある変更があるかどうかを確認します。そうすることで不要な作業を回避し、ブラウザはより効果的にバッチ処理を行うことができます。

この例では、その動作を見ることができます。テキストの範囲を選択してタブキーを押します。`<textarea>` の値が変更されるため、現在の選択範囲がクリアされ、カーソルが最後までジャンプしてしまいます。これは `tick` をインポートすることで修正できます。

```js
import { tick } from 'svelte';
```

そして `handleKeydown` の最後に `this.selectationStart` と `this.selectationEnd` を設定する直前に実行します。

```js
await tick();
this.selectionStart = selectionStart;
this.selectionEnd = selectionEnd;
```