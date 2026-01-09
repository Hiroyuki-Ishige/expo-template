import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import {
  Button,
  Card,
  Checkbox,
  H1,
  H2,
  H3,
  Label,
  Paragraph,
  Separator,
  Spinner,
  Switch,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { z } from 'zod';

import { useCounterStore } from '@/stores/counter-store';

const occupationOptions = [
  { value: 'student', label: '学生' },
  { value: 'employee', label: '会社員' },
  { value: 'self_employed', label: '自営業' },
  { value: 'other', label: 'その他' },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
  value: String(1900 + i),
  label: `${1900 + i}年`,
})).reverse();
const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}月`,
}));

const formSchema = z.object({
  name: z.string().min(2, '名前は2文字以上で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  age: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
      '有効な年齢を入力してください'
    ),
  birthYear: z.string().optional(),
  birthMonth: z.string().optional(),
  occupation: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: '利用規約に同意してください',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function Index() {
  const [text, setText] = useState('');
  const [switchOn, setSwitchOn] = useState(false);
  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounterStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: '',
      birthYear: '',
      birthMonth: '',
      occupation: '',
      agreeToTerms: false,
    },
  });

  const getOccupationLabel = (value: string | undefined) => {
    if (!value) return '未選択';
    const option = occupationOptions.find((opt) => opt.value === value);
    return option?.label || '未選択';
  };

  const formatBirthDate = (
    year: string | undefined,
    month: string | undefined
  ) => {
    if (!year && !month) return '未入力';
    if (year && month) return `${year}年${month}月`;
    if (year) return `${year}年`;
    return `${month}月`;
  };

  const onSubmit = (data: FormData) => {
    Alert.alert(
      '送信成功',
      `名前: ${data.name}\nメール: ${data.email}\n年齢: ${data.age || '未入力'}\n生年月: ${formatBirthDate(data.birthYear, data.birthMonth)}\n職業: ${getOccupationLabel(data.occupation)}`
    );
    reset();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: '#F2F2F7' }}
        contentContainerStyle={{
          padding: 16,
          paddingTop: 60,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="always"
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

          {/* Form Validation Demo (zod + React Hook Form) */}
          <Card padded elevate>
            <H2 size="$6" style={{ marginBottom: 4 }}>
              Form Validation
            </H2>
            <Paragraph
              style={{ color: '#666', marginBottom: 12, fontSize: 12 }}
            >
              zod + React Hook Form サンプル
            </Paragraph>

            <YStack gap="$3">
              {/* Name Field */}
              <YStack>
                <Label htmlFor="name">名前 *</Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="山田太郎"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={[styles.input, errors.name && styles.inputError]}
                      placeholderTextColor="#999"
                    />
                  )}
                />
                {errors.name && (
                  <Text
                    style={{ color: '#FF3B30', fontSize: 12, marginTop: 4 }}
                  >
                    {errors.name.message}
                  </Text>
                )}
              </YStack>

              {/* Email Field */}
              <YStack>
                <Label htmlFor="email">メールアドレス *</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="example@email.com"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={[styles.input, errors.email && styles.inputError]}
                      placeholderTextColor="#999"
                    />
                  )}
                />
                {errors.email && (
                  <Text
                    style={{ color: '#FF3B30', fontSize: 12, marginTop: 4 }}
                  >
                    {errors.email.message}
                  </Text>
                )}
              </YStack>

              {/* Age Field */}
              <YStack>
                <Label htmlFor="age">年齢（任意）</Label>
                <Controller
                  control={control}
                  name="age"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="25"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      style={[styles.input, errors.age && styles.inputError]}
                      placeholderTextColor="#999"
                    />
                  )}
                />
                {errors.age && (
                  <Text
                    style={{ color: '#FF3B30', fontSize: 12, marginTop: 4 }}
                  >
                    {errors.age.message}
                  </Text>
                )}
              </YStack>

              {/* Birth Year/Month Fields */}
              <YStack>
                <Label>生年月（任意）</Label>
                <XStack gap="$2">
                  {/* Year Picker */}
                  <View style={{ flex: 1 }}>
                    <Controller
                      control={control}
                      name="birthYear"
                      render={({ field: { onChange, value } }) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                          }}
                        >
                          <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={{
                              height: Platform.OS === 'ios' ? 150 : 50,
                              width: '100%',
                            }}
                            itemStyle={{
                              height: Platform.OS === 'ios' ? 150 : 50,
                            }}
                          >
                            <Picker.Item label="年" value="" />
                            {yearOptions.map((item) => (
                              <Picker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                              />
                            ))}
                          </Picker>
                        </View>
                      )}
                    />
                  </View>
                  {/* Month Picker */}
                  <View style={{ flex: 1 }}>
                    <Controller
                      control={control}
                      name="birthMonth"
                      render={({ field: { onChange, value } }) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                          }}
                        >
                          <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={{
                              height: Platform.OS === 'ios' ? 150 : 50,
                              width: '100%',
                            }}
                            itemStyle={{
                              height: Platform.OS === 'ios' ? 150 : 50,
                            }}
                          >
                            <Picker.Item label="月" value="" />
                            {monthOptions.map((item) => (
                              <Picker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                              />
                            ))}
                          </Picker>
                        </View>
                      )}
                    />
                  </View>
                </XStack>
              </YStack>

              {/* Occupation Dropdown */}
              <YStack>
                <Label>職業（任意）</Label>
                <Controller
                  control={control}
                  name="occupation"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                      }}
                    >
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={{
                          height: Platform.OS === 'ios' ? 150 : 50,
                          width: '100%',
                        }}
                        itemStyle={{ height: Platform.OS === 'ios' ? 150 : 50 }}
                      >
                        <Picker.Item label="選択してください" value="" />
                        {occupationOptions.map((item) => (
                          <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                />
              </YStack>

              {/* Terms Agreement Checkbox */}
              <YStack>
                <Controller
                  control={control}
                  name="agreeToTerms"
                  render={({ field: { onChange, value } }) => (
                    <XStack gap="$2" style={{ alignItems: 'center' }}>
                      <Checkbox
                        id="agreeToTerms"
                        checked={value}
                        onCheckedChange={onChange}
                        borderColor={errors.agreeToTerms ? '$red10' : undefined}
                      >
                        <Checkbox.Indicator>
                          <Check size={16} />
                        </Checkbox.Indicator>
                      </Checkbox>
                      <Label htmlFor="agreeToTerms" style={{ flex: 1 }}>
                        利用規約に同意する
                      </Label>
                    </XStack>
                  )}
                />
                {errors.agreeToTerms && (
                  <Text
                    style={{ color: '#FF3B30', fontSize: 12, marginTop: 4 }}
                  >
                    {errors.agreeToTerms.message}
                  </Text>
                )}
              </YStack>

              <Button theme="blue" onPress={handleSubmit(onSubmit)}>
                送信
              </Button>
            </YStack>
          </Card>

          {/* State Management Demo (Zustand) */}
          <Card padded elevate>
            <H2 size="$6" style={{ marginBottom: 4 }}>
              State Management
            </H2>
            <Paragraph
              style={{ color: '#666', marginBottom: 12, fontSize: 12 }}
            >
              Zustand カウンターサンプル
            </Paragraph>
            <YStack gap="$3" style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 48, fontWeight: 'bold' }}>{count}</Text>
              <XStack gap="$2">
                <Button theme="red" onPress={decrement}>
                  -1
                </Button>
                <Button onPress={resetCounter}>Reset</Button>
                <Button theme="blue" onPress={increment}>
                  +1
                </Button>
              </XStack>
            </YStack>
          </Card>

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
            <TextInput
              placeholder="テキストを入力..."
              value={text}
              onChangeText={setText}
              style={[styles.input, { marginBottom: 8 }]}
              placeholderTextColor="#999"
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
              <Switch
                size="$4"
                checked={switchOn}
                onCheckedChange={setSwitchOn}
              >
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

          <Paragraph
            style={{ textAlign: 'center', color: '#999', marginTop: 8 }}
          >
            Expo Template v1.0.0
          </Paragraph>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
});
