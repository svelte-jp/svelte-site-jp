---
title: Frequently asked questions
---

## 背景とモチベーション <!--background-and-motivations-->

### これは何ですか? <!--what-is-this-->

ここは Svelte 5 のプレビューサイトです！もし Svelte がなにか知らず、たまたまここに来られた方は、
まず [svelte.dev](https://svelte.dev) (日本語版: [svelte.jp](https://svelte.jp)) に行き、学んでいただくことをおすすめします。

### Svelte 5 の特徴は? <!--what-s-special-about-svelte-5-->

Svelte 5 は、Svelte を全面的に書き直したものです。あなたのアプリをより速く、より小さく、より堅牢にするために設計されています。

<em>rune</em> は、リアクティビティをコントロールするためのパワフルなプリミティブセットで、Svelte コンポーネントはもちろん、今回ついに `.svelte.js` と `.svelte.ts` モジュールでも使えるようになりました。rune については、ブログ記事の [Rune 導入](https://svelte.jp/blog/runes) を読んだり、そこにあるビデオを見たり、このサイトにある暫定的な [ドキュメント](/docs) を読んだりすることで学習できます。

### Svelte を学習するのが難しくなりませんか? <!--doesn-t-this-make-svelte-harder-to-learn-->

逆です(Au contraire)! 現時点の Svelte は、ある種のメンタルの体操が伴います:

- `let x` でリアクティブな state を宣言しますが、コンポーネントのトップレベルに限定されます
- `export let x` で prop を宣言しますが、これはコンポーネントの内側でだけです。一方で、`export const y = ...` は全く異なることを意味します。
- `export let` に加え、`$$props` と `$$restProps` を学習する必要があります。
- `$:` はリアクティブバインディングを宣言したり、副作用(side-effects)を実行したりしますが、`let x` と同じように、コンポーネントのトップレベルでしか動作しません。これらのステートメントの再実行は、理解しにくいルールに基づいています
- 一般的に、コンポーネントの内側と外側でコードの挙動が異なるため、リファクタリングが難しく、頻繁にコンテキストをスイッチする必要があります。

対照的に、rune は明示的で、予測しやすく、リファクタリングがしやすくなっています。

### なぜ古い構文のままではいけないのですか? <!--why-can-t-we-keep-the-old-syntax-->

上記に挙げた複雑さに加えて、現在の設計には残念な制限があります:

- どの変数をリアクティブと見なすべきでないのかを示す方法がありません。これは Svelte のルールをコンポーネントのトップレベル以外 (例えば `.js` の中など) で適用するときに問題となります
- `$:` 構文は TypeScript と上手く連携しません。例えば、以下のようなステートメントで `theme` の型を宣言できません — 構文エラーになります:
  ```ts
  // @errors: 2362 2363 2304 1005
  // @filename: ambient.d.ts
  declare global {
  const dark: boolean;
  }
  export {};
  // @filename: index.ts
  // ---cut---
  $: theme: 'light' | 'dark' = dark ? 'dark' : 'light';
  ```
  でも rune なら、正しく動作します:
  ```ts
  // @filename: ambient.d.ts
  declare global {
  	const dark: boolean;
  }
  export {};
  // @filename: index.ts
  // ---cut---
  let theme: 'light' | 'dark' = $derived(
  	dark ? 'dark' : 'light'
  );
  ```
- Updating values inside `$:` statements can cause [confusing behaviour](https://github.com/sveltejs/svelte/issues/6732) and [impossible to resolve bugs](https://github.com/sveltejs/svelte/issues/4933) and the statements may run in an [unexpected order](https://github.com/sveltejs/svelte/issues/4516)
- `$:` ステートメントの中で値を更新すると、[混乱する動作](https://github.com/sveltejs/svelte/issues/6732)や[解決するのが不可能なバグ](https://github.com/sveltejs/svelte/issues/4933)が発生し、ステートメントが[予期せぬ順序](https://github.com/sveltejs/svelte/issues/4516)で実行されることもあります。
- `$: {...}` はクリーンアップ関数を返しません。[`$effect`](runes#$effect) は返します。
- 複数のコンポーネント間で interface を共有したいとき、props に型付けするのが非常に面倒です
- `.svelte` ファイルの中では store の名前に `$` プリフィクスを付けて値にアクセスできますが、`.js` や `.ts` ではそれができませんし、lint エラーや型チェックエラーが発生します。リアクティブな state に対する統一的なアプローチによってこの問題を解決します

## Breaking changes and migration

### Is it a breaking change?

We're striving to make Svelte 5 a drop-in replacement for Svelte 4, and to that end we've ported over the entire test suite. The new features are opt-in, and you can mix-and-match the new stuff with the old stuff within an app (though not within a component — in 'runes mode', certain features are deliberately disabled).

Having said that, the underlying mechanisms are totally different. It's inevitable that some of you will hit edge cases, which is why this is a major version (5.0) rather than a minor (4.x).

### No but really, am I going to have to rewrite everything?

Eventually, you'll have to make some changes — most of which we hope to automate. We don't want to end up in a situation where people feel like they have to juggle knowledge of a bunch of different ways of doing things.

Our current plan is that some or all of the features that runes make unnecessary like `let`-style reactivity, `$:`, `$$props` and `$$restProps` will be deprecated in Svelte 6 and removed in Svelte 7. But don't worry — that won't happen for some time, and we'll provide automatic migration tooling to do as much of the change as possible. There are no plans to deprecate `onMount` or stores at the current time.

### Which things are disabled in runes mode?

When you opt into runes mode, you can no longer use the features that runes replace:

- `$state` replaces top-level `let` declarations implicitly creating reactive state
- `$derived` replaces `$: x = ...`
- `$effect` replaces `$: {'{ ... }'}`
- `$props` replaces `export let`, `$$props` and `$$restProps`

All other features, including stores, are still fully supported in runes mode.

### Which things will be deprecated in Svelte 5?

`beforeUpdate` and `afterUpdate` are deprecated — use `$effect.pre` and `$effect` instead, as these are more conservative about when they run code. Everything else will remain.

## Schedule and future plans

### When is it coming out?

When it's done. The goal is 'sometime later this year'.

### Should I prepare my code for Svelte 5?

No. You can do the migration towards runes incrementally when Svelte 5 comes out.

### When can I `npm install` the Svelte 5 preview?

We plan to publish a pre-release version with enough time for brave souls to try it out in their apps and give us feedback on what breaks. Watch this space.

### What's left to do?

A great many things. Transitions, for example, are not fully implemented. We also haven't fully solved all aspects of things like server-side rendering. We're getting there!

### Will feature X be part of 5.0?

If you have to ask, then probably not. Aside from runes, 5.0 is mostly about taking everything we've learned over the last few years (including from other frameworks — thanks friends!) and making Svelte the leanest and most powerful framework out there.

We know that some of you are very keen on certain feature ideas, and we are too. We have some big ideas for 5.1 and beyond.

## Discussion, contributing, and help

### I want to help. How do I contribute?

We appreciate your enthusiasm! Right now it's not possible to accept contributions, but once we enter public beta, everything will be available on the Svelte GitHub repository.

### How can I share feedback or cool examples of what this enables?

You can use the `#svelte-5-runes` channel on the [Discord server](https://svelte.dev/chat) or the tag `#svelte-5-runes` on social media.

### My question wasn't answered. What gives?

It must not have been asked frequently enough. To fix that, stop by the `#svelte-5-runes` channel of the [Discord server](https://svelte.dev/chat).
