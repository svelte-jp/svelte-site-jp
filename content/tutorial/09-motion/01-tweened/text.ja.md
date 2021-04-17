---
title: Tweened
---

値を設定して DOM が自動的に更新されるのを見るのは最高です。もっと最高なのは？それらの値を *トゥイーン* することです。Svelte には、変化を伝えるためにアニメーションを使用するスムーズなユーザーインターフェースを構築するためのツールが含まれています。

まず `progress` ストアを `tweened` 値に変更してみましょう。

```html
<script>
	import { tweened } from 'svelte/motion';

	const progress = tweened(0);
</script>
```

ボタンをクリックすると、プログレスバーが新しい値にアニメーションします。しかし、これは少し機械的で満足感がありません。イージング機能を追加する必要があります。

```html
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>
```

> `svelte/easing` モジュールには [Penner easing equations](https://web.archive.org/web/20190805215728/http://robertpenner.com/easing/) が含まれています、あるいは `p` と `t` の両方が 0 から 1 の間の値を取る独自の `p => t` 関数を指定することもできます。

`tweened` で利用可能なオプションの一覧です。

* `delay` — トゥイーン開始までのミリ秒
* `duration` — ミリ秒単位のトゥイーンの持続時間、または(例えば値の変化が大きい場合に、より長いトゥイーンを指定出来るようにするための）`(from, to) => milliseconds` 関数
* `easing` — `p => t` 関数
* `interpolate` — 任意の値の間を補間するための自前の `(from, to) => t => value` 関数。デフォルトでは、Svelte は数値や日付、同じ形の配列やオブジェクトの間を補間します (数値や日付、その他の有効な配列やオブジェクトのみを含む場合に限ります)。(例えば) 色文字列や変換行列を補間したい場合は、自前の関数を指定してください。

これらのオプションを `progress.set` や `progress.update` に第二引数として渡すこともでき、どちらの場合もデフォルトを上書きします。`set` と `update`メソッドは、いずれもトゥイーンが完了した時点で resolve する promise を返します。