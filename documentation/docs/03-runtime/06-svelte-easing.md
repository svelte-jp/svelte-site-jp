---
title: 'svelte/easing'
---

イージング関数は、時間の経過に伴う変化の割合を指定するもので、Svelte に組み込まれたトランジションやアニメーション、tweened や spring ユーティリティを使用する際に便利です。`svelte/easing` には、31の名前付きエクスポートが含まれています。`linear` イージング、10種類のイージング関数の3つのバリエーション `in`, `out`, `inOut` です。

[examples section](/examples) の [ease visualiser](/examples/easing) で様々なイージングを試すことができます。

| ease        | in          | out          | inOut          |
| ----------- | ----------- | ------------ | -------------- |
| **back**    | `backIn`    | `backOut`    | `backInOut`    |
| **bounce**  | `bounceIn`  | `bounceOut`  | `bounceInOut`  |
| **circ**    | `circIn`    | `circOut`    | `circInOut`    |
| **cubic**   | `cubicIn`   | `cubicOut`   | `cubicInOut`   |
| **elastic** | `elasticIn` | `elasticOut` | `elasticInOut` |
| **expo**    | `expoIn`    | `expoOut`    | `expoInOut`    |
| **quad**    | `quadIn`    | `quadOut`    | `quadInOut`    |
| **quart**   | `quartIn`   | `quartOut`   | `quartInOut`   |
| **quint**   | `quintIn`   | `quintOut`   | `quintInOut`   |
| **sine**    | `sineIn`    | `sineOut`    | `sineInOut`    |

<!-- TODO -->

<!--
<div class="max">
	<iframe
		title="Aphrodite example"
		src="/repl/easing"
		scrolling="no"
	></iframe>
</div> -->
