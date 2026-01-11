# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expo/React Native template repository with pre-configured code quality tools.

**主な特徴:**

- Expo Router v6 (file-based routing)
- New Architecture + React Compiler enabled
- Tamagui UI framework
- Zustand (state management)
- Jest + jest-expo (unit testing)
- Maestro (E2E testing)
- ESLint + Prettier + Husky (pre-commit hooks)
- TypeScript strict mode

## Development Commands

```bash
# Development Server
npx expo start           # Start dev server
npx expo start -c        # Start with cache cleared (use after adding native modules)
npm run android          # Start on Android
npm run ios              # Start on iOS
npm run web              # Start on Web

# Unit Testing
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm test -- __tests__/stores/counter-store.test.ts  # Run specific file
npm test -- --testNamePattern="increment"           # Run tests matching pattern

# E2E Testing (Maestro)
npm run e2e              # Run all E2E tests
npm run e2e:form         # Run form submission test
npm run e2e:counter      # Run counter test

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Package Installation
npx expo install <pkg>   # Install Expo-compatible version
```

## コード品質ガイドライン

**Pre-commit Hook (自動実行)**: コミット時に以下が自動実行されます：

1. `lint-staged` - ステージされたファイルにESLint + Prettierを適用
2. `npm test` - 全テストを実行

**手動実行**:

```bash
npm run lint && npm run format
```

品質基準: ESLintエラー/警告 0件、Prettierフォーマット 100%準拠、TypeScriptエラー 0件、テスト全件パス

## 作業フロー

**IMPORTANT**: 以下の作業を行う前に、必ず計画を提示してユーザーの承認を得てください：

- 新しいライブラリやパッケージのセットアップ
- アーキテクチャに影響する変更
- 複数ファイルにまたがる大規模な変更
- 設定ファイルの変更

## Architecture

### Routing

- Routes in `app/` directory
- `app/_layout.tsx`: Root layout with provider hierarchy
- Typed routes enabled (`experiments.typedRoutes`)

### Provider Hierarchy (in \_layout.tsx)

```
TamaguiProvider → PortalProvider → ThemeProvider → Stack
```

### UI Components

**IMPORTANT - Known Issues:**

- **TextInput**: Use React Native's `TextInput` instead of Tamagui's `Input` for reliable keyboard behavior on iOS
- **Dropdown**: Use `@react-native-picker/picker` instead of Tamagui Select on native platforms

**Recommended native components:**

- Text input: `TextInput` from `react-native`
- Year/Month picker: `@react-native-picker/picker` (2つのPickerを並べて年月選択)
- Dropdown: `@react-native-picker/picker`
- Checkbox: Tamagui `Checkbox` with `Check` icon from `@tamagui/lucide-icons`

### Form Handling

React Hook Form + Zod pattern:

```tsx
const { control, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

Use `KeyboardAvoidingView` wrapper for forms on iOS.

### State Management

Zustand pattern (stores in `stores/` directory):

```typescript
import { create } from 'zustand';

interface ExampleState {
  value: string;
  setValue: (value: string) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}));
```

### Path Aliases

```tsx
import Component from '@/components/MyComponent'; // @/* → project root
```

## Testing Strategy

テストピラミッドの原則に基づき、各テスト種類の役割を明確化。

### テスト種類と役割

| テスト種類 | 目的                         | 実行速度 | 実行頻度      |
| ---------- | ---------------------------- | -------- | ------------- |
| 単体テスト | ビジネスロジックの正確性検証 | 高速     | コミット毎    |
| 結合テスト | 複数ユニットの連携検証       | 中速     | コミット毎    |
| E2Eテスト  | ユーザー視点での機能検証     | 低速     | PR/リリース前 |

### テスト対象マトリックス

| 対象                                   | 単体 | 結合 | E2E             |
| -------------------------------------- | ---- | ---- | --------------- |
| Zustandストア（状態管理ロジック）      | ✅   | -    | -               |
| Zodスキーマ（バリデーションルール）    | ✅   | -    | -               |
| ユーティリティ関数                     | ✅   | -    | -               |
| カスタムフック（ビジネスロジック含む） | ✅   | -    | -               |
| フォーム送信フロー                     | -    | ✅   | ✅ ハッピーパス |
| ストア連携UI                           | -    | ✅   | ✅ ハッピーパス |
| ナビゲーション遷移                     | -    | -    | ✅              |
| 視覚的レイアウト                       | -    | -    | 手動確認        |

### 単体テスト方針

**テスト対象:**

- Zustandストア: 状態変更ロジック、派生状態の計算
- Zodスキーマ: バリデーションルール（正常系・異常系）
- ユーティリティ関数: 純粋関数のI/O検証
- カスタムフック: ビジネスロジックを含むもの

**テストしない:**

- Tamaguiコンポーネントの見た目（testID制限のため）
- React Nativeコアコンポーネント
- サードパーティライブラリの内部動作

**Zodスキーマテスト例:**

```typescript
import { formSchema } from '@/schemas/form-schema';

