---
title: 自動サブスクリプション
---

前の例でアプリは動きましたが、微妙なバグがあります。`unsubscribe` 関数が決して呼び出されません。仮に、コンポーネントが何度もインスタンス化および破棄されるなら、*メモリリーク* が発生することになるでしょう。

これを修正する1つの方法は、`onDestroy` [ライフサイクルフック](tutorial/ondestroy)を使うことです。

```html
<script>
	import { onDestroy } from 'svelte';
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	let count_value;

	const unsubscribe = count.subscribe(value => {
		count_value = value;
	});

	onDestroy(unsubscribe);
</script>

<h1>The count is {count_value}</h1>
```

ただし、このやり方は、特にコンポーネントが複数のストアにサブスクライブしている場合に、少し定型的になり始めます。代わりに、Svelte には巧妙な工夫が施されています。ストア名の前に `$` を付けることで、ストアの値を参照できます。

```html
<script>
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';
</script>

<h1>The count is {$count}</h1>
```

> 自動サブスクリプションは、コンポーネントの最上位スコープで宣言（またはインポート）されたストア変数でのみ機能します。

`$count` の使用はマークアップ内に限定されません。イベントハンドラやリアクティブ宣言など、`<script>` のどこでも使用できます。

> `$` で始まる名前はストア値を参照していると見なされます。これは事実上の予約文字です。Svelte では `$` プレフィックスを使った独自変数を宣言できません。