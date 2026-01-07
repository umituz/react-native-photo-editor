/**
 * useStatusBarSafeAreaPadding Hook
 * Calculate safe area padding for status bar components
 */

import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSafeAreaConfig } from '../components/SafeAreaProvider';
import { useStableOptions } from '../utils/optimization';
import { validateNumericInput } from '../utils/validation';

export interface StatusBarPaddingOptions {
  minPadding?: number;
}

export const useStatusBarSafeAreaPadding = (
  options: StatusBarPaddingOptions = {},
): number => {
  const insets = useSafeAreaInsets();
  const config = useSafeAreaConfig();
  const stableOptions = useStableOptions(options);
  const minPadding = stableOptions.minPadding ?? config.minStatusBarPadding;

  // Validate input once
  useMemo(() => {
    validateNumericInput(minPadding, 'useStatusBarSafeAreaPadding.minPadding');
  }, [minPadding]);

  return useMemo(() => {
    if (Platform.OS === 'ios' && config.iosStatusBarUsesSafeArea) {
      return minPadding;
    }
    return Math.max(insets.top, minPadding);
  }, [insets.top, minPadding, config.iosStatusBarUsesSafeArea]);
};
