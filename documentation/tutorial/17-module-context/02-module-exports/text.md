---
title: Exports
---

`context="module"` スクリプトブロックからエクスポートされたものはすべてモジュール自体からのエクスポートになります。もし、`AudioPlayer.svelte` から `stopAll` 関数をエクスポートすると…

```svelte
<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach((element) => {
			element.pause();
		});
	}
</script>
```

…そしてそれを `App.svelte` でインポートすることができます…

```svelte
<script>
	import AudioPlayer, { stopAll } from './AudioPlayer.svelte';
</script>
```

…さらにそれをイベントハンドラで使うことができます。

```svelte
<button on:click={stopAll}> stop all audio </button>
```

> default export は使うことはできません、なぜならコンポーネントが default export だからです。
