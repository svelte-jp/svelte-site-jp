---
title: onMount
---

すべてのコンポーネントには、作成される時を開始とし、破棄される時に終了とする *ライフサイクル* があります。その重要なタイミングにコードを実行できるようにする関数がいくつかあります。

最も頻繁に使用するのは `onMount` で、これはコンポーネントが最初に DOM にレンダリングされた後に実行されます。[以前](tutorial/bind-this)、レンダリング後に `<canvas>` 要素を操作する必要があったときに、これによく遭遇しました。

`onMount` ハンドラにネットワークからデータを読み込む処理を追加します。

```html
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});
</script>
```

> サーバサイドレンダリング(SSR)の関係上、`<script>` の最上位ではなく `onMount` の中に `fetch` を置くことを推奨します。`onDestroy` 以外のライフサイクル関数は SSR中には実行されません、つまりコンポーネントが DOM にマウントされた後に遅れてデータがフェッチされ読み込まれることを回避できます。

ライフサイクル関数は、コールバックがコンポーネントのインスタンスにバインドされるように、コンポーネントの初期化中に呼び出されなければなりません。例えば、`setTimeout` の中で呼び出されてはいけません。

もし `onMount` コールバックが関数を返す場合、その関数はコンポーネントが破棄されたときに呼び出されます。