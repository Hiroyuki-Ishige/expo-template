import '@tamagui/core/reset.css';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PortalProvider, TamaguiProvider } from 'tamagui';

import { tamaguiConfig } from '../tamagui.config';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={colorScheme ?? 'light'}
    >
      <PortalProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack />
        </ThemeProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
