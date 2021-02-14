
# Svelte Site JP

[Svelte](https://github.com/sveltejs/svelte)の公式ページ[svelte.dev](https://svelte.dev/)を日本語に翻訳するプロジェクトです。

Svelteは素晴らしいツールで、公式ドキュメント及びチュートリアルも非常に素晴らしいです。公式からは英語版のみ提供されていますが、日本語に翻訳されたドキュメントとチュートリアルがあれば日本語話者にとってはもっと学習しやすくなると考えています。

翻訳はまだまだ進行中ですが、[https://svelte-jp.herokuapp.com/](https://svelte-jp.herokuapp.com/)で閲覧することができます。

進捗は[Milestones](https://github.com/svelte-jp/svelte-site-jp/milestones)で確認できます。


## 貢献(Contribution)について

この翻訳プロジェクトではみなさんの貢献を歓迎しています！

興味がある方は[CONTRIBUTING.md](https://github.com/svelte-jp/svelte-site-jp/blob/master/CONTRIBUTING.md)をご参照ください。

意見や気が付いたことがあれば、お気軽にIssueを作成ください。もしくは[Svelte日本のDiscord](https://discord.com/invite/YTXq3ZtBbx)の `#ドキュメント翻訳`チャンネルに投稿頂いても構いません。

## Running locally

Set up the site project:

```bash
git clone https://github.com/svelte-jp/svelte-site-jp.git
cd svelte-site-jp
npm ci
npm run update
npm run dev
```

and navigate to [localhost:3000](http://localhost:3000).


## REPL GitHub integration

In order for the REPL's GitHub integration to work properly when running locally, you will need to:
- [create a GitHub OAuth app](https://github.com/settings/developers):
   - set `Authorization callback URL` to `http://localhost:3000/auth/callback`;
   - set `Application name` as you like, and `Homepage URL` as `http://localhost:3000/`;
   - create the app and take note of `Client ID` and `Client Secret`
- in this repo, create `site/.env` containing:
   ```
   GITHUB_CLIENT_ID=[your app's Client ID]
   GITHUB_CLIENT_SECRET=[your app's Client Secret]
   BASEURL=http://localhost:3000
   ```

## Building the site

To build the website, run `npm run build`. The output can be found in `__sapper__/build`.

## Testing

Tests can be run using `npm run test`.


## Linking `@sveltejs/site-kit` and `@sveltejs/site-repl`

This site depends on `@sveltejs/site-kit`, a collection of styles, components and icons used in common by *.svelte.dev websites, and `@sveltejs/site-repl`.

In order to work on features that depend on those packages, you need to [link](https://docs.npmjs.com/cli/link) their repositories:

- `cd <somewhere>`
- `git clone https://github.com/sveltejs/site-kit`
- `git clone https://github.com/sveltejs/svelte-repl`
- `cd <somewhere>/site-kit`
- `npm link`
- `cd <somewhere>/svelte-repl`
- `npm link`
- `cd <svelte-repo>/site`
- `npm link @sveltejs/site-kit`
- `npm link @sveltejs/svelte-repl`
 


## Translating the API docs

Anchors are automatically generated using headings in the documentation and by default (for the english language) they are latinised to make sure the URL is always conforming to RFC3986.

If we need to translate the API documentation to a language using unicode chars, we can setup this app to export the correct anchors by setting up `SLUG_PRESERVE_UNICODE` to `true` in `config.js`.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/tomoam"><img src="https://avatars.githubusercontent.com/u/29677552?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tomoam</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=tomoam" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/myLifeAsaDog"><img src="https://avatars.githubusercontent.com/u/18300178?v=4?s=100" width="100px;" alt=""/><br /><sub><b>myLifeAsaDog</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=myLifeAsaDog" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Makohan"><img src="https://avatars.githubusercontent.com/u/32333141?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mkin</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=Makohan" title="Documentation">📖</a></td>
    <td align="center"><a href="https://qiita.com/jay-es"><img src="https://avatars.githubusercontent.com/u/46585162?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jun Shindo</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=jay-es" title="Documentation">📖</a></td>
    <td align="center"><a href="https://speakerdeck.com/clown0082"><img src="https://avatars.githubusercontent.com/u/4125257?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Keeth Kuwahara</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=kkeeth" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/oekazuma"><img src="https://avatars.githubusercontent.com/u/29580221?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kazuma Oe</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=oekazuma" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Shunpoco"><img src="https://avatars.githubusercontent.com/u/25903627?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shunpoco</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=Shunpoco" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ampcpmgp"><img src="https://avatars.githubusercontent.com/u/13173632?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ampcpmgp</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=ampcpmgp" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/takoyaro"><img src="https://avatars.githubusercontent.com/u/54836677?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jimmy</b></sub></a><br /><a href="https://github.com/svelte-jp/svelte-site-jp/commits?author=takoyaro" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!