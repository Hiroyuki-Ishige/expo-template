import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  H1,
  H2,
  H3,
  Input,
  Label,
  Paragraph,
  Separator,
  Spinner,
  Switch,
  Text,
  XStack,
  YStack,
} from 'tamagui';

export default function Index() {
  const [text, setText] = useState('');
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F2F2F7' }}
      contentContainerStyle={{ padding: 16, paddingTop: 60, paddingBottom: 40 }}
    >
      <YStack
        gap="$4"
        style={{ maxWidth: 500, width: '100%', alignSelf: 'center' }}
      >
        <H1 style={{ textAlign: 'center' }}>Expo Template</H1>
        <Paragraph style={{ textAlign: 'center', color: '#666' }}>
          Tamagui コンポーネント一覧
        </Paragraph>

        <Separator />

        {/* Buttons */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Buttons
          </H2>
          <XStack gap="$2" flexWrap="wrap">
            <Button theme="blue">Primary</Button>
            <Button>Secondary</Button>
            <Button theme="red">Danger</Button>
          </XStack>
          <XStack gap="$2" flexWrap="wrap" style={{ marginTop: 8 }}>
            <Button size="$2">Small</Button>
            <Button size="$4">Medium</Button>
            <Button size="$5">Large</Button>
          </XStack>
        </Card>

        {/* Text Input */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Text Input
          </H2>
          <Input
            placeholder="テキストを入力..."
            value={text}
            onChangeText={setText}
            style={{ marginBottom: 8 }}
          />
          <Text style={{ color: '#666' }}>入力値: {text || '(空)'}</Text>
        </Card>

        {/* Switch */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Switch
          </H2>
          <XStack
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Label>通知を有効にする</Label>
            <Switch size="$4" checked={switchOn} onCheckedChange={setSwitchOn}>
              <Switch.Thumb animation="bouncy" />
            </Switch>
          </XStack>
          <Text style={{ color: '#666', marginTop: 8 }}>
            状態: {switchOn ? 'ON' : 'OFF'}
          </Text>
        </Card>

        {/* Spinner */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Spinner
          </H2>
          <XStack gap="$4" style={{ alignItems: 'center' }}>
            <Spinner size="small" />
            <Spinner size="large" />
          </XStack>
        </Card>

        {/* Shapes */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Shapes
          </H2>
          <XStack gap="$3" style={{ alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#0066FF',
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: '#34C759',
                borderRadius: 12,
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#FF3B30',
                borderRadius: 20,
              }}
            />
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: '#AF52DE',
                borderRadius: 24,
              }}
            />
          </XStack>
        </Card>

        {/* Card Example */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Card
          </H2>
          <Card bordered padded style={{ backgroundColor: '#F5F5F5' }}>
            <H3>カードタイトル</H3>
            <Paragraph style={{ color: '#444' }}>
              これはカードコンポーネントのサンプルです。様々なコンテンツを含めることができます。
            </Paragraph>
            <Button
              theme="blue"
              size="$3"
              style={{ marginTop: 12, alignSelf: 'flex-start' }}
            >
              詳細を見る
            </Button>
          </Card>
        </Card>

        {/* Typography */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Typography
          </H2>
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <Paragraph>Body text - 本文テキストのサンプルです。</Paragraph>
          <Text style={{ fontSize: 12, color: '#666' }}>
            Caption - キャプションテキスト
          </Text>
        </Card>

        {/* Colors */}
        <Card padded elevate>
          <H2 size="$6" style={{ marginBottom: 12 }}>
            Colors
          </H2>
          <XStack gap="$2" style={{ marginBottom: 8 }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#0066FF',
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#34C759',
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#FF9500',
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#FF3B30',
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#AF52DE',
                borderRadius: 8,
              }}
            />
          </XStack>
          <XStack gap="$2">
            <Text style={{ fontSize: 10, width: 40, textAlign: 'center' }}>
              Blue
            </Text>
            <Text style={{ fontSize: 10, width: 40, textAlign: 'center' }}>
              Green
            </Text>
            <Text style={{ fontSize: 10, width: 40, textAlign: 'center' }}>
              Orange
            </Text>
            <Text style={{ fontSize: 10, width: 40, textAlign: 'center' }}>
              Red
            </Text>
            <Text style={{ fontSize: 10, width: 40, textAlign: 'center' }}>
              Purple
            </Text>
          </XStack>
        </Card>

        <Paragraph style={{ textAlign: 'center', color: '#999', marginTop: 8 }}>
          Expo Template v1.0.0
        </Paragraph>
      </YStack>
    </ScrollView>
  );
}
