---
title: Universal reactivity
---

Svelte 5 ではリアクティブな state を、コンポーネントのトップレベルだけでなくアプリのどこにでも作成することができます。

以下のようなコンポーネントがあるとします:

```svelte
<script>
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button onclick={increment}>
	clicks: {count}
</button>
```

このロジックを関数にカプセル化することで、複数の場所で使用できるようになります:

```diff
<script>
+	function createCounter() {
		let count = $state(0);

		function increment() {
			count += 1;
		}

+		return {
+			get count() { return count },
+			increment
+		};
+	}
+
+	const counter = createCounter();
</script>

-<button onclick={increment}>
-	clicks: {count}
+<button onclick={counter.increment}>
+	clicks: {counter.count}
</button>
```

> 戻り値のオブジェクトで [`get` プロパティ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) を使用していることに注目してください。これによって `counter.count` は、`createCounter` 関数が呼ばれたときの値ではなく、常に現在の値を参照します。

また、この関数を別の `.svelte.js` (または `.svelte.ts`) モジュールに抽出することもできます…

```js
export function createCounter() {
	let count = $state(0);

	function increment() {
		count += 1;
	}

	return {
		get count() {
			return count;
		},
		increment
	};
}
```

…そしてコンポーネントでインポートすると:

```diff
<script>
+	import { createCounter } from './counter.svelte.js';
-	function createCounter() {...}

	const counter = createCounter();
</script>

<button onclick={counter.increment}>
	clicks: {counter.count}
</button>
```

[この例を playground でご覧ください。](/#H4sIAAAAAAAAE2VQ0U7DMAz8FStC2iaqDl67dhLiMxgPI3NRRutUiYNAVf6dJG1TBk-W7bvznUfRqg6tqF5GQeceRSWehkEUgr-H2NhP7BhDb7UzMk5qK40a-HiiE6t-0IZhBGnwzPisHTEa8NAa3cOm3MtpUk4y5dVuDoEXmFKTZZjX0NwKbHcBVe_XQ1S_OWZNoEl2Sn404yKsKDB7JPbJUNraCvI-VR_VJoVjiNLri2oVXkTFxqEvcvJbt-sTrvb3A_ArhW4dSVbB0x_rMEYjHc7pQrY7ywGwfdjN2TMzm19Y8S-Rc9_AYwRH57EYZGdowbwv2istQ9L8MA19MdV8JimGpf__hFf_Ay1mGDQKAgAA)

## Stores equivalent

Svelte 4 でこれを行うには、[カスタムの store](https://learn.svelte.jp/tutorial/custom-stores) を作成します。以下のようになるでしょう:

```js
import { writable } from 'svelte/store';

export function createCounter() {
	const { subscribe, update } = writable(0);

	function increment() {
		update((count) => count + 1);
	}

	return {
		subscribe,
		increment
	};
}
```

コンポーネントに戻り、store に `$` プリフィクスをつけて store の値を取得します:

```diff
<script>
	import { createCounter } from './counter.js';

	const counter = createCounter();
</script>

<button onclick={counter.increment}>
-	clicks: {counter.count}
+	clicks: {$counter}
</button>
```

store のアプローチには重大な欠点がありました。counter は最もシンプルなカスタム store ですが、それでもコードの書き方を完全に変更する必要があります — `writable` をインポートし、その API を理解し、`subscribe` と `update` の参照を取得し、`increment` の実装を `count += 1` からよりわかりにくいものに変更し、store の名前に `$` プリフィクスを付けて値を取得します。理解しなければいけないことがとても多いです。

rune では、既存のコードをコピーして新しい関数にするだけです。

## Gotchas

リアクティビティは魔法のように関数の境界を越えることはありません。言い換えると、`get` プロパティから通常のプロパティに置き換えると動作しなくなるということです…

```diff
export function createCounter() {
	let count = $state(0);

	function increment() {
		count += 1;
	}

	return {
-		get count() { return count },
+		count,
		increment
	};
}
```

…なぜなら戻り値のオブジェクトの `count` の値は常に `0` だからです。`$state` rune を使用してもその事実は代わりません — 単純に、テンプレートや effect の内側で `count` を読み取るときに (`get` プロパティ経由であれ、通常の関数経由であれ)、Svelte は `count` が変更されたときに何を更新すべきかを把握している、というだけです。
