---
title: The use directive
---

アクションは基本的に要素レベルのライフサイクル関数です。これらは以下のような場合に便利です。

- サードパーティライブラリとの連携
- 画像の遅延読み込み
- ツールチップ
- カスタムイベントハンドラの追加

このアプリでは、オレンジ色のモーダルを、その外側をクリックしたときに閉じるようにしたいと思います。このアプリには `outclick` イベント用のイベントハンドラがありますが、これはネイティブの DOM イベントではありません。このイベントを自分でディスパッチする必要があります。まず、`clickOutside` 関数をインポートします…

```js
import { clickOutside } from './click_outside.js';
```

…そして、それを要素と一緒に使用します。

```svelte
<div class="box" use:clickOutside on:outclick={() => (showModal = false)}>Click outside me!</div>
```

`click_outside.js` ファイルを開きます。トランジション関数と同様に、アクション関数は `node` (アクションが適用される要素) といくつかのオプションのパラメータを受け取り、アクションオブジェクトを返します。このオブジェクトは `destroy` 関数を持つことができ、要素がマウントされていないときに呼び出されます。

ユーザがオレンジ色のボックスの外側をクリックしたときに、`outclick` イベントを発生させたいと考えています。考えられる実装の1つは以下のようになります。

```js
export function clickOutside(node) {
	const handleClick = (event) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
```

`clickOutside` 関数を更新し、ボタンをクリックしてモーダルを表示し、モーダルの外側をクリックしてモーダルを閉じてみてください。