describe('formSchema', () => {
  it('should reject empty name', () => {
    const result = formSchema.safeParse({
      name: '',
      email: 'test@example.com',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid email', () => {
    const result = formSchema.safeParse({
      name: 'Test',
      email: 'invalid',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('should accept valid data', () => {
    const result = formSchema.safeParse({
      name: 'Test',
      email: 'test@example.com',
      agreeToTerms: true,
    });
    expect(result.success).toBe(true);
  });
});
```

### 結合テスト方針

**テスト対象:**

- フォーム全体（React Hook Form + Zod + Submit処理）
- ストアとコンポーネントの連携
- API呼び出しを含むフロー（モック使用）

**注意点:**

- TamaguiコンポーネントはtestIDが機能しないため、`getByText`や`getByRole`を使用
- 重いテストになりがちなので本当に必要な箇所のみ実装
- APIはモック化して外部依存を排除

**結合テスト例:**

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

it('should show success alert on valid form submission', async () => {
  const { getByTestId, getByText } = render(<FormComponent />);

  fireEvent.changeText(getByTestId('input-name'), 'TestUser');
  fireEvent.changeText(getByTestId('input-email'), 'test@example.com');
  fireEvent.press(getByText('利用規約に同意する'));
  fireEvent.press(getByText('送信'));

  await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('送信成功', expect.any(String));
  });
});
```

### E2Eテスト方針

**テスト対象:**

- クリティカルユーザージャーニー（ハッピーパスのみ）
- 主要機能の動作確認
- 実機/シミュレーター固有の動作

**テストしない:**

- エッジケース（単体/結合テストで網羅）
- 全エラーパターン（代表的なもののみ）
- パフォーマンス（別途計測）

**E2Eテストのスコープ:**

```
フォーム送信: 正常入力 → 送信 → 成功アラート表示
カウンター: +1 → +1 → -1 → Reset → 0表示確認
```

### テストファイル配置

```
__tests__/
├── stores/           # Zustandストアのテスト
│   └── counter-store.test.ts
├── schemas/          # Zodスキーマのテスト
│   └── form-schema.test.ts
├── utils/            # ユーティリティ関数のテスト
├── hooks/            # カスタムフックのテスト
└── integration/      # 結合テスト
    └── form-submission.test.tsx

e2e/flows/            # E2Eテスト（Maestro）
├── counter.yaml
└── form-submission.yaml
```

---

### Testing (Unit)

Jest + jest-expo + React Native Testing Library:

- Test files: `__tests__/` directory
- Configuration: `jest.config.js`, `jest.setup.js`
- Run tests: `npm test`

Zustand store test example:

```typescript
import { useCounterStore } from '@/stores/counter-store';

describe('useCounterStore', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 }); // Reset state
  });

  it('should increment count', () => {
    const { increment } = useCounterStore.getState();
    increment();
    expect(useCounterStore.getState().count).toBe(1);
  });
});
```

### E2E Testing (Maestro)

Maestro を使用したE2Eテスト:

- Flow files: `e2e/flows/` directory
- Platform: iOS Simulator + Expo Go

**セットアップ (初回のみ):**

```bash
brew tap mobile-dev-inc/tap
brew install mobile-dev-inc/tap/maestro
```

**テスト実行:**

```bash
npm run e2e           # 全E2Eテスト実行（要: Simulator + Expo起動済み）
npm run e2e:form      # フォーム入力テスト（要: Simulator + Expo起動済み）
npm run e2e:counter   # カウンターテスト（要: Simulator + Expo起動済み）
```

**E2Eテスト実行前の準備:**

1. iOS Simulatorを起動: `open -a Simulator`
2. Expoサーバーを起動: `npx expo start --ios`（Expo Goが自動インストールされる）
3. アプリがSimulatorで表示されたらE2Eテストを実行

**Expo Go の制限事項:**

- testID は React Native の `TextInput` では動作するが、Tamagui コンポーネントでは認識されない
- テキストベースのセレクター (`tapOn: "ボタン名"`) を推奨
- 日本語入力は予測変換が問題を起こすため、ASCII テキストを使用するか `pressKey: Enter` で確定する

**Flow file パターン:**

```yaml
appId: host.exp.Exponent
---
# Expo Go でプロジェクトを開く
- openLink: exp://localhost:8081

# アプリ読み込み待機（常に表示される要素を指定）
- extendedWaitUntil:
    visible: 'index' # ヘッダータイトルなど確実に見える要素
    timeout: 60000

# 開発者メニューが表示されていれば閉じる（条件付き実行）
- runFlow:
    when:
      visible: 'Continue'
    commands:
      - tapOn: 'Continue'

# 画面上部にスクロール（複数テスト実行時の状態リセット）
- scroll

# 要素までスクロール
- scrollUntilVisible:
    element:
      id: 'input-name'
    direction: DOWN
    timeout: 30000

# テキスト入力（既存テキストをクリア → 入力 → 確定）
- tapOn:
    id: 'input-name'
- eraseText: 50
- inputText: 'TestUser'
- pressKey: Enter
```

**注意点:**

- 複数のフローが並行実行されるため、各フローは他のテスト実行後の画面状態でも動作するように設計する
- `extendedWaitUntil` には常に画面に表示される要素（ヘッダーなど）を指定する
- スクロール位置をリセットするために `- scroll` を使用する

### Key Configuration (app.json)

- `newArchEnabled: true`
- `experiments.reactCompiler: true`
- `experiments.typedRoutes: true`
- `scheme: "expotemplate"`

## iOS Simulator Tips

**Keyboard not showing?** Toggle: `Cmd + Shift + K` or Menu → I/O → Keyboard → Connect Hardware Keyboard
