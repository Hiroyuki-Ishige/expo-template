# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expo/React Native template repository with pre-configured code quality tools.

**主な特徴:**

- Expo Router v6 (file-based routing)
- New Architecture + React Compiler enabled
- Tamagui UI framework
- Zustand (state management)
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

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Package Installation
npx expo install <pkg>   # Install Expo-compatible version
```

## コード品質ガイドライン

**IMPORTANT**: コード変更後は必ず以下を実行：

```bash
npm run lint && npm run format
```

品質基準: ESLintエラー/警告 0件、Prettierフォーマット 100%準拠、TypeScriptエラー 0件

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

### Key Configuration (app.json)

- `newArchEnabled: true`
- `experiments.reactCompiler: true`
- `experiments.typedRoutes: true`
- `scheme: "expotemplate"`

## iOS Simulator Tips

**Keyboard not showing?** Toggle: `Cmd + Shift + K` or Menu → I/O → Keyboard → Connect Hardware Keyboard
