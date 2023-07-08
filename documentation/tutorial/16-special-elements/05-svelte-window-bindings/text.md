---
title: <svelte:window> bindings
---

また、`window` の特定のプロパティ、例えば `scrollY` のようなプロパティにバインドすることもできます。7行目を更新してください。

```svelte
<svelte:window bind:scrollY={y} />
```

バインドできるプロパティの一覧は以下の通りです。

- `innerWidth`
- `innerHeight`
- `outerWidth`
- `outerHeight`
- `scrollX`
- `scrollY`
- `online` — `window.navigator.onLine` の別名です

`scrollX` と `scrollY` 以外はすべて読み取り専用です。
