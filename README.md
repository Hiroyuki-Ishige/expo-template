# Expo テンプレートリポジトリ

このリポジトリは、Expo/React Native開発のための汎用的なテンプレートリポジトリです。新規プロジェクトを開始する際に、このテンプレートを使用することで、コード品質管理やベストプラクティスが適用された状態からすぐに開発を始めることができます。

## テンプレートの特徴

- **最新のExpo機能**: Expo Router v6、New Architecture、React Compilerなど、最新の機能を採用
- **コード品質管理**: ESLint、TypeScript strictモード、typed routesなどが設定済み
- **テスト環境**: テスト環境のセットアップが完了（今後追加予定）
- **クリーンな構造**: 不要なボイラープレートを削減し、必要最小限の構成
- **パスエイリアス**: `@/*` で便利なインポートが可能
- **マルチプラットフォーム対応**: iOS、Android、Webに対応

## 使い方

### 1. このテンプレートから新規リポジトリを作成

GitHubの「Use this template」ボタンをクリックして、新しいリポジトリを作成してください。

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npx expo start
```

出力されたメニューから、以下のオプションを選択できます：

- [開発ビルド](https://docs.expo.dev/develop/development-builds/introduction/)
- [Androidエミュレーター](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOSシミュレーター](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) - Expo開発を試すための限定的なサンドボックス

### 4. 開発を開始

**app** ディレクトリ内のファイルを編集して開発を開始できます。このプロジェクトは[ファイルベースルーティング](https://docs.expo.dev/router/introduction)を使用しています。

## 利用可能なコマンド

### 開発サーバー

```bash
npx expo start           # 開発サーバーを起動（オプションメニュー付き）
npm run start            # 上記と同じ
npm run android          # Android版を起動
npm run ios              # iOS版を起動
npm run web              # Web版を起動
```

### コード品質

```bash
npm run lint             # ESLintを実行
```

## プロジェクト構造

```
expo-template/
├── app/                 # アプリケーションのメインディレクトリ（Expo Router）
│   ├── _layout.tsx     # ルートレイアウト（Stack navigator）
│   └── index.tsx       # ホーム画面
├── app-example/        # オリジナルのExpoテンプレートファイル（参考用）
├── assets/             # 画像などのアセット
└── CLAUDE.md           # Claude Code向けの開発ガイド
```

## 設定済みの機能

### Expo機能
- New Architecture有効化（`newArchEnabled: true`）
- React Compiler（experimental）
- Androidエッジツーエッジモード
- カスタムURLスキーム: `expotemplate://`
- Typed Routes有効化

### TypeScript
- Strict mode有効
- Expoのベース設定を使用

### パスエイリアス
- `@/*` がプロジェクトルートにマッピング
- 例: `import Component from '@/components/MyComponent'`

## 技術スタック

- React Native 0.81.5
- React 19.1.0
- Expo Router v6
- TypeScript（strict mode）

## 参考資料

Expoでのプロジェクト開発について詳しく知りたい場合は、以下のリソースを参照してください：

- [Expoドキュメント](https://docs.expo.dev/): 基礎や[ガイド](https://docs.expo.dev/guides)で高度なトピックを学習
- [Expo学習チュートリアル](https://docs.expo.dev/tutorial/introduction/): Android、iOS、Webで動作するプロジェクトを作成するステップバイステップのチュートリアル

## コミュニティ

ユニバーサルアプリを作成する開発者のコミュニティに参加しましょう：

- [Expo on GitHub](https://github.com/expo/expo): オープンソースプラットフォームを見て、貢献する
- [Discordコミュニティ](https://chat.expo.dev): Expoユーザーとチャットして質問する

## 今後の予定

- [ ] Jestやテストライブラリの設定
- [ ] コンポーネントライブラリの統合例
- [ ] 環境変数管理の設定
- [ ] CIの設定例

---

このテンプレートを使用して、素晴らしいExpoアプリを開発してください！
