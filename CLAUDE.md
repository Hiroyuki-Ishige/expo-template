# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo/React Native project using **Expo Router** for file-based navigation. The project has been simplified from the default Expo template to provide a clean starting point.

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
