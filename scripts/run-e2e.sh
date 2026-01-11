#!/bin/bash

# iOS Simulatorが起動しているか確認
if ! pgrep -x "Simulator" > /dev/null; then
    echo "📱 Starting iOS Simulator..."
    open -a Simulator

    # Simulatorが完全に起動するまで待機
    sleep 5

    # デバイスが起動するまで待機
    echo "⏳ Waiting for device to boot..."
    xcrun simctl bootstatus booted -b 2>/dev/null || sleep 10
fi

# Expo Goアプリのデータをクリア（開発者メニューの初回表示を防ぐ）
echo "🧹 Clearing Expo Go app data..."
xcrun simctl terminate booted host.exp.Exponent 2>/dev/null || true
xcrun simctl privacy booted reset all host.exp.Exponent 2>/dev/null || true

# Expoサーバーが起動しているか確認（ポート8081）
if ! lsof -i :8081 > /dev/null 2>&1; then
    echo "🚀 Starting Expo server (no-dev mode)..."
    npx expo start --ios --no-dev &
    EXPO_PID=$!

    # Expoサーバーが起動するまで待機
    echo "⏳ Waiting for Expo server to start..."
    sleep 15

    # メトロバンドラーが準備完了するまで追加待機
    until curl -s http://localhost:8081 > /dev/null 2>&1; do
        sleep 2
    done

    # アプリが完全に読み込まれるまで追加待機
    echo "⏳ Waiting for app to fully load..."
    sleep 20
fi

echo "🧪 Running Maestro E2E tests..."
maestro test e2e/flows/

# テスト結果を保存
TEST_RESULT=$?

exit $TEST_RESULT
