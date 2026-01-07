# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo/React Native project using **Expo Router** for file-based navigation. The project has been simplified from the default Expo template to provide a clean starting point.

### テンプレートリポジトリとしての目的

このリポジトリは、Expo 開発における汎用的なテンプレートリポジトリとして設計されています。以下の特徴を備えています：

- **コード品質管理**: ESLint や TypeScript strict モードなど、コード品質を保つための設定が完備
- **テスト環境**: テスト環境のセットアップが完了（今後追加予定）
- **ベストプラクティス**: Expo Router、React Compiler、New Architecture など、最新のベストプラクティスを採用
- **即座に開発開始可能**: 不要なボイラープレートを削減し、すぐにプロダクション開発を開始できる状態

新規プロジェクトを開始する際は、このリポジトリをテンプレートとして使用することで、初期セットアップの時間を大幅に短縮できます。

## Development Commands

### Starting the Development Server

```bash
npx expo start           # Start dev server with options menu
npm run start            # Same as above
npm run android          # Start and open on Android
npm run ios              # Start and open on iOS
npm run web              # Start and open on web
```

### Code Quality

```bash
npm run lint             # Run ESLint
```

## Architecture

### Routing Structure

- Uses **Expo Router v6** with file-based routing
- All routes are defined in the `app/` directory
- Current structure is minimal: just `app/_layout.tsx` (root layout with Stack navigator) and `app/index.tsx` (home screen)
- The project has **typed routes** enabled via `experiments.typedRoutes` in app.json

### Path Aliases

- `@/*` maps to the project root (configured in tsconfig.json)
- Use `@/` for imports: `import Component from '@/components/MyComponent'`

### Key Configuration

**Expo Features Enabled:**

- New Architecture: `newArchEnabled: true` in app.json
- React Compiler: experimental feature enabled
- Android edge-to-edge mode enabled
- Custom URL scheme: `expotemplate://`

**TypeScript:**

- Strict mode enabled
- Using Expo's base TypeScript configuration

### Project Structure Notes

- The `app-example/` directory contains the original Expo template files (tabs, themed components, etc.) for reference
- The active app is in `app/` and has been stripped down to basics
- Assets are in `assets/images/`
- React Native 0.81.5 with React 19.1.0

## Platform Support

This is a universal app supporting:

- iOS (with tablet support)
- Android (with adaptive icons and edge-to-edge)
- Web (static output)
