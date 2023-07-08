---
title: svelte
---

`svelte` パッケージは、[ライフサイクル関数](https://learn.svelte.jp/tutorial/onmount) と [context API](https://learn.svelte.jp/tutorial/context-api) を公開します。

## `onMount`

> EXPORT_SNIPPET: svelte#onMount

`onMount` 関数は、コンポーネントが DOM にマウントされるとすぐに実行されるコールバックをスケジュールします。これはコンポーネントの初期化中に呼び出されなければなりません (ただし、コンポーネントの _中に_ に置く必要はありません。外部モジュールから呼び出すことができます)。

`onMount` は [サーバーサイドコンポーネント](/docs/server-side-component-api) の内部では実行されません。

```svelte
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('the component has mounted');
	});
</script>
```

`onMount` から関数が返された場合、それはコンポーネントがアンマウントされたときに呼び出されます。

```svelte
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const interval = setInterval(() => {
			console.log('beep');
		}, 1000);

		return () => clearInterval(interval);
	});
</script>
```

> この挙動は、`onMount` に渡された関数が _同期的に_ 値を返す場合にのみ動作します。`async` の関数は常に `Promise` を返すため、 _同期的に_ 値を返すことはできません。

## `beforeUpdate`

> EXPORT_SNIPPET: svelte#beforeUpdate

状態(state)が変化した後、コンポーネントが更新される直前に実行されるコールバックをスケジュールします。

> このコールバックが最初に実行されるのは、最初の `onMount` の前になります。

```svelte
<script>
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		console.log('the component is about to update');
	});
</script>
```

## `afterUpdate`

> EXPORT_SNIPPET: svelte#afterUpdate

コンポーネントが更新された直後に実行するコールバックをスケジュールします。

> このコールバックが最初に実行されるのは、最初の `onMount` の後になります。

```svelte
<script>
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		console.log('the component just updated');
	});
</script>
```

## `onDestroy`

> EXPORT_SNIPPET: svelte#onDestroy

コンポーネントがアンマウントされる直前に実行されるコールバックをスケジュールします。

`onMount`, `beforeUpdate`, `afterUpdate`, `onDestroy` のうち、`onDestroy` だけがサーバサイドコンポーネントの中で動作します。

```svelte
<script>
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		console.log('the component is being destroyed');
	});
</script>
```

## `tick`

> EXPORT_SNIPPET: svelte#tick

保留中の状態(pending state)の変更が適用されると resolve する promise を返すか、何もない場合は、その次のマイクロタスクで実行されます。

```svelte
<script>
	import { beforeUpdate, tick } from 'svelte';

	beforeUpdate(async () => {
		console.log('the component is about to update');
		await tick();
		console.log('the component just updated');
	});
</script>
```

## `setContext`

> EXPORT_SNIPPET: svelte#setContext

任意の `context` オブジェクトを、現在のコンポーネントと指定された `key` に関連付け、そのオブジェクトを返します。その context は、コンポーネントの子 (slot のコンテンツを含む) で、`getContext` を使用して利用できるようになります。

ライフサイクル関数と同様に、これはコンポーネントの初期化時に呼ばれなければなりません。

```svelte
<script>
	import { setContext } from 'svelte';

	setContext('answer', 42);
</script>
```

> context は本質的にリアクティブではありません。context にリアクティブな値が必要な場合は、context にストアを渡すことができます。これはリアクティブになります。

## `getContext`

> EXPORT_SNIPPET: svelte#getContext

指定された `key` を持つ、最も近い親コンポーネントに属する context を取得します。コンポーネントの初期化中に呼び出されなければなりません。

```svelte
<script>
	import { getContext } from 'svelte';

	const answer = getContext('answer');
</script>
```

## `hasContext`

> EXPORT_SNIPPET: svelte#hasContext

与えられた `key` が親コンポーネントの context に設定されているかどうかをチェックします。コンポーネントの初期化時に呼び出されなければなりません。

```svelte
<script>
	import { hasContext } from 'svelte';

	if (hasContext('answer')) {
		// do something
	}
</script>
```

## `getAllContexts`

> EXPORT_SNIPPET: svelte#getAllContexts

最も近い親コンポーネントにある全ての context マップを取得します。これはコンポーネントの初期化中に呼び出す必要があります。例えば、プログラムでコンポーネントを作成し、既存の context を渡したい場合などに便利です。

```svelte
<script>
	import { getAllContexts } from 'svelte';

	const contexts = getAllContexts();
</script>
```

## `createEventDispatcher`

> EXPORT_SNIPPET: svelte#createEventDispatcher

[コンポーネントイベント](/docs/component-directives#on-eventname) をディスパッチするのに使用できるイベントディスパッチャを作成します。 イベントディスパッチャは、`name` と ` detail` の2つの引数を取る関数です。 

`createEventDispatcher` で作成されたコンポーネントイベントは [CustomEvent](https://developer.mozilla.org/ja/docs/Web/API/CustomEvent) を作成します。これらのイベントは[バブリング(Bubbling)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture)しません。引数 `detail` は [CustomEvent.detail](https://developer.mozilla.org/ja/docs/Web/API/CustomEvent/detail) プロパティに対応し、任意のタイプのデータを含むことができます。

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('notify', 'detail value')}>Fire Event</button>
```

子コンポーネントからディスパッチされたイベントは、親でリスンできます。イベントがディスパッチされたときに提供されたデータはすべて、イベントオブジェクトの `detail` プロパティで利用できます。 

```svelte
<script>
	function callbackFunction(event) {
		console.log(`Notify fired! Detail: ${event.detail}`);
	}
</script>

<Child on:notify={callbackFunction} />
```

dispatch 関数に3番目のパラメータを渡すことで、イベントがキャンセルできるようになります。もしイベントが `event.preventDefault()` によってキャンセルされると、その関数は `false` を返します。それ以外の場合は `true` を返します。

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function notify() {
		const shouldContinue = dispatch('notify', 'detail value', { cancelable: true });
		if (shouldContinue) {
			// no one called preventDefault
		} else {
			// a listener called preventDefault
		}
	}
</script>
```

イベントディスパッチャを型付けすることで、受け取るイベントを定義することができます。これにより、コンポーネント内でも(間違った呼び出しはフラグが立つ)、コンポーネントを使用する場合でも(イベントの型が絞れる)、コードがより型安全になります。その方法については[こちら](typescript#script-lang-ts-events)をご参照ください。

## Types

> TYPES: svelte
