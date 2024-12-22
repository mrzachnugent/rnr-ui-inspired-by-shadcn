import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { ThemeToggle } from '~/components/ThemeToggle';
import { ITEMS } from '~/constants';
import { NAV_THEME } from '~/styles/nav-theme';
import { setAndroidNavigationBar } from '~/styles/set-android-navigation-bar';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const useAndroidNavigationBarTheme = Platform.select({
  android: useNavigationBarTheme,
  default: () => {},
});

const SCREEN_OPTIONS = {
  title: 'RNR StyleSheet',
  headerRight: () => <ThemeToggle />,
};

export default function RootLayout() {
  useAndroidNavigationBarTheme();
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name='index' options={SCREEN_OPTIONS} />
        {ITEMS.map((item) => {
          return (
            <Stack.Screen key={item} name={item} options={{ title: item.toLocaleUpperCase() }} />
          );
        })}
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

function useNavigationBarTheme() {
  const colorScheme = useColorScheme();
  React.useLayoutEffect(() => {
    const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';
    setAndroidNavigationBar(colorTheme);
  }, []);
}