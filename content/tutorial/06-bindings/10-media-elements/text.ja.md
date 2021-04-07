---
title: Media elements
---

`<audio>` と `<video>` 要素にはいくつかバインドできるプロパティがあります。この例では、その内のいくつかをお見せします。

116 行目に `currentTime={time}`、`duration`、`paused` プロパティを追加しバインドします:

```html
<video
  poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
  src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
  on:mousemove="{handleMousemove}"
  on:mousedown="{handleMousedown}"
  bind:currentTime="{time}"
  bind:duration
  bind:paused
></video>
```

> `bind:duration` は `bind:duration={duration}` に相当します

このとき動画をクリックすると、`time`、`duration`、`paused` が適宜更新されます。つまり、それらを使ってカスタムコントロールを構築することができるということです。

> 通常、 web 上では `timeupdate` イベントを検知することで `currentTime` を追跡しますが、これらのイベントはそれほど頻繁に発生しないため、結果的にぎこちない UI になってしまいます。それを Svelte は上手く処理しています — `requestAnimationFrame` を使用して `currentTime` をチェックすることで。

`<audio>` と `<video>` のバインディングの全セットは以下の通りです。 — 6つの _読み込み専用_ バインディング...

- `duration` (読み込み専用) — 動画の総再生時間（秒単位）
- `buffered` (読み込み専用) — `{start, end}` オブジェクトの配列
- `seekable` (読み込み専用) — 同上
- `played` (読み込み専用) — 同上
- `seeking` (読み込み専用) — 真偽値
- `ended` (読み込み専用) — 真偽値

...と5つの _双方向_ バインディングです:

- `currentTime` — 動画内の現在のポイント（秒単位）
- `playbackRate` — 動画の再生速度（`1` が 'normal'）
- `paused` — これは自明のこと
- `volume` — 0 から 1 の値
- `muted` — true はミュートを意味するブーリアン値

動画には読み取り専用の `videoWidth` と `videoHeight` バインディングも存在します。
