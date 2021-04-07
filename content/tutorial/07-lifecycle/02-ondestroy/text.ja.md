---
title: onDestroy
---

コンポーネントが破棄されたときにコードを実行するには、`onDestroy` を使いましょう。

例えば、コンポーネントの初期化時に `setInterval` 関数を追加し、それが不要になったらそれをクリーンアップすることができます。そうすることでメモリリークを防ぐことができます。

```html
<script>
	import { onDestroy } from 'svelte';

	let seconds = 0;
	const interval = setInterval(() => seconds += 1, 1000);

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

	let seconds = 0;
	onInterval(() => seconds += 1, 1000);
</script>
```