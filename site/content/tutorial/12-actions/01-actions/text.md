---
title: The use directive
---

アクションは基本的に要素レベルのライフサイクル関数です。これらは以下のような場合に便利です。

* サードパーティライブラリとの連携
* 画像の遅延読み込み
* ツールチップ
* カスタムイベントハンドラの追加

このアプリでは、オレンジ色のボックスを「pannable」にしたいと考えています。このアプリには `panstart`, `panmove`, そして `panend` イベント用のイベントハンドラがあります。しかしこれらはネイティブの DOM イベントではありません。これらのイベントは自分たちで送信しなければなりません。まず、`pannable` 関数をインポートします…

```js
import { pannable } from './pannable.js';
```

…そして、それを要素と一緒に使用します。

```html
<div class="box"
	use:pannable
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
	style="transform:
		translate({$coords.x}px,{$coords.y}px)
		rotate({$coords.x * 0.2}deg)"
></div>
```

`pannable.js` ファイルを開きます。トランジション関数と同様に、アクション関数は `node` といくつかのオプションのパラメータを受け取り、アクションオブジェクトを返します。このオブジェクトは `destroy` 関数を持つことができ、要素がマウントされていないときに呼び出されます。

ユーザが要素の上でマウスダウンしたときに `panstart` イベントを、ドラッグしたときに `panmove` イベント (マウスがどのくらい移動したかを示す `dx` と `dy` プロパティを持つ) を、マウスアップしたときに `panend` イベントを発生させたいと考えています。考えられる実装の1つは以下のようになります。

```js
export function pannable(node) {
	let x;
	let y;

	function handleMousedown(event) {
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x, y }
		}));

		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
	}

	function handleMousemove(event) {
		const dx = event.clientX - x;
		const dy = event.clientY - y;
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(new CustomEvent('panmove', {
			detail: { x, y, dx, dy }
		}));
	}

	function handleMouseup(event) {
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(new CustomEvent('panend', {
			detail: { x, y }
		}));

		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}

	node.addEventListener('mousedown', handleMousedown);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}
```

`pannable` 関数を更新して、ボックスを移動させてみてください。

> この実装はデモ用のものです。-- より完全なものは、タッチイベントも考慮しています。
