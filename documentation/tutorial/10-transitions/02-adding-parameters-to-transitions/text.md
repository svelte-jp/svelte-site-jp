---
title: Adding parameters
---

トランジション関数はパラメータを受け取ることができます。`fade` トランジションを `fly` に置き換えてください。

```svelte
<script>
	import { fly } from 'svelte/transition';
	let visible = true;
</script>
```

そして、`<p>` にいくつかのオプションと一緒にパラメータを設定してください。

```svelte
<p transition:fly={{ y: 200, duration: 2000 }}>Flies in and out</p>
```

トランジションは可逆的であることに注意してください。つまり、トランジションの最中にチェックボックスを切り替えると、開始位置や終了位置からではなく、現在の位置からトランジションをします。
