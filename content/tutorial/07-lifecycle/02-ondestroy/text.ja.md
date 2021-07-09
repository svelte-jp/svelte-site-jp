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

Open and close the timer a few times and make sure the counter keeps ticking and the CPU load increases. This is due to a memory leak as the previous timers are not deleted. Don't forget to refresh the page before solving the example.