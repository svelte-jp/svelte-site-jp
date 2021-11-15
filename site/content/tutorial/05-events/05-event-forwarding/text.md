---
title: Event forwarding
---

DOM イベントとは異なり、コンポーネントのイベントは *バブル* しません。もし深くネストされたコンポーネントでイベントをリッスンする場合、中間コンポーネントはイベントを *フォワード* する必要があります。

今回のケースでは、[前のチャプタ](tutorial/component-events)と同じように `App.svelte` と `Inner.svelte` がありますが、`<Inner/>` を含む `Outer.svelte` コンポーネントがあります。

この問題を解決する1つの方法は、`Outer.svelte` に `createEventDispatcher` を追加して、`message` イベントをリッスンして、そのハンドラを作成することです。

```html
<script>
	import Inner from './Inner.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('message', event.detail);
	}
</script>

<Inner on:message={forward}/>
```

しかし、これでは書くコードが多いので、Svelte は同等のショートハンドを提供します。値のない `on:message` イベントディレクティブは「全ての `message` イベントをフォワードする」ことを意味します。

```html
<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>
```
