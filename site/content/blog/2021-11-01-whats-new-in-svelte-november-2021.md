---
title: What's new in Svelte: 2021年11月
description: ショーケースを彩る5000個以上の星たち
author: Daniel Sandoval
authorURL: https://desandoval.net
---

SvelteKitが[80%完了マーク](https://github.com/sveltejs/kit/milestone/2)を超え、GitHubで[5000スター](https://github.com/sveltejs/kit)を超え、Sapperよりも多くの利用者がいる現在、SvelteKitを試すのに最適な時期はありません。コミュニティの多くの人が試しているので、今月はかなり大きなショーケースになっています...。

また、11月20日には、世界各国のスピーカーが参加する[Svelte Summit](https://sveltesummit.com)も開催されますので、お見逃しなく。お住まいの地域で開催されるウォッチパーティーにもご注目してください👀

続いては新機能です！

## SvelteおよびSvelteKitの新機能について
- [svelte.dev](https://svelte.dev/)は、[sveltesociety.dev](https://sveltesociety.dev)と並んでSvelteKit上で動作するようになりました。svelte.devは、ライブコードの編集、認証、マークダウンベースのブログなど、比較的複雑なサイトで、SvelteKitを実際にテストするのに適しています。
- 新しいコンパイラオプションである`enableSourcemap`は、JSとCSSのソースマップに対するコンパイラの出力をより細かく制御することができます(**3.44.0**)。この新機能により、SvelteKitおよびVite Svelteプラグインは、`.svelte`テンプレート内の環境変数を適切に処理できるようになりました。([sveltejs/kit#720](https://github.com/sveltejs/kit/issues/720)および[sveltejs/vite-plugin-svelte#201](https://github.com/sveltejs/vite-plugin-svelte/pull/201)を参照)
- Svelte言語ツールで、VS CodeのCSS設定の読み込みに対応しました。([#1219](https://github.com/sveltejs/language-tools/issues/1219))
- `Veite-plugin-svelte`では、新しい`experimental.prebundleSvelteLibraries`オプションを追加しました。このオプションは、アイコンライブラリやUIフレームワークのような多くのコンポーネントを含むSvelteライブラリのロードをより高速にします。このオプションは、`svelte.config.js`のルートで設定できます。是非お試しいただき、ご意見をお聞かせください！
- SvelteKitは、`rel="external"`としてマークされていない限り、クライアント上のエンドポイントのみをルーティングします。 - これにより、クライアントJSのサイズが小さくなり、将来的にルーターのリファクタリングがしやすくなりました。([2656](https://github.com/sveltejs/kit/pull/2656))
- SvelteKitがNode 12をサポートしなくなりました。([2604](https://github.com/sveltejs/kit/pull/2604))
- SvelteKitがVite 2.6.0からVite 2.6.12にアップグレードされ、ViteがSvelteランタイムを破壊する問題が修正されました。(https://github.com/vitejs/vite/issues/4306) また、SvelteKitのテンプレートにおけるViteの問題を回避または診断しやすくするための、SvelteKitチームによる2つの修正が含まれています(https://github.com/vitejs/vite/pull/5192) および (https://github.com/vitejs/vite/pull/5193)。Vite 2.7のベータ版が公開されており、SSRの修正が追加されています。


SvelteおよびSvelteKitのすべての更新を確認するには、それぞれ[Svelte](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md)および[SvelteKit changelog](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md)をご覧ください。

---

## コミュニティ ショーケース

**アプリとサイト**
- [Tangent](http://tangentnotes.com/)は、クリーンでパワフルなMac & Windows用のメモアプリです。
- [The Pudding](https://pudding.cool/)は、文化の中で議論されているアイデアをビジュアル・エッセイで説明するデジタル出版物です - SvelteKitで再構築されました。
- [Power Switcher](https://powerswitcher.axpo.com/)は、エネルギー源がよりクリーンなものに移行していく中で、スイスの電力供給の発展をインタラクティブに紹介しています。
- [Sublive](https://sub.live/)は、世界中のミュージシャンを低レイテンシーかつ高品質なオーディオネットワークで繋ぎ、新しい音楽の作り方を提案します。
- [Vibify](https://www.vibify.me/)は、Spotifyの聴取履歴を利用して、音楽の中に隠れたプレイリストを見つけることができます。
- [Browse Marvel Unlimited by Year](https://marvel.geoffrich.net/)は、ある年のMarvel Unlimitedで入手可能なイシューを確認できるSvelteKitサイトです。
- [lil-hash](https://github.com/jackbow/lil-hash)は、覚えやすく、話しやすい短縮URLを生成するシンプルなURL短縮ツールです。
- [PWA Haven](https://github.com/ThaUnknown/pwa-haven)は、OSのネイティブアプリを置き換える、小さく、速く、シンプルなPWAのコレクションです。
- [DottoBit](https://dottobit.com/)は、URL共有機能を備えたマルチカラーの16bitドローイングプログラムです。
- [Former Fast Document for Print](https://github.com/zummon/former)は、美しいデザイン、国際言語対応、自動計算機能を備えた請求書作成ソフトです。
- [Helvetikon](https://github.com/noahsalvi/helvetikon)は、スイス・ドイツ語のコミュニティが運営する辞書です。
- [Palitra App](https://palitra.app/)は、検索ベースのカラーパレットジェネレータです。

**Svelteが登場するポッドキャスト**
- [Svelte Radio](https://www.svelteradio.com/episodes/svelte-summit-is-coming-up-and-svelte-is-growing)では、先日リリースされたSvelte Summitのウェブサイトを支える技術や、その他の楽しいことをたくさん紹介しています！
- [PodRocket](https://podrocket.logrocket.com/rich-harris)、LogRocketのポッドキャスト、リッチ・ハリスとSvelteを語る。
- [PodRocket also dove deep](https://podrocket.logrocket.com/elderjs) Nick Reeseと一緒にElder.jsに導入しました。
- [Web Rush](https://webrush.io/episodes/episode-153-single-page-application-vs-multi-page-application-with-rich-harris)とリッチ・ハリスが、SPAとMPAの違い、サーバーレンダリングが果たす役割、クライアントサイドハイドレーションとは何か、SPAやMPAを開発するための最新ツールの状況などについて語ります。
- [devtools.fm](https://devtools.fm/episode/15)では、魅力的なデータビジュアライゼーションの開発と明日のツールの構築について、リッチ・ハリスと語り合っています。

**教育用コンテンツ**
- [Have Single-Page Apps Ruined the Web?](https://www.youtube.com/watch?v=860d8usGC0o) 今年のJamstack Confで、リッチ・ハリスが論争の的となった質問に答えました。
- [Svelte vs SvelteKit - What's The Difference?](https://www.youtube.com/watch?v=IKhtnhQKjxQ) LevelUpTutsでは、この2つのプロジェクトの関係を説明するクイックガイドを提供しています。Scott Tolinski氏によるSvelteに関するガイドの残りの部分は、彼の新シリーズである["Weekly Svelte"](https://www.youtube.com/playlist?list=PLLnpHn493BHF-Onm1MQgKC1psvW-rJuYi)でチェックできます。
- [WebJedaのSvelteKit Hooks](https://www.youtube.com/watch?v=RarufLoEL08&list=PLm_Qt4aKpfKgzcTiMT2cgWGBDBIPK06DQ)シリーズは、今月も第3回 「クッキーセッション認証」をお届けします。
- [Writing Context Aware Styles in a Svelte App](https://www.ryanfiller.com/blog/tips/svelte-contex-aware-styles)は、親に動的に適応することができる自己完結型のコンポーネントを書くためのガイドです。
- [A Beginner's Guide to SvelteKit](https://www.sitepoint.com/a-beginners-guide-to-sveltekit/)では、SvelteとSvelteKitの両方を初心者向けに説明し、架空のユーザーのプロフィールページを表示するシンプルなウェブアプリを構築しています。
- [Svelte vs React: Ending the Debate](https://massivepixel.io/blog/svelte-vs-react/)は、昔からある議論を歴史的に捉えたものです。
- [Svelte Snacks | Custom Events for Modal Actions](https://jeremydayslice.hashnode.dev/svelte-snacks-or-custom-events-for-modal-actions)では、Svelteの便利なカスタムイベントシステムのしっかりとした実装を紹介しています。
- [What Svelte's accessibility warnings won't tell you](https://geoffrich.net/posts/svelte-a11y-limits/)では、Svelteのa11y警告がどのように機能するのか、また、アプリケーションをアクセシブルにするために警告をあてにしてはいけない理由を説明しています。

**ライブラリーとツールとコンポーネント**
- [svelte-adapter-azure-sw](https://github.com/geoffrich/svelte-adapter-azure-swa)は、動的なサーバーレンダリングにAzure関数を使用してAzure Static Web Appを作成するSvelteアプリ用のアダプタです。
- [Inlang](https://docs.inlang.dev/getting-started/svelte-kit)は、SvelteKitに対応したローカリゼーション・国際化ツールキットです。
- [svelte-translate-tools](https://github.com/noelmugnier/svelte-translate-tools) ビルド時にSvelteアプリの翻訳ファイルを抽出/生成/コンパイルします。
- [@egjs/svelte-infinitegrid](https://github.com/naver/egjs-infinitegrid/tree/master/packages/svelte-infinitegrid)では、サイズの異なるカード要素で構成された様々なグリッドを実装することができます。
- [svelte-reactive-css-preprocess](https://github.com/srmullen/svelte-reactive-css-preprocess)は、コンポーネントの状態が変化するたびに、css変数の値を簡単に更新することができます。
- [Sveltegen](https://github.com/snuffyDev/sveltegen)は、アクション、コンポーネント、ルートをシンプルかつ簡単に作成するためのCLIです。
- [svelte-advanced-multistep-form](https://www.npmjs.com/package/svelte-advanced-multistep-form)は、レンダリングされるコンポーネントにスタイルを渡すフォーム要素をラップするのに役立ち、また、各フォームステップを順序立ててスタイリッシュに表示します。
- [gQuery](https://github.com/leveluptuts/gQuery)は、SvelteKit用のGraphQL Fetcher & Cacheです。
- [date-picker-svelte](https://github.com/probablykasper/date-picker-svelte)は、Svelte用の日付と時間のピッカーです。
- [TwelveUI](https://twelveui.readme.io/reference/what-is-twelveui)は、アクセシビリティを内蔵したSvelteのコンポーネントライブラリです。
- [svelte-outclick](https://github.com/babakfp/svelte-outclick/)は、outclickイベントを提供することで、要素の外側でクリックをリッスンすることができるSvelteコンポーネントです。
- [svelte-zero-api](https://github.com/ymzuiku/svelte-zero-api)では、SvelteKit APIをクライアント関数のように使用することができます - Typescriptをサポートしています。
- [svelte-recaptcha-v2](https://github.com/basaran/svelte-recaptcha-v2)は、Svelte SPA、SSR、sveltekitの静的サイト用のGoogle reCAPTCHA v2の実装です。
- [Svelte Body](https://github.com/ghostdevv/svelte-body)は、SvelteKitやRoutifyと連携して、ルートのボディにスタイルを適用することができます。
- [svelte-debug-console](https://github.com/basaran/svelte-debug-console)は、Svelte SPA、SSR、sveltekitの静的サイトのためのdebug.jsの実装で、デバッグ文をブラウザ上で確認することができます。
- [SVEO](https://github.com/didier/sveo)は、SvelteKitページのメタデータを宣言するための、依存性のないアプローチです。
- [@svelte-drama/suspense](https://www.npmjs.com/package/@svelte-drama/suspense)は、Reactの`<Suspense>`のコアアイデアを実装したSvelteコンポーネントです。また、[SWR for Svelte](https://www.npmjs.com/package/@svelte-drama/swr)をチェックすると、リフェッチがさらに簡単になります。
- [sveltekit-adapter-browser-extension](https://github.com/antony/sveltekit-adapter-browser-extension)は、アプリをクロスプラットフォームのブラウザ拡張にするSvelteKit用のアダプタです。

コミュニティサイト [sveltesociety.dev](https://sveltesociety.dev/templates/)では、Svelte エコシステム全体からの templates、adders、adapters をご覧いただけます。

もっと更新情報が欲しいですか？ [Reddit](https://www.reddit.com/r/sveltejs/)or[Discord](https://discord.com/invite/yy75DKs) に参加してください！
