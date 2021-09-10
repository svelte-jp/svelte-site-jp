---
title: イベント修飾子
---

DOM イベントハンドラには、それらの動作を変更する修飾子（*modifiers*）を設定することができます。たとえば、`once` 修飾子をハンドラに設定すると、1回だけ実行します。

```html
<script>
	function handleClick() {
		alert('no more alerts')
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>
```

イベント修飾子の一覧:

* `preventDefault` — ハンドラを実行する前に `event.preventDefault()` を呼び出します。たとえば、クライアントのフォーム処理に役立ちます。
* `stopPropagation` — 次の要素にイベントが伝播しないように `event.stopPropagation()` を呼び出します。
* `passive` — タッチ/ホイールイベントでスクロールのパフォーマンスを向上させます（Svelte が安全な場所に自動的に追加します）。
* `nonpassive` — `passive: false` を明示的に設定します。
* `capture` — *バブリング* フェーズではなく、*キャプチャ* フェーズ中にハンドラを起動します。([MDN docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture))
* `once` — ハンドラを最初に実行した後に削除します。
* `self` — 設定した要素が event.target の場合にのみ、ハンドラをトリガします。
* `trusted` — `event.isTrusted` が `true` の場合にのみハンドラをトリガします。つまり、ユーザーのアクションによってイベントがトリガされた場合です。

イベント修飾子を連結することができます。（例）`on:click|once|capture={...}`
