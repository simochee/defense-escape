# WXT template

## Features

- 完全な WXT の開発環境
- Biome と Lefthook による Git Hook ベースの Linter / Formatter
- commitlint と Conventional Commits によるバージョニング
- Chrome Web Store と Add-ons for Firefox への自動公開

## Usage

- [このリポジトリから、新しいリポジトリを作成](https://github.com/new?template_name=wxt-template&template_owner=simochee)
- [リポジトリにシークレットを登録](#repository-secrets)
- GitHub Actions ワークフローや `package.json`、 `wxt.config.ts` などに拡張機能の情報を入力
- 開発開始！

## Repositry Variables

Chrome Web Store と Add-ons for Firefox から取得できる拡張機能の ID を設定します。

- `CHROME_EXTENTION_ID`
- `FIREFOX_EXTENTION_ID`

## Repository Secrets

[`wxt submit init`](https://wxt.dev/api/cli/wxt-submit-init.html) で作成される `.env.submit` を元に、次の値を設定してください。

### Chrome Web Store

- `CHROME_CLIENT_ID`
- `CHROME_CLIENT_SECRET`
- `CHROME_REFRESH_TOKEN`

### Add-ons for Firefox

- `FIREFOX_JWT_ISSUER`
- `FIREFOX_JWT_SECRET`

## Additional: React + Tailwind CSS

はじめに、必要な依存関係を追加でインストールします。

```sh
pnpm add react{,-dom}
pnpm add -D @tsconfig/vite-react @types/react{,-dom} tailwindcss @tailwindcss/vite
```

`tsconfig.json` を更新します。

```bash
echo "$(jq '.extends |= ["@tsconfig/vite-react"] + (. // [])' tsconfig.json)" > tsconfig.json
```

つぎに、Tailwind CSS の Vite Plugin を `wxt.config.ts` に設定します。

```diff
+ import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
+  vite: () => ({
+    plugins: [tailwindcss()],
+  }),
});
```

さいごに、 Tailwind CSS のエントリーポイントとなる CSS ファイルを作成します。

```sh
echo "@import \"tailwindcss\";" > assets/styles.css
```

CSS ファイルはエントリーポイントの HTML ファイルで参照することで利用可能になります。

```diff
+  <link rel="stylesheet" href="~/assets/styles.css">
```

## License

MIT
