---
title: Component events
---

コンポーネントはイベントを発信することもできます。そのためには、イベントディスパッチャを作成する必要があります。`Inner.svelte` を更新してください。

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
```

> `createEventDispatcher` はコンポーネントを最初にインスタンス化するときに呼び出す必要があります。（後から `setTimeout` のコールバックなどの内側で呼び出すことはできません。）これにより `dispatch` をコンポーネントインスタンスに関連づけます。

`App` コンポーネントは `Inner` コンポーネントによってディスパッチされたメッセージを `on:message` ディレクティブによって受信していることに注目してください。このディレクティブは、`on:` の前にディスパッチするイベント名(この場合は `message`)を付加した属性です。

この属性がない場合、メッセージはディスパッチされますが、アプリはそれに反応しません。`on:message`属性を削除して、もう一度ボタンを押してみてください。

> イベント名を他のものに変更してみることもできます。例えば、`Inner.svelte` の `dispatch('message')` を `dispatch('myevent')` に変更し、`App.svelte` コンポーネントの属性名を `on:message` から `on:myevent` に変更します。
