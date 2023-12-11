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
- `$:` ステートメントの中で値を更新すると、[混乱する動作](https://github.com/sveltejs/svelte/issues/6732)や[解決するのが不可能なバグ](https://github.com/sveltejs/svelte/issues/4933)が発生し、ステートメントが[予期せぬ順序](https://github.com/sveltejs/svelte/issues/4516)で実行されることもあります。
- `$: {...}` はクリーンアップ関数を返しません。[`$effect`](runes#$effect) は返します。
- 複数のコンポーネント間で interface を共有したいとき、props に型付けするのが非常に面倒です
- `.svelte` ファイルの中では store の名前に `$` プリフィクスを付けて値にアクセスできますが、`.js` や `.ts` ではそれができませんし、lint エラーや型チェックエラーが発生します。リアクティブな state に対する統一的なアプローチによってこの問題を解決します

## 破壊的変更(Breaking changes) と移行(migration) <!--breaking-changes-and-migration-->

### これは破壊的変更ですか? <!--is-it-a-breaking-change-->

私たちは Svelte 4 から Svelte 5 への移行が簡単に行えるよう努めており、そのためにテストスイート全体をポートしました。新機能はオプトインで、アプリの中で新機能と既存昨日を組み合わせて使用することができます (コンポーネント内では組み合わせて使用することができません。'rune モード' では、特定の機能が意図的に無効化されます).

とは言うものの、根本的なメカニズムは全く異なります。エッジケースにぶつかる可能性は避けられません。そのため、マイナーバージョン (4.x) ではなく、メジャーバージョン (5.0) なのです。

### とはいえ実際、自分のコードを全て書き直さなければいけないのでしょうか? <!--no-but-really-am-i-going-to-have-to-rewrite-everything-->

最終的には書き直さなければいけない部分も出てくるとは思いますが、なるべくそのほとんどを自動的に行われるようにしたいと考えています。これを行うために様々な方法の知識をやりくりしなければならない、と皆さんが感じるような状況にはしたくないのです。

現時点の計画では、`let` スタイルのリアクティビティ、`$:`、`$$props`、`$$restProps` のような rune によって不必要となる機能の一部または全ては、Svelte 6 で非推奨となり、Svelte 7 で削除される予定です。しかしご心配なく、しばらくはこうなりませんし、可能な限り多くの変更を移行するための自動マイグレーションツールを提供する予定です。現時点では `onMount` や store を非推奨にする予定はありません。

### rune モードでは何が無効化されますか? <!--which-things-are-disabled-in-runes-mode-->

rune モードを選択すると、rune が大体する機能が使えなくなります:

- `$state` は、暗黙的にリアクティブな state を作成するトップレベルの `let` 宣言を置き換えます
- `$derived` は `$: x = ...` を置き換えます
- `$effect` は `$: {'{ ... }'}` を置き換えます
- `$props` は `export let`、`$$props`、`$$restProps` を置き換えます

その他 store を含む全ての機能は、rune モードでも完全にサポートされています。

### Which things will be deprecated in Svelte 5? <!--which-things-will-be-deprecated-in-svelte-5-->

`beforeUpdate` と `afterUpdate` は非推奨ですので、代わりに `$effect.pre` と `$effect` を使用してください。そのほうが、コードが実行されるタイミングについてより保守的だからです。その他についてはそのままです。

## スケジュールと将来の計画 <!--schedule-and-future-plans-->

### いつリリースされますか? <!--when-is-it-coming-out-->

完成次第です。目標は2024年の初頭です。

### Svelte 5 に向けてコードを準備すべきですか? <!--should-i-prepare-my-code-for-svelte-5-->

いいえ、Svelte 5 が出たあとに少しずつ rune に移行することができます。

### Svelte 5 のプレビュー版はいつから `npm install` ができるようになりますか? <!--when-can-i-npm-install-the-svelte-5-preview-->

勇敢な方々が自分たちのアプリで試し、どのように壊れたか私たちにフィードバックできるよう、プレリリースバージョンの公開には十分な時間をかける予定です。お見逃しなく!

### あとは何が残っているのですか? <!--what-s-left-to-do-->

まだまだたくさんあります。例えば、Transition はまだ完全に実装されていません。サーバーサイドレンダリングなどは全面的に解決しているわけではありません。ですがもう少しで辿り着きます！

### 機能 X は 5.0 に含まれますか? <!--will-feature-x-be-part-of-5-0-->

そう聞く必要があるということは、おそらく含まれていないです。rune は別として、5.0 には私たちがここ数年で学んだことほぼ全てを取り入れ (他のフレームワークから学んだことも含めて — 友人たちに感謝!)、Svelte をもっともリーンでパワフルなフレームワークにします。

皆さんの中には、ある機能のアイデアにとても熱心な方もいらっしゃることはわかっていますし、私たちもそうです。5.1 に向けて、いくつか大きなアイデアがあります。

## ディスカッション、コントリビュート、ヘルプ <!--discussion-contributing-and-help-->

### 支援したいです。どうすればコントリビュートできますか?

皆様の熱意に感謝いたします! 今現在はまだコントリビュートを受け付けることはできませんが、パブリック・ベータになったら、Svelte の GitHub リポジトリですべてを利用できるようになります。

### どうすればフィードバックやこれによって可能となるクールな事例を共有できますか? <!--how-can-i-share-feedback-or-cool-examples-of-what-this-enables-->

[Discord server](https://svelte.dev/chat) の `#svelte-5-runes` チャンネルか、ソーシャルメディアで `#svelte-5-runes` タグを使用してください。

### 私の質問に対する回答がありませんでした。どうすればよいですか? <!--my-question-wasn-t-answered-what-gives-->

その質問はあまり頻繁にされているものではないようです。解決するには、[Discord server](https://svelte.dev/chat) の `#svelte-5-runes` チャンネルに立ち寄ってみてください。
