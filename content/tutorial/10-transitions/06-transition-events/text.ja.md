---
title: Transition events
---

トランジションの開始と終了のタイミングを知ることができれば便利です。Svelteは他のDOMイベントと同様にリッスンすることができるイベントをディスパッチします。

```html
<p
	transition:fly="{{ y: 200, duration: 2000 }}"
	on:introstart="{() => status = 'intro started'}"
	on:outrostart="{() => status = 'outro started'}"
	on:introend="{() => status = 'intro ended'}"
	on:outroend="{() => status = 'outro ended'}"
>
	Flies in and out
</p>
```