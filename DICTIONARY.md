**※作業中**

この辞書に追加した言葉や改善したい言葉があれば是非Issueを作成してください！  
ご提案に添えるかわかりませんが、あなたの意見を聞いて会話をしたいと思っています。

## 方針

これらの方針の内容はVueの日本語翻訳プロジェクトを借用・参考にしています。  
- [vuejs/jp.vuejs.orgのCONTRIBUTING.md](https://github.com/vuejs/jp.vuejs.org/blob/lang-ja/CONTRIBUTING.md)

vueのドキュメントの日本語翻訳は統一感があり非常にわかりやすいです。  


### 単語の統一 (特に技術用語)

技術用語は基本英語、ただ日本語で一般的に使われている場合は日本語でも可です。

和訳に困ったらとりあえず英語を残してください。

和訳にして分かりづらい場合は、翻訳と英語(どちらかに括弧付け)でも可です。
- 例:
  - Two way -> Two way (双方向) or 双方向 (Two way)

### 長音訳について

原則、長音なしで翻訳してください。

- 例:computer
  - OK:コンピュータ
  - NG:コンピューター

ただし、長音なしで訳した場合、意味が分かりにくいものは、例外として長音ありで訳してもよいです。
- 例：
  - error -> エラー
  - throw -> スロー


## 一覧

原語|日本語訳|備考
-|-|-
first/second/third...n-th argument|第1引数 第2引数 第3引数 第N引数|半角算用数字を使う
bundler plugin|バンドルプラグイン|長音(ー)を省略する。また「バンドラプラグイン」としない。
callback|コールバック|カタカナにする
compiler|コンパイラ|長音(ー)を省略する。
component|コンポーネント|
context|context|
container|コンテナ|長音(ー)を省略する。
development mode|development モード|
directive/directives|ディレクティブ|
dispatch|ディスパッチ|
dispatcher|ディスパッチャー|慣習として例外的に長音（ー）をつける
export|エクスポート|但し`export`キーワードそのものを指している場合は`export`。
handler|ハンドラ|長音(ー)を省略する。
import|インポート|但し`import`キーワードそのものを指している場合は`import`。
listen|リッスン|「リスン」としない。Vueでは「リッスン」が使用され、MDNでも「リッスン」のほうが多く使用されているため。
mount|マウント|
promise|promise|JavaScript の PromiseAPI を指している場合は、そのまま使用する
prop/props|prop/props|英語のままで統一する。「プロップ」「プロップス」としない。
property/properties|プロパティ|文脈に応じて使い分ける。
reactive|リアクティブ|「反応的」「反応する」ではなく、「リアクティブである」「リアクティブになる」など
reactivity|リアクティビティ|「反応性」ではなく、「リアクティビティ」など
script|script|`<script>`やJavaScriptのコードを指している場合など、原則として`script`とする。但し、文章や台詞の意味で使用されている場合は`スクリプト`でも可。
state|state|コンポーネントやJavaScript及びブラウザで保持している値や、バックエンドとの間で共有しているデータなど、フロントエンドで一般的に使用される`state`は英語そのまま。ただし、それとは無関係の文脈の場合は`状態`で良い。
store/stores|ストア|
style|style or スタイル|文脈に応じて使い分ける。`<style>`タグそのものを指している場合は`style`、cssについて書いている場合は`スタイル`など。開発者にとって自然に読めればどちらでも可。
unmount|アンマウント|
vanilla JS/CSS|純粋なJS/CSS|「バニラJS/CSS」としない。
