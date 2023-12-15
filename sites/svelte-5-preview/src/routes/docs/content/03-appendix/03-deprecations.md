---
title: Deprecations
---

前のページにリストアップした[破壊的変更(breaking changes)](/docs/breaking-changes)を除いて、Svelte 5 は Svelte 4 をそのまま置き換えることができます。とは言うものの、Svelte の将来のバージョンで削除されることになる機能もありますので、将来の破壊的変更による影響を避けてもらうため、あなたのアプリをアップデートすることを推奨します。

## beforeUpdate と afterUpdate <!--beforeupdate-and-afterupdate-->

`beforeUpdate(fn)` は、現在のコンポーネントの内部で変更が起こる直前に `fn` コールバックが実行されるようスケジュールします。`afterUpdate(fn)` は、変更が適用された後に実行されるようスケジュールします。

これらの関数は何かが変更されると無差別に実行されます。代わりに `$effect.pre` と `$effect` を使用することで、特定のものが変更されたときにのみ、実されるようにすることができます。その違いについては、こちらの例をご覧ください — [`afterUpdate` を使用する場合](/#H4sIAAAAAAAAE21STW-DMAz9K140CSpVtJddUmDaj5i0aezAwKBI-VJi6CqU_74AY-WwiyPbz37PdibWCYme8Y-J6Voh4-zFWnZkdLOz40eUhNH3ZnDNHMl944SlstIVCWWNI5ig7gjdq21rQgjQOaMgWUuTSwRGqESCxhjXeijg0VNEphN8czgf4RYthMNlwxEqi66mweEd_HTeARzq9p5KsixL1uyGsA7HCNh1-tWxU5qmByhKmJY6aoz2RmImTZ8mbtBa6H4_10ZAqxUdpHudD0WxkB62fhVtKvewclX2DEmPRDPFtXYKXQL8Hop7kjG08dH_w8REmJ9lcfnpfhadr6vnV6FbcwWjuTKDR2VGLKYUl6n_brEcAbNGCtT0thxj897jLQOc1p5C2yFuPn6LomKu1j1WDL4iAx9rOcTGO3kBYk1uy2lZQchPtoxfSJlWdAJbxskNGD7DD-pLlz59AgAA)、コールバックは `mousemove` イベントごとに実行されますが、[`$effect` を使用する場合](/#H4sIAAAAAAAAE21SwW6EIBD9lSnZRDfZuHvphapN_6JN7cHqaEgQCIxuG8O_F7VUDw0JZOY93gxvmFknJDrG32em6gEZZy_GsAujb7MEbkJJGGKnR9ssmdw1VhgqK1WRRIJGa9s6KODkqCZMZ_jicLvAd9jBn58ij3AwaGsaLe7kx9uBYFG1O5RkWZZsaGQYi1MgHJQWOIAn7DpsKE3PUJQwr3eo0cppiZnUfZrYUSmhevhlRmHadtFBeuzvoSjWYueoVVHs7kgrt46eIemRaJG_13ZAmwDfU8EfGVKxHv3_iAD45VgNy6-7xyrfRsDvQrX6DlrxQY8OBz1hMae4vvhvBqv5mDVSoKLXdQgxegMf1nXTFMqMwfEw46JitlY9Vgw-QwU-1XIMwof2PIQ7uSnn1QKfX00Z_sOgW9EJbBknO6L_8D9aLfICSgIAAA==)、関数は `temperature` が変更されたときにのみ実行されます:

```diff
<script>
-	import { afterUpdate } from 'svelte';

	let coords = $state({ x: 0, y: 0 });
	let temperature = $state(50);
	let trend = $state('...');

	let prev = temperature;

-	afterUpdate(() => {
-		console.log('running afterUpdate');
+	$effect(() => {
+		console.log('running $effect');

		if (temperature !== prev) {
			trend = temperature > prev ? 'getting warmer' : 'getting cooler';
			prev = temperature;
		}
	});
</script>

<svelte:window on:mousemove={(e) => coords = { x: e.clientX, y: e.clientY } } />

<input type="range" bind:value={temperature} >
<p>{trend}</p>
```

`$effect` と `$effect.pre` を使用すると [rune モード](/docs/runes)になることにご注意ください — あわせて props と state を更新するのをお忘れなく。

## `immutable`

`immutable` コンパイラオプションは非推奨となります。代わりに rune モードを使用して、全ての状態を immutable にします (つまり、`object.property` に代入しても `object` 自身や別のプロパティを監視しているものは更新されません)。
