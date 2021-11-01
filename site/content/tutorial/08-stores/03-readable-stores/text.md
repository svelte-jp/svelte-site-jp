---
title: Readable stores
---

すべてのストアが、それらを参照しているものによって書き込み可能であるべきではありません。たとえば、マウスの位置やユーザーの地理的位置を表すストアがあり、それらの値を「外部」から設定できるのは意味がありません。そのような場合のために、読み取り可能なストアがあります。

`stores.js` タブをクリックしてください。`readable` の第1引数は初期値です。初期値がない場合は `null` や `undefined` をセットできます。第2引数は `set` コールバックを受け取り `stop` 関数を返す `start` 関数です。この `start` 関数は、ストアが最初のサブスクライバーを取得したときに呼び出されます。`stop` 関数は、最後のサブスクライバーがサブスクライブを解除したときに呼び出されます。

```js
export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
```
