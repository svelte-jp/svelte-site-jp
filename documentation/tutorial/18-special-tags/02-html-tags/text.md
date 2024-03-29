---
title: HTML tags
---

通常、文字列はプレーンテキストとして挿入され、`<`や`>`のような文字は特別な意味を持ちません。

しかし、HTMLをコンポーネントに直接レンダリングする必要がある場合もあります。例えば、あなたが今読んでいる文章はマークダウンファイルに存在し、HTMLのblobとしてこのページに含まれています。

Svelteでは、`{@html ...}` という特別なタグを使ってこれを行います。

```svelte
<p>{@html string}</p>
```

> **Warning!** Svelte は DOM に挿入される前に `{@html ...}` 内の式のサニタイズを行いません。違う言い方をすれば、この機能を使用する場合は信頼できないソースから来た HTML を手動でエスケープすることが **重要** です、そうしないとユーザーをXSS攻撃にさらす危険性があります。
