import * as React from 'react';
import {
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
  I18nManager,
  PixelRatio,
  StyleSheet as RNStyleSheet,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { type EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DARK_COLORS, LIGHT_COLORS } from './colors';
import { getCurrentBreakpoint } from './utils/breakpoints';
import { createFontSize } from './utils/font-size';
import { getFontWeight } from './utils/font-weight';
import { createMediaMinWidth } from './utils/media-min-width';
import { rem } from './utils/rem';
import { createRounded } from './utils/rounded';
import { getShadow } from './utils/shadow';
import { createSpace } from './utils/space';
import { createTracking } from './utils/tracking';

export function useStyles<T extends StyleSheet>(createStyleSheet?: CreateStyleSheet<T>) {
  const { fontScale, height, width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();

  return React.useMemo(() => {
    const runtime = {
      themeName: colorScheme === 'dark' ? 'dark' : 'light',
      breakpoint: getCurrentBreakpoint(width),
      screen: { width, height },
      orientation: width > height ? 'landscape' : 'portrait',
      insets,
      statusBar: { height: StatusBar.currentHeight },
      pixelRatio: PixelRatio.get(),
      fontScale,
      hairlineWidth: RNStyleSheet.hairlineWidth,
      rtl: I18nManager.isRTL,
    } satisfies Runtime;

    const utils = {
      mediaMinWidth: createMediaMinWidth(runtime.breakpoint),
      fontSize: createFontSize(fontScale),
      space: createSpace(fontScale),
      rounded: createRounded(fontScale),
      tracking: createTracking(fontScale),
      fontWeight: getFontWeight,
      shadow: getShadow,
      rem,
    } satisfies Utils;

    const themes = {
      light: { colors: LIGHT_COLORS, utils },
      dark: { colors: DARK_COLORS, utils },
    } satisfies Themes;

    const styles = createStyleSheet ? createStyleSheet(themes[colorScheme], runtime) : ({} as T);

    return {
      styles,
      theme: themes[colorScheme],
      breakpoint: runtime.breakpoint,
    };
  }, [colorScheme, height, width, fontScale, insets]);
}

export function createStyleSheet<T extends StyleSheet>(stylesheet?: CreateStyleSheet<T>) {
  return stylesheet;
}

type StyleSheet = {
  [x: string]:
    | (ViewStyle | ((...args: any) => ViewStyle))
    | ((...args: any) => (...args: any) => ViewStyle)
    | (TextStyle | ((...args: any) => TextStyle))
    | ((...args: any) => (...args: any) => ViewStyle)
    | (ImageStyle | ((...args: any) => ImageStyle))
    | ((...args: any) => (...args: any) => ViewStyle);
};

type Utils = {
  mediaMinWidth: ReturnType<typeof createMediaMinWidth>;
  fontSize: ReturnType<typeof createFontSize>;
  space: ReturnType<typeof createSpace>;
  rounded: ReturnType<typeof createRounded>;
  tracking: ReturnType<typeof createTracking>;
  fontWeight: typeof getFontWeight;
  shadow: typeof getShadow;
  rem: typeof rem;
};

type Themes = {
  light: {
    colors: typeof LIGHT_COLORS;
    utils: Utils;
  };
  dark: {
    colors: typeof LIGHT_COLORS;
    utils: Utils;
  };
};

type ThemeName = keyof Themes;

type Runtime = {
  themeName: ThemeName;
  breakpoint: ReturnType<typeof getCurrentBreakpoint>;
  screen: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
  insets: EdgeInsets;
  statusBar: { height: typeof StatusBar.currentHeight };
  pixelRatio: ReturnType<typeof PixelRatio.get>;
  fontScale: ReturnType<typeof useWindowDimensions>['fontScale'];
  hairlineWidth: typeof RNStyleSheet.hairlineWidth;
  rtl: typeof I18nManager.isRTL;
};

type CreateStyleSheet<T extends StyleSheet> = (theme: Themes[ThemeName], runtime: Runtime) => T;