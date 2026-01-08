# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expo/React Native project using **Expo Router v6** for file-based navigation. Designed as a template repository for Expo development with code quality tools pre-configured.

### テンプレートリポジトリとしての目的

- **コード品質管理**: ESLint、Prettier、TypeScript strict モード、Husky + lint-staged
- **ベストプラクティス**: Expo Router v6、React Compiler、New Architecture
- **マルチプラットフォーム**: iOS、Android、Web対応

## Development Commands

```bash
# Development Server
npx expo start           # Start dev server (with options menu)
npx expo start -c        # Start with cache cleared (use after adding native modules)
npm run android          # Start on Android
npm run ios              # Start on iOS
npm run web              # Start on Web

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Package Installation
npx expo install <pkg>   # Install Expo-compatible version of a package
```

## コード品質ガイドライン（Claude Code向け）

**IMPORTANT**: コード変更後は必ず以下を実行：

```bash
npm run lint && npm run format
```

**品質基準:**

- ESLintエラー/警告: 0件
- Prettierフォーマット: 100%準拠
- TypeScriptエラー: 0件

## 作業フロー（Claude Code向け）

**IMPORTANT**: 以下の作業を行う前に、必ず計画を提示してユーザーの承認を得てください：

- 新しいライブラリやパッケージのセットアップ
- アーキテクチャに影響する変更
- 複数ファイルにまたがる大規模な変更
- 設定ファイルの変更

**手順:**

1. 作業内容の計画を立てる
2. 計画をユーザーに提示する
3. ユーザーから承認（Yes）を得てから実行する

## Architecture

### Routing Structure

- **Expo Router v6** with file-based routing
- Routes in `app/` directory
- `app/_layout.tsx`: Root layout (Stack navigator with providers)
- `app/index.tsx`: Home screen
- **Typed routes** enabled via `experiments.typedRoutes`

### UI Framework: Tamagui + React Native

- Configuration: `tamagui.config.ts` (uses `@tamagui/config/v4` defaults)
- Provider hierarchy in `_layout.tsx`:
  ```
  TamaguiProvider → PortalProvider → ThemeProvider → Stack
  ```
- Supports dark/light theme via `useColorScheme()`
- **IMPORTANT**: Use React Native's `TextInput` instead of Tamagui's `Input` for reliable keyboard behavior on iOS
- Tamagui components: Button, Card, Checkbox, Label, Text, XStack, YStack, etc.

### Form Handling

- **React Hook Form** + **Zod** for validation
- Pattern: `useForm` with `zodResolver(schema)`
- Controller component for controlled inputs
- Use `KeyboardAvoidingView` wrapper for forms on iOS

### Native Components

For platform-specific UI:

- Text input: React Native `TextInput` (not Tamagui Input)
- Date picker: `@react-native-community/datetimepicker`
- Dropdown: `@react-native-picker/picker` (more reliable than Tamagui Select on native)
- Checkbox: Tamagui `Checkbox` with `Check` icon from `@tamagui/lucide-icons`

### Path Aliases

```tsx
// @/* maps to project root (configured in tsconfig.json)
import Component from '@/components/MyComponent';
```

### Key Configuration (app.json)

- `newArchEnabled: true` - New Architecture
- `experiments.reactCompiler: true` - React Compiler
- `experiments.typedRoutes: true` - Typed Routes
- `scheme: "expotemplate"` - Custom URL scheme
- Android edge-to-edge mode enabled

### Project Structure

```
app/           # Expo Router pages
app-example/   # Original Expo template files (reference)
assets/        # Images and assets
```

## Tech Stack

- React Native 0.81.5
- React 19.1.0
- Expo SDK 54
- Tamagui (UI components)
- React Hook Form + Zod (form validation)
- TypeScript (strict mode)

## iOS Simulator Tips

- **Keyboard not showing?** Toggle hardware keyboard: `Cmd + Shift + K` or Menu → I/O → Keyboard → Connect Hardware Keyboard
