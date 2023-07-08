---
title: Shorthand class directive
---

多くの場合、クラスの名前はそれが依存する値の名前と同じになります。

<!-- prettier-ignore -->
```svelte
<div class:big={big}>
	<!-- ... -->
</div>
```

そのような場合は、ショートハンドを使うことができます。

```svelte
<div class:big>
	<!-- ... -->
</div>
```
