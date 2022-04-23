---
title: Spring
---

関数 `spring` は `tweened` の代替であり、頻繁に変化する値に対してよりよく機能することが多いです。

この例では、2つのストアがあります。1つは円の座標を表し、もう1つはサイズを表します。それらをスプリングに変換してみましょう。

```html
<script>
	import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 });
	let size = spring(10);
</script>
```

両方のスプリングは、デフォルトの `stiffness` と `damping` の値を持っています。これはスプリングの、まあ…スプリング性を制御するものです。私達は、自分の初期値を指定することができます。

```js
let coords = spring({ x: 50, y: 50 }, {
	stiffness: 0.1,
	damping: 0.25
});
```

マウスを振り回して、スライダーをドラッグしてみて、スプリングの動作にどのように影響するかを感じてみてください。スプリングがまだ動いている間に値を調整することができることに注目してください。

Consult the [API reference](/docs#run-time-svelte-motion-spring) for more information.
