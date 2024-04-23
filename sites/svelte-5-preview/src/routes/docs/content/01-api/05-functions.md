---
title: Functions
---

rune だけでなく、Svelte 5 では `getContext`、`setContext`、`tick` などの既存の関数に加えていくつか新しい関数が導入されます。これらの関数は、rune のようにコンパイラが触れる必要はなく、直接使用できるため、rune としてではなく関数として導入されます。しかし、これらの関数が Svelte の内部を使用する可能性はあります。

## `untrack`

`$effect`/`$derived` の依存(dependency)として扱われるのを防ぐには、`untrack` を使用します:

```svelte
<script>
	import { untrack } from 'svelte';

	let { a, b } = $props();

	$effect(() => {
		// this will run when `a` changes,
		// but not when `b` changes
		console.log(a);
		console.log(untrack(() => b));
	});
</script>
```

## `unstate`

`$state` で作成されたオブジェクトや配列からリアクティビティを取り除くには、`unstate` を使用します:

```svelte
<script>
	import { unstate } from 'svelte';

	let counter = $state({ count: 0 });

	$effect(() => {
		// Will log { count: 0 }
		console.log(unstate(counter));
	});
</script>
```

これは、リアクティブなオブジェクトが渡されることを想定していない外部ライブラリや API (例えば `structuredClone` など) に state を渡したいときに便利です。

> `unstate` はリアクティビティを取り除くのに引数から新しいオブジェクトを返すことにご注意ください。もしリアクティブでないオブジェクトが渡された場合は、そのまま返します。
