import { useState } from 'react';
import { ScrollView } from 'react-native';
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
  Avatar,
  Square,
  Circle,
} from 'tamagui';

export default function Index() {
  const [text, setText] = useState('');
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F2F2F7' }}
      contentContainerStyle={{ padding: 16, paddingTop: 60, paddingBottom: 40 }}
    >
      <YStack gap="$4" maxWidth={500} width="100%" alignSelf="center">
        <H1 textAlign="center">Expo Template</H1>
        <Paragraph textAlign="center" color="$gray10">
          Tamaguiコンポーネント一覧
        </Paragraph>

        <Separator />

        {/* Buttons */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Buttons
          </H2>
          <XStack gap="$2" flexWrap="wrap">
            <Button theme="blue">Primary</Button>
            <Button theme="gray">Secondary</Button>
            <Button theme="red">Danger</Button>
          </XStack>
          <XStack gap="$2" flexWrap="wrap" marginTop="$2">
            <Button size="$2">Small</Button>
            <Button size="$4">Medium</Button>
            <Button size="$5">Large</Button>
          </XStack>
        </Card>

        {/* Text Input */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Text Input
          </H2>
          <Input
            placeholder="テキストを入力..."
            value={text}
            onChangeText={setText}
            marginBottom="$2"
          />
          <Text color="$gray10">入力値: {text || '(空)'}</Text>
        </Card>

        {/* Switch */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Switch
          </H2>
          <XStack justifyContent="space-between" alignItems="center">
            <Label>通知を有効にする</Label>
            <Switch size="$4" checked={switchOn} onCheckedChange={setSwitchOn}>
              <Switch.Thumb animation="bouncy" />
            </Switch>
          </XStack>
          <Text color="$gray10" marginTop="$2">
            状態: {switchOn ? 'ON' : 'OFF'}
          </Text>
        </Card>

        {/* Spinner */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Spinner
          </H2>
          <XStack gap="$4" alignItems="center">
            <Spinner size="small" color="$blue10" />
            <Spinner size="large" color="$green10" />
            <Spinner size="large" color="$red10" />
          </XStack>
        </Card>

        {/* Avatar */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Avatar
          </H2>
          <XStack gap="$3" alignItems="center">
            <Avatar circular size="$4">
              <Avatar.Image src="https://picsum.photos/100/100" />
              <Avatar.Fallback backgroundColor="$blue5" />
            </Avatar>
            <Avatar circular size="$6">
              <Avatar.Image src="https://picsum.photos/150/150" />
              <Avatar.Fallback backgroundColor="$green5" />
            </Avatar>
            <Avatar circular size="$8">
              <Avatar.Image src="https://picsum.photos/200/200" />
              <Avatar.Fallback backgroundColor="$red5" />
            </Avatar>
          </XStack>
        </Card>

        {/* Shapes */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Shapes
          </H2>
          <XStack gap="$3" alignItems="center">
            <Square size="$5" backgroundColor="$blue8" borderRadius="$2" />
            <Square size="$6" backgroundColor="$green8" borderRadius="$3" />
            <Circle size="$5" backgroundColor="$red8" />
            <Circle size="$6" backgroundColor="$purple8" />
          </XStack>
        </Card>

        {/* Card Example */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Card
          </H2>
          <Card bordered padded backgroundColor="$gray2">
            <H3>カードタイトル</H3>
            <Paragraph color="$gray11">
              これはカードコンポーネントのサンプルです。様々なコンテンツを含めることができます。
            </Paragraph>
            <Button
              theme="blue"
              size="$3"
              marginTop="$3"
              alignSelf="flex-start"
            >
              詳細を見る
            </Button>
          </Card>
        </Card>

        {/* Typography */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Typography
          </H2>
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <Paragraph>Body text - 本文テキストのサンプルです。</Paragraph>
          <Text fontSize="$2" color="$gray10">
            Caption - キャプションテキスト
          </Text>
        </Card>

        {/* Colors */}
        <Card padded elevate>
          <H2 size="$6" marginBottom="$3">
            Colors
          </H2>
          <XStack gap="$2" marginBottom="$2">
            <Square size="$5" backgroundColor="$blue8" borderRadius="$2" />
            <Square size="$5" backgroundColor="$green8" borderRadius="$2" />
            <Square size="$5" backgroundColor="$orange8" borderRadius="$2" />
            <Square size="$5" backgroundColor="$red8" borderRadius="$2" />
            <Square size="$5" backgroundColor="$purple8" borderRadius="$2" />
          </XStack>
          <XStack gap="$2">
            <Text fontSize="$1" width="$5" textAlign="center">
              Blue
            </Text>
            <Text fontSize="$1" width="$5" textAlign="center">
              Green
            </Text>
            <Text fontSize="$1" width="$5" textAlign="center">
              Orange
            </Text>
            <Text fontSize="$1" width="$5" textAlign="center">
              Red
            </Text>
            <Text fontSize="$1" width="$5" textAlign="center">
              Purple
            </Text>
          </XStack>
        </Card>

        <Paragraph textAlign="center" color="$gray9" marginTop="$2">
          Expo Template v1.0.0
        </Paragraph>
      </YStack>
    </ScrollView>
  );
}
