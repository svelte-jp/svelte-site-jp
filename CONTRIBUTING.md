# Svelte Site JP への貢献について

Svelte Site JPはSvelte公式ドキュメントサイトの日本語化プロジェクトです。
Svelteは素晴らしいツールで、公式ドキュメント及びチュートリアルも非常に素晴らしいです。公式からは英語版のみ提供されていますが、日本語に翻訳されたドキュメントとチュートリアルがあれば日本語話者にとってはもっと学習しやすくなると考えています。  

このリポジトリは[sveltejs/svelteのsiteディレクトリ](https://github.com/sveltejs/svelte/tree/master/site)をフォークして作成されており、ライセンスやコミュニティ・コラボレーションの精神についてはSvelte本体のそれを引き継ぎます。

Svelte公式のCONTRIBUTING.mdはこちらです、是非ご一読ください。

* [CONTRIBUTING.md - sveltejs/svelte](https://github.com/sveltejs/svelte/blob/master/CONTRIBUTING.md)


## 貢献するには

Svelte Site JPに貢献する方法はたくさんあり、その多くはコードを書く必要もなければ、いきなり翻訳する必要もありません。

- [日本語化されたドキュメントサイト](https://svelte-jp.herokuapp.com/)を使ってみてください。気になるところや改善点があれば[Issueを開いて](#issueを作成する)お知らせください。
- 翻訳で貢献されたい場合は[翻訳作業について](#翻訳作業について)をチェックしてみてください。翻訳にはみなさんの協力が必要です。完璧な翻訳は望んでいません。誤訳があっても誤字・脱字があっても単語が統一できていなくても構いません、後からみんなで良くしていければと考えています。

貢献は大歓迎です！もし貢献を迷っていたり、貢献に助けが必要であれば[Svelte日本のDiscord](https://discord.com/invite/YTXq3ZtBbx)で知らせてください。


## 翻訳作業について


### ディレクトリ構成・翻訳の仕組み

- **Blog**
  - Blogの原文は content/blog 配下にあります。  
    日本語翻訳は content/blog/**ja** 配下の {原文のファイル名}.**ja**.md というファイルを修正して行います。
- **API Docs**
  - API Docsの原文は content/docs 配下にあります。  
    日本語翻訳は content/docs/**ja** 配下の {原文のファイル名}.**ja**.md というファイルを修正して行います。
- **FAQ**
  - FAQの原文は content/faq 配下にあります。  
    日本語翻訳は content/faq/**ja** 配下の {原文のファイル名}.**ja**.md というファイルを修正して行います。
- **チュートリアル**
  - チュートリアルの原文はcontent/tutorial配下のそれぞれの章ごとに`text.md`というファイルから読み取られています。
    日本語翻訳は、その`text.md`をコピーして`text.ja.md`というファイルを作成して文章を翻訳します。  
    (`text.ja.md`はホットリロードだと変更が反映されないのでご注意ください！)
- **トップページ**
  - トップページはmessages配下の`en.json`が原文で、日本語翻訳は`ja.json`ファイルです。
- **Chat(Discord)のリンク**
  - Svelte本体のDiscordのリンクはsrc/routes配下の`chat.js`にあり、Svelte日本Discordのリンクは`chat-jp.js`にあります。

```
.
├── content
│   ├── blog
│   │   ├── 2016-11-26-frameworks-without-the-framework.md         # <- Blogの原文
│   │   ...
│   │   └── ja
│   │       ├── 2016-11-26-frameworks-without-the-framework.ja.md  # <- Blogの日本語翻訳用ファイル
│   │       ...
│   │
│   ├── docs
│   │   ├── 00-introduction.md         # <- API Docsの原文
│   │   ...
│   │   └── ja
│   │       ├── 00-introduction.ja.md  # <- API Docsの日本語翻訳用ファイル
│   │       ...
│   │
│   ├── examples
│   ├── faq
│   │   ├── 100-im-new-to-svelte.md         # <- FAQの原文
│   │   ...
│   │   └── ja
│   │       ├── 100-im-new-to-svelte.ja.md  # <- FAQの日本語翻訳用ファイル
│   │       ...
│   │
│   └── tutorial
│       ├── 01-introduction
│       │   ├── 01-basics
│       │   │   ├── app-a
│       │   │   ├── text.ja.md  # <- チュートリアルの日本語翻訳用ファイル
│       │   │   └── text.md     # <- チュートリアルの原文
│       ...
...
├── messages
│   ├── en.json           # <- トップページの英語ファイル
│   └── ja.json           # <- トップページの日本語ファイル
...
├── src
│   ├── routes
│   │   ...
│   │   ├── index.svelte  # <- トップページ
│   │   ...
│   │   ├── chat-jp.js  # <- Svelte日本Discordへのリンク
│   │   ├── chat.js     # <- SvelteDiscordへのリンク
│   │   ...
etc...
```


### 翻訳の流れ


#### 1. 翻訳するドキュメントを選ぶ

翻訳が必要な文書は[Issue](https://github.com/svelte-jp/svelte-site-jp/issues?q=is%3Aopen+is%3Aissue+label%3Atranslation)が作成されています。

まだ誰も着手していないIssueには`翻訳者募集中`というLabelがついています。翻訳したいものがあれば、Issueのコメントで知らせてください(堅苦しい挨拶などは不要です。「この翻訳やりましょうか？」と言っていただけたらそれだけでとても嬉しいです！)。

運営側から依頼する旨をコメントで返信しますので、その後に作業を開始してください。

もし翻訳したいドキュメントのIssueがなければ、Issueを作成してください。


#### 2. 環境設定

このリポジトリをForkし、セットアップしてください。

```
git clone https://github.com/{USER}/svelte-site-jp.git
cd svelte-site-jp
npm ci
npm run update
npm run dev
```

このあと[localhost:3000](http://localhost:3000)にアクセスし、正常に表示されることを確認します。


#### 3. 翻訳作業

[ディレクトリ構成・翻訳の仕組み](#ディレクトリ構成翻訳の仕組み)を参考に、担当する文書を見つけてください。

実際の翻訳については[翻訳のガイドライン](#翻訳のガイドライン)を参考にしてください。

> いきなり完璧な翻訳を目指さなくても大丈夫です。PRに間違いや誤字・脱字があっても大丈夫です。ちゃんとレビューをしますし、レビューで怒ったりしませんのでご安心ください。それより、あなたがこのプロジェクトに貢献するため時間と労力を割いてくれたことに感謝しかありません。


##### 3-1. ブログの翻訳について

ブログ記事は長文になることが多く、オピニオネイテッドな意見もあり、言い回しや誤訳によって誤解を招く可能性があります。  
オリジナルの著者の方にご迷惑をかけるのを防ぐ目的で、翻訳された文書であることを特に強調するために下記のテンプレートを追記してください。

```markdown
> 翻訳 : Svelte日本コミュニティ  
> 
> 日本語版はオリジナルをよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはオリジナルである英語版を参照してください。  
> - オリジナル [SvelteKit is in public beta](https://svelte.dev/blog/sveltekit-beta)
> 
> また、日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。  
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)
```

見本： https://raw.githubusercontent.com/svelte-jp/svelte-site-jp/master/content/blog/ja/2021-03-23-sveltekit-beta.ja.md


#### 4. lintの実行

lintを実行し、引っかかった箇所は修正してください。

```
npm run lint
```

終わったらcommitし、Fork先にpushします。


#### 5. Pull Request作成

Fork元にPull Requestを提出してください。Pull RequestのコメントにはIssueの番号を含めてください。レビュー後、問題がなければマージされます。
PRに間違いや誤字・脱字、ガイドライン違反があっても大丈夫です。間違いを恐れないでください。


## 翻訳スタイル

- [JTF日本語標準スタイルガイド（翻訳用）](https://www.jtf.jp/tips/styleguide) に準拠することとします
- JTF日本語標準スタイルのチェックツールは [textlint-plugin-JTF-style](https://github.com/azu/textlint-plugin-JTF-style) を使用し、ルールは[一部カスタマイズ](.textlintrc)してあります


### 翻訳のガイドライン

[「公用文作成の要領」の見直しに関する国語課題小委員会の検討状況（案）](https://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/kokugo/kokugo_72/pdf/r1422554_04.pdf)

#### 文体

「だである」ではなく「ですます」調を使用してください。


#### 改行位置を原文と揃える

可能な限り、原文と翻訳文の行数を揃え、更新時のdiffチェックが楽になるように協力してください。


#### 単語、表記ゆれ

[DICTIONARY.md](https://github.com/svelte-jp/svelte-site-jp/blob/master/DICTIONARY.md)を参考にしてください。


#### ダッシュ

原文で使われているダッシュは、以下のように場合に応じて訳し分けてください。

- 和訳で文中に埋め込まれるような語句を区切っている場合、ダッシュの代わりに括弧でその語句を囲んでください
- 和訳で文と文の区切りになっている場合、ダッシュの代わりに句点（`。`）を打ってください
- 箇条書きの項目と説明を区切っている場合、ダッシュをそのままにする


## Issueを作成する

何かお気づきの点などがある場合はお気軽にIssueを作成して頂いて構いません。
以下のテンプレートを用意しております。

- 翻訳ドキュメント追加
  - 翻訳したい/してほしいドキュメントがIssueになければこちらをご使用ください。
- 誤字・脱字・誤訳報告、翻訳改善要望
  - 誤字・脱字・誤訳や、不自然な言い回しやよりより翻訳文があればこちらをご使用ください。
- その他
  - ご質問、ご意見、お気軽にどうぞ！


## その他

- Svelte本体の変更は大体月に1度のペースで日本語サイトにも反映を行います。これは、Svelte本体のサイトが大体月に1度(月初、毎月のNewsletterが入るタイミング)で更新されるためです。
  Svelte本体のサイトに緊急で更新がある場合はなるべくそれに追従したいと考えています。
  - 反映の方法は Wikiの [How to fork from Svelte site, and How to follow Svelte site](https://github.com/svelte-jp/svelte-site-jp/wiki/How-to-fork-from-Svelte-site,-and-How-to-follow-Svelte-site) に記載しています。


## 備考

翻訳の進め方やCONTRIBUTING.mdに記載する内容などは、各フロントエンドフレームワーク及びライブラリの日本語化プロジェクトである、[angular/angular-ja](https://github.com/angular/angular-ja)、[vuejs
/jp.vuejs.org](https://github.com/vuejs/jp.vuejs.org), [reactjs/ja.reactjs.org](https://github.com/reactjs/ja.reactjs.org)を参考にさせて頂きました。


## ライセンス

Svelte Site JPは[sveltejs/svelteのsiteディレクトリ](https://github.com/sveltejs/svelte/tree/master/site)をフォークして作成されており、ライセンス(MIT)を引き継いでいます。

Svelte Site JPに貢献することにより、あなたはあなたの貢献が[MIT license](https://github.com/svelte-jp/svelte-site-jp/blob/master/LICENSE)の下でライセンスされることに同意するものとします。
