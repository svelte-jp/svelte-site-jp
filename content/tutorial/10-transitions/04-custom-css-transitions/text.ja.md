---
title: カスタム CSS トランジション
---

`svelte/transition` モジュールにはいくつかのトランジションが組み込まれていますが、独自のトランジションを簡単に作成することができます。例として、これは `fade` トランジションのソースです。

```js
function fade(node, {
	delay = 0,
	duration = 400
}) {
	const o = +getComputedStyle(node).opacity;

	return {
		delay,
		duration,
		css: t => `opacity: ${t * o}`
	};
}
```

この関数は、トランジションが適用されるノードと渡されたパラメータの2つの引数を取り、下記のプロパティをもつトランジションオブジェクトを返します。

* `delay` — トランジション開始までのミリ秒
* `duration` — ミリ秒単位でのトランジションの長さ
* `easing` — `p => t` イージング関数 ( [tweening](tutorial/tweened) の章を参照)
* `css` — `u === 1 - t` であるような `(t, u) => css` 関数
* `tick` — ノードに何らかの影響を与えるような `(t, u) => {...}` 関数

`t` 値は、イントロの開始やアウトロの終了時点では `0` であり、イントロの終了やアウトロの開始時点では `1` となります。

CSS アニメーションが可能な限りジャンクを防ぐためにメインスレッドを開放するように、ほとんどの場合、`tick` プロパティではなく `css` プロパティを返す必要があります。Svelte は、トランジションを「シミュレート」し、 CSS アニメーションを作成してから実行させます。

たとえば、`fade` トランジションは次のような CSS アニメーションを生成します。

```css
0% { opacity: 0 }
10% { opacity: 0.1 }
20% { opacity: 0.2 }
/* ... */
100% { opacity: 1 }
```

しかし、もっと独創的なものを作れます。本当に余計なトランジションを作ってみましょう。

```html
<script>
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let visible = true;

	function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		};
	}
</script>
```

忘れないで、大いなる力には大きな責任が伴います。
