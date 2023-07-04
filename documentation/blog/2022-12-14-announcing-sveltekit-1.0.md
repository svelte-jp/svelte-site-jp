---
title: SvelteKit 1.0 発表
description: Web development, streamlined
author: The Svelte team
authorURL: https://svelte.dev/
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/announcing-sveltekit-1.0
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

2年間の開発を経て、[SvelteKit](https://kit.svelte.jp) はついに 1.0 に到達しました。今日現在において、SvelteKit はあらゆる形・サイズの Svelte アプリを構築する場合に推奨されます。

このリリースを皆さんに共有できることがとても嬉しいです。Svelte コアチームと広いコミュニティによる何千時間もの作業の集大成であり、小さなプロジェクトに取り組む単独の開発者であれ、大きなチームの一員であれ、本番レベル(production-grade)の Web を構築するのに最も楽しい方法だと思います。

始めてみるには、`npm create svelte@latest` を実行し、[ドキュメント](https://kit.svelte.jp/docs)と、[インタラクティブなチュートリアル](https://learn.svelte.jp)を確認してみてください(インタラクティブなチュートリアルはまだ experimental です)。

<div class="max">
<figure style="max-width: 960px; margin: 0 auto">
<div style="height: 0; padding: 0 0 57.1% 0; position: relative; margin: 0 auto;">
	<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; margin: 0;" src="https://www.youtube-nocookie.com/embed/N4BRVkQVoMc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figcaption>Svelte Radio Live: the Christmas special</figcaption>
</figure>
</div>

## What is SvelteKit?

SvelteKit は web アプリケーションを開発するためのフレームワークで、そのパフォーマンスと使いやすさから [開発者から](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks/) [最も](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks) [愛されている](https://twitter.com/Rich_Harris/status/1589675637195042817) UI コンポーネントフレームワークである [Svelte](https://svelte.jp) 上に構築されています。
Svelte のようなコンポーネントフレームワークを使ったことがあれば、DOM を直接操作するより、こういったフレームワークを使用したほうがユーザーインターフェースの構築がずっと簡単になることをご存知でしょう。しかし、多くの疑問が残っています:

- ソースコードの構造はどうすればいいですか?
- サーバーサイドレンダリングを追加するには?
- サーバーでもブラウザでも動作するルーティングを追加するには?
- クライアントサイドルーティングをアクセシブルにするには?
- データを取得(fetch)はどうすればいいですか?
- データを変更(mutate)するには?
- エラーを処理するには?
- プロダクション向けにビルドを最適化するには?
- 環境変数を賢くセキュアに扱うには?
- CSP ヘッダーと CSRF 保護を追加するには?
- service worker を追加するには? 何をどうキャッシュさせられる?
- アプリケーションをデプロイするにはどんな準備を?

アプリケーションフレームワークは、これらの質問に応えられるよう設計されています。SvelteKit は、大勢のベータテスター (その多くは SvelteKit をプロダクションで運用しています — その勇気に敬意を表するとともに、貴重なフィードバックに感謝しています) の現実世界のニーズと、[Next.js](https://nextjs.org/) や [Remix](https://remix.run/) を含む他のアプリケーションフレームワークから得たベストなアイデアを反映した設計になっています。

## How is it different?

Web 開発者にとって、魅力的な選択肢が多いという現在の状況は贅沢な悩みでしょう。前述のフレームワーク以外にも、[Astro](https://astro.build/) や、[Rails](https://rubyonrails.org/)・[Laravel](https://laravel.com/) といったプロダクションでの実績があるフレームワーク、そして数多くの静的サイトジェネレーターがあります。全て素晴らしいツールなので、選ぶのが楽しいはずです。

ただ、SvelteKit は一味違います:

**従来の ‘マルチページアプリ’、MPA フレームワークと違い、** 最初にサーバーレンダリングされたページをロードしたあとは、デフォルトでクライアントサイドナビゲーションになります。これにより、高速なページ遷移、ページ間での状態の永続化(例えばサイドバーのスクロールポジション)、より少ないデータ使用量などが可能となります。また、サードパーティースクリプト(例えば analytics)が各ページのロードのたびに再実行されることを防ぎます。

**従来のサーバーフレームワークと違い、** 単一の言語を使用することができます。密結合した2つのアプリ (1つは HTML の生成、1つはクライアントサイドインタラクションの処理) を持つことはありません。SvelteKit は JavaScript が動作する場所ならどこでも実行できるので、従来の Node サーバーとして、あるいはエッジを含むサーバーレス関数を使ってアプリをデプロイすることができます。

**静的サイトジェネレーターと違い、** パーソナライズされたデータまたは動的なデータを使用するアプリを構築することができます。しかも、パフォーマンスを犠牲にすることもありませんし、ページロード後にブラウザからデータを取得することによって発生するレイアウトシフトもありません。

SvelteKit によって、柔軟性を得られます。多くのフレームワークでは、アプリを構築する正しい方法は1つであると仮定していますが、現実はもっと微妙です。例えば、静的ページのプリレンダリングは単なるお手軽な `cache-control` ではありません — ビルド時のバリデーションや、エッジ関数がアクセスできないファイルシステムからのデータのレンダリングを可能にし、不安定なデータベースに対するヘッジとして機能します。全てのページにサーバーサイドレンダリングが必要だ、というのも正しくありません — 堅牢でハイパフォーマンスアプリと、優れた SEO を実現したいのであれば、それは正しいデフォルトですが、数え切れないほどの例外があります。

SvelteKit アプリでは、これらの選択を必要なだけきめ細やかに行うことができます — 例えば、あなたが今見ているこのページはプリレンダリングされたものですが、[REPL](/repl) では動的なデータがレンダリングされています。この2つの挙動は、1行のコードで切り替えることができます。このようなアプローチで構築されたアプリを、私たちは ‘[transitional apps](https://www.youtube.com/watch?v=860d8usGC0o)’ と呼んでいます。

## What can I use with SvelteKit?

SvelteKit は高速なビルドツールである [Vite](https://ja.vitejs.dev/) を使用しているので、ホットモジュールリロード(hot module reloading)、TypeScript、その他開発者が必要とするものをすぐに利用することができます。Vite と Rollup の広大なエコシステムからプラグインをインストールすることで、他のツールのサポートを追加することができます。

SvelteKit プロジェクトを作成するとき、[TypeScript](https://www.typescriptlang.org/)、[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)、[Playwright](https://playwright.dev/) (for end-to-end browser tests)、[Vitest](https://vitest.dev/) (for unit tests) を追加するか選択できます。例えば、[Tailwind](https://tailwindcss.com/docs/guides/sveltekit) や [Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit) など、多くのポピュラーなプロジェクトにはすでにインテグレーションガイドがあります。コンポーネントストーリー(component stories) には [Storybook](https://github.com/storybookjs/storybook/blob/next/code/frameworks/sveltekit/README.md) や [Histoire](https://histoire.dev/guide/svelte3/getting-started.html) を使用することができます。コミュニティがメンテナンスしている [svelte-add](https://github.com/svelte-add/svelte-add) を使用すれば、コマンド1つでどんどん増えているインテグレーションの数々を追加することができます。

もちろん、[npm](https://npmjs.com/) が提供するものすべてにアクセスできます。(一部のパッケージは Node.js が必要なため、それを使う場合はデプロイ先が Node ベースのプラットフォームに限定されることにご注意ください。)

## Where can I deploy my apps?

どこでも! SvelteKit CLI にはローカルにインストールされた Node.js が必要ですが、フレームワーク自体にはどんなプラットフォームにも依存しません。つまり、JavaScript が動作する場所であれば、どこにでもデプロイすることができます。

これは [adapter](https://kit.svelte.jp/docs/adapters) によって実現されています。デフォルトの adapter である [adapter-auto](https://github.com/sveltejs/kit/tree/master/packages/adapter-auto) は、Vercel、Netlify、Cloudflare Pages、Azure Static Web Apps をゼロコンフィグでサポートしており、今後さらに多くのプラットフォームが提供される予定です。コミュニティが提供する adapter によって、Deno、Bun、Firebase、App Engine、AWS Lambda、その他多くのサポートが追加されています。

[adapter-node](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) を使えばアプリを Node.js サーバーとしてデプロイすることもできます。

アプリ全体がプリレンダリングに適している場合や、シングルページアプリ (SPA) である場合、[adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) (これによって SvelteKit は静的サイトジェネレーターになります) を [GitHub Pages](https://pages.github.com/) を含むあらゆる Web サーバー向けに使用することができます。

## Acknowledgements

このリリースは、とても多くの人々のハードワークによって実現されました。何よりもまず最初に、洞察に満ちたフィードバックや大小様々な幾千ものコントリビュートをしてくれた Svelte コミュニティに感謝したいと思います。彼らのおかげで、私たちは誇りを持って、このプロジェクトを web 開発者の広いコミュニティに共有できるものにすることができました。

また、[Svelte Society](https://sveltesociety.dev/) とコミュニティのアンバサダーにも感謝しています。[Svelte Summit](https://www.sveltesummit.com/) や [Svelte Sirens](https://sveltesirens.dev/) でイニシアチブを取り、オンラインでもオフラインでも、Svelte 開発者のために活気に満ちた友好的なスペースを作り上げてくれました。

コンテンツクリエーターがとても多いので、漏れのないように名前を挙げることはできませんが、SvelteKit 周辺の講座をリリースしたり、教育コンテンツを制作してくださった皆様、ありがとうございました。

2021年の初頭、Vite を採用したとき、私たちは Vite を採用した初めてのメジャーなアプリケーションフレームワークでした。当時はリスキーな賭けでしたが、その賭けが報われたことに今は感動しています。Vite は JavaScript の世界で向かうところ敵なしの勢力に成長し、そして Vite チームは本当に素晴らしい、親切なパートナーです。

[Vercel](https://vercel.com)、[Netlify](https://netlify.app/)、[Cloudflare](https://www.cloudflare.com/) それぞれのチームから素晴らしいサポートを受け、これらのプラットフォームへのデプロイメントをゼロコンフィグにすることができました。

[StackBlitz](https://stackblitz.com/) の友人たちは、私たちにとって初となる [WebContainer](https://blog.stackblitz.com/posts/introducing-webcontainers/) を使用したインタラクティブなチュートリアルである [learn.svelte.dev](https://learn.svelte.dev) (日本語版: [learn.svelte.jp](https://learn.svelte.jp)) を実現するために熱心に取り組んでくれました。

最後に、このプロジェクトは資金支援者の方々がいなければ実現できなかったことをお伝えします。そこには、[Open Collective](https://opencollective.com/svelte) の数百名の支援者の方々、二人のコア開発者 ([Rich](https://twitter.com/Rich_Harris/) と [Simon](https://twitter.com/dummdidumm_/)) を雇用し、フルタイムで Svelte に取り組ませてくれた Vercel、その他様々な方法 (例えば [Steph の](https://twitter.com/steph_dietz_) [Beginner SvelteKit](https://vercel.com/docs/beginner-sveltekit) コースなど) でプロジェクトを支援してくれた方々も含まれます。

## Migrating

SvelteKit のプレリリースバージョンで構築したアプリをお持ちの場合、1.0 にアップグレードする前に、プレリリースの最終バージョン — `@sveltejs/kit@1.0.0-next.588` — にアップグレードすることをおすすめします。安定(stable)バージョンではプレリリースバージョン間の移行に使われていたエラーや警告が削除されているからです。特に、1.0.0-next-406 より古いバージョンを使用している場合は、[このマイグレーションガイド](https://github.com/sveltejs/kit/discussions/5774) を参照することをおすすめします。

## What’s next?

SvelteKit 1.0 は始まりであり、終わりではありません。今日はプロダクションで使用する準備は整っていますが、まだ始まったばかりです。ロードマップには、ビルトインの i18n サポート、incremental static regeneration、デプロイメントリージョンとランタイムのきめ細やかなコントロール、イメージ最適化(image optimisation)、その他多くの改善があります。また、来年には Svelte 4 の取り組みを始める予定です — 詳細はまた今度。

ただ、私たちに決断を委ねないでください。Svelte はコミュニティプロジェクトであり、私たちの最高のアイデアの多くは、実際には私たちのものではありません — あなたたちのものです。[Twitter](https://twitter.com/SvelteSociety) や [YouTube](https://youtube.com/sveltesociety) で Svelte Society をサブスクライブして最新の情報を得るようにし、[Discord server](https://svelte.dev/chat) に参加し、[GitHub](https://github.com/sveltejs) でコントリビュートしてください。

あなたが作ったものを見るのが待ちきれません。
