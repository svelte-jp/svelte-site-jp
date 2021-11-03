---
title: onDestroy
---

コンポーネントが破棄されたときにコードを実行するには、`onDestroy` を使いましょう。

例えば、コンポーネントの初期化時に `setInterval` 関数を追加し、それが不要になったらそれをクリーンアップすることができます。そうすることでメモリリークを防ぐことができます。

```html
<script>
	import { onDestroy } from 'svelte';

	let counter = 0;
	const interval = setInterval(() => counter += 1, 1000);

	onDestroy(() => clearInterval(interval));
</script>
```

コンポーネントの初期化中にライフサイクル関数を呼び出すことは重要ですが、それらを *どこ* から呼び出すかは重要ではありません。そのため、インターバルロジックを抽象化して `utils.js` のヘルパー関数にすることができます…

```js
import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}
```

…そして、それをコンポーネントにインポートします。

```html
<script>
	import { onInterval } from './utils.js';

	let counter = 0;
	onInterval(() => counter += 1, 1000);
</script>
```

何度かタイマーを開いたり閉じたりして、カウンターが動き続けCPU負荷が上昇することを確認してみてください。これは古いタイマーが削除されていないため、メモリリークが発生しているからです。例題を解く前にこのページを更新するのを忘れないでくださいね。
