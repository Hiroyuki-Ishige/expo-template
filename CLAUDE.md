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
# 前提: iOS Simulator で Expo Go アプリを起動しておく
npx expo start --ios
# 別ターミナルで:
npm run e2e           # 全E2Eテスト実行
npm run e2e:form      # フォーム入力テスト
npm run e2e:counter   # カウンターテスト
```

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

# 開発者メニューが表示されていれば閉じる（条件付き実行）
- runFlow:
    when:
      visible: 'Continue'
    commands:
      - tapOn: 'Continue'

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

### Key Configuration (app.json)

- `newArchEnabled: true`
- `experiments.reactCompiler: true`
- `experiments.typedRoutes: true`
- `scheme: "expotemplate"`

## iOS Simulator Tips

**Keyboard not showing?** Toggle: `Cmd + Shift + K` or Menu → I/O → Keyboard → Connect Hardware Keyboard
