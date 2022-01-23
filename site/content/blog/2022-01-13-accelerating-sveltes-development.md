---
title: "Svelte の開発を加速する (Accelerating Svelte's Development)"
description: "チームの拡大、パートナーシップの構築、コミュニティの成長"
author: Ben McCann
authorURL: https://www.benmccann.com/
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/accelerating-sveltes-development
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

[Svelte](/) は高速でリアクティブな Web アプリを少ないコード量で構築するためのフロントエンドフレームワークです。初めての方は、[チュートリアル](/tutorial) や [examples](/examples) をチェックし、感触を掴んでみてください。

Svelte は [5年前に立ち上がり](https://news.ycombinator.com/item?id=13069841)、[それから大きな発展を遂げました](https://www.youtube.com/watch?v=YeY5M29-WcY)。2021年には利用者が2倍以上に増え、2つの調査で、[最も愛されているフレームワーク](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks)、[開発者が最も満足しているフレームワーク](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/) にそれぞれ選出されました。Svelte は、The New York Times、Apple、Spotify、Square、楽天、Bloomberg、ロイター、IKEA、Brave、その他数え切れないほどの有名な企業で、ホビープロジェクトから組込みシステムのインタフェースまで、あらゆるものを動かすために使用されています。

開発者が難しい部分に悩むことなく、機能が充実したアプリケーションを Svelte で開発できるよう、[SvelteKit](https://kit.svelte.jp/) というアプリケーションフレームワークを開発しています。SvelteKit は既に100万回以上ダウンロードされており、アーリーアダプターの方々の協力を得て早く [stable 1.0 リリース](https://github.com/sveltejs/kit/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.0) に到達できるよう活動しております。

## チームの拡大 (Scaling the team)

Svelte の作者である Rich Harris が [Svelte にフルタイムで取り組むために Vercel にジョインしました](https://vercel.com/blog/vercel-welcomes-rich-harris-creator-of-svelte)。Rich の Svelte に対する関わりのレベルがさらに上がり、彼が Svelte を未来へと導く役目となったことに、私たちはとてもわくわくしています。

Svelte は大規模で献身的なコミュニティの活動によって支えられてきました。Svelte はパンデミックの期間中に多数のコアメンテナーが加わり、この1週間でも3名の方が加わりました。アルファベット順です:
- [benmccann](https://github.com/benmccann) - 2021年の大半において、SvelteKit の主要なメンテナー
- [bluwy](https://github.com/bluwy) - SvelteKit、vite-plugin-svelte、Vite のメジャーなコントリビューター
- [dominikg](https://github.com/dominikg) - vite-plugin-svelte の作者
- [dummdidumm](https://github.com/dummdidumm) - VS Code extension と `svelte-check` を含む、language-tools のメンテナー
- [ehrencrona](https://github.com/ehrencrona) - SvelteKit のコントリビューターであり、Svelte を業務で使用している
- [geoffrich](https://github.com/geoffrich) - Svelte のサイトやドキュメントのアクセシビリティの改善を推進
- [GrygrFlzr](https://github.com/GrygrFlzr) - SvelteKit と Vite の両方のメンテナーというユニークなステータスを持つ
- [Halfnelson](https://github.com/Halfnelson) - svelte-native の作者
- [ignatiusmb](https://github.com/ignatiusmb) - 常連の SvelteKit コントリビューターで、特に TypeScript サポートに貢献している
- [jasonlyu123](https://github.com/jasonlyu123) - VS Code extension と `svelte-check` を含む、language-tools のメンテナー
- [kaisermann](https://github.com/kaisermann) - svelte-preprocess の作者
- [RedHatter](https://github.com/RedHatter) - Svelte Devtools の作者
- [rixo](https://github.com/rixo) - svelte-hmr の作者

Svelte では昨年から [OpenCollective](https://opencollective.com/svelte) で寄付の受付を開始し、現在までに $60,000 以上の寄付を頂いており、本日 [Cohere](https://cohere.ai/) からも $10,000 の寄付を頂きました。この資金によって既存のメンテナーがより多くの時間を Svelte に費やすことができるように、または、パートタイムもしくは契約ベースで Svelte のサポートができるようになることを望んでおり、今後も検討を続けていく予定です。

## パートナーシップ (Partnerships)

複数のメジャーなクラウドベンダーが、SvelteKit アプリケーションをどこでもシームレスにデプロイできるよう取り組んでいます。Rich の新しい仕事の結果として、SvelteKit は間もなく [Vercel Edge Functions](https://vercel.com/features/edge-functions) で実行できるようになります。Netlify は SvelteKit の Netlify adapter に [大きなコントリビュート](https://github.com/sveltejs/kit/pull/2113) をしてくれて、また、SvelteKit をより良くサポートするために彼らの zip-it-and-ship-it ツールを [アップデート]((https://github.com/dependents/node-precinct/pull/88)) してくれました。最近の [Cloudflare Pages の発表](https://blog.cloudflare.com/cloudflare-pages-goes-full-stack/) では、SvelteKit を初日のパートナーとして取り上げており、Svelte のメンテナーである [pngwn](https://twitter.com/evilpingwin) と [lukeed](https://twitter.com/lukeed05) (後者は2021年に Cloudflare にジョイン) が書いた [新しい adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-cloudflare) が使われています。[Begin](https://begin.com) は [SvelteKit の adapter](https://github.com/architect/sveltekit-adapter) を [Architect](https://arc.codes) アプリ向けに作成しました。そしてコミュニティメンバーは Firebase や Deno といった環境用の [adapter にコントリビュート](https://sveltesociety.dev/components#adapters) しており、JavaScript が動作する場所であればどこでも動作する SvelteKit の力を示しています。

また、SvelteKit ユーザーが発見した SSR の問題を解決するため、私たちは [Vite](https://vitejs.dev) チームと密接に連携しています。Vite は SvelteKit 
の開発者体験(developer experience)を実現してくれているビルドツールで、様々なフレームワークの代表者たちを含むコントリビューターのハードワークのおかげで、最近のリリースでは、 SvelteKit 1.0 のリリースブロッカーとして追跡していた問題点のほとんどを解決することができました。

## コミュニティの成長 (A growing community)

[SvelteSociety](https://sveltesociety.dev/) は [4回目の Svelte Summit](https://sveltesummit.com/) を開催し、— [概要はこちらでお読み頂けます](https://svelte.jp/blog/whats-new-in-svelte-december-2021#what-happened-at-svelte-summit) — そして、Kevin Åberg Kultalahti が [フルタイムで SvelteSociety をリードしていくことになりました](https://twitter.com/kevmodrome/status/1463151477174714373)。Svelte Summit の開催に加えて、Kevin と SvelteSociety は、[Svelte Radio podcast](https://www.svelteradio.com/)、[SvelteSociety YouTube channel](https://www.youtube.com/SvelteSociety)、[Svelte subreddit](https://www.reddit.com/r/sveltejs) を開催・運営しています。SvelteSociety は Svelte Community に関係する全ての物事のホームとなり、sveltejs/community リポジトリと sveltejs/integrations リポジトリはその役目を終え、SvelteKit で再設計・再構築された [sveltesociety.dev](https://sveltesociety.dev/) がその役目を引き継ぎます。10月には、サイトの UI デザインに貢献した Brittney Postma が、女性とノンバイナリーのコミュニティメンバーとその仲間たちのためのグループである [Svelte Sirens](https://sveltesirens.dev/) を立ち上げました。

Svelte Discord には毎週数百人の開発者が新たに加入し、Svelte についてチャットしています。お気づきかもしれませんが、最近、サーバーの一部のメンバーの名前が紫色になっています。そのメンバーはアンバサダーで、アンバサダーという役割は、コミュニティの重要メンバーを認知させ、急成長するコミュニティの要求を管理し助けるために作られました。Svelte のアンバサダーの方々はその親切さと貢献がよく知られており、そして Svelte がフレンドリーで歓迎されるコミュニティであるという評判を維持してくれていて、私たちはアンバサダーの方々に深く感謝しています。初期のアンバサダーはアルファベット順で以下の通りです。
- [babichjacob](https://github.com/babichjacob)
- [brady fractal](https://github.com/FractalHQ)
- [brittney postma](https://github.com/brittneypostma)
- [d3sandoval](https://github.com/d3sandoval)
- [geoffrich](https://github.com/geoffrich)
- [kev](https://github.com/kevmodrome)
- [puru](https://github.com/PuruVJ)
- [rainlife](https://github.com/stephane-vanraes)
- [rmunn](https://github.com/rmunn)
- [stolinski](https://github.com/stolinski)
- [swyx](https://github.com/sw-yx)
- [theo](https://github.com/theo-steiner)

また、[SvelteKit のリポジトリで GitHub discussions](https://github.com/sveltejs/kit/discussions) を試しており、フィードバックが良好であれば Svelte organization の他のリポジトリにも導入する可能性があります。

## 注目ポイント (Things to watch)

SvelteKit は 1.0 に向けて進行中で、先週だけでも、[client-only renderingの改善](https://github.com/sveltejs/kit/pull/2804)、[routing hooks](https://github.com/sveltejs/kit/pull/3293)、[子コンポーネントからレイアウトにデータを渡す機能](https://github.com/sveltejs/kit/pull/3252) (例: `<meta>` タグの簡易な管理をサポート)などの主要な機能が追加されました。現在は、ストリーミングやファイルアップロードなどの機能に関する API デザインや、近々リリースされる Vite 2.8 へのコントリビューションなど、優先度の高い項目に取り組んでいます。

最近は SvelteKit に注力していますが、エコシステム全体も進化し続けています。[Svelte 3.46.0](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md#3460) はここ最近の中では大きなリリースで、2つの大きな機能が追加されました: [constants in markup](https://github.com/sveltejs/rfcs/blob/master/text/0007-markup-constants.md) と [style directives](https://github.com/sveltejs/rfcs/blob/master/text/0008-style-directives.md) です。

Svelte と SvelteKit は上記の数多くの投資によって軌道に乗っており、今後も多くのアップデートが行われる予定です — [blog](/blog) を [RSS](/blog/rss.xml) で購読するか、毎月チェックしていち早く情報をゲットしてください。
