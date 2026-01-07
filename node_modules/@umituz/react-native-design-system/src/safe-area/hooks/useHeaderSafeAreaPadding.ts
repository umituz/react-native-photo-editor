/**
 * useHeaderSafeAreaPadding Hook
 * Calculate safe area padding for header components
 */

import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSafeAreaConfig } from '../components/SafeAreaProvider';
import { useStableOptions } from '../utils/optimization';
import { validateNumericInput } from '../utils/validation';

export interface HeaderPaddingOptions {
  minPadding?: number;
  additionalPadding?: number;
}

export const useHeaderSafeAreaPadding = (
  options: HeaderPaddingOptions = {},
): number => {
  const insets = useSafeAreaInsets();
  const config = useSafeAreaConfig();
  const stableOptions = useStableOptions(options);
  const minPadding = stableOptions.minPadding ?? config.minHeaderPadding;
  const additionalPadding = stableOptions.additionalPadding ?? config.additionalPadding;

  // Validate inputs once
  useMemo(() => {
    validateNumericInput(minPadding, 'useHeaderSafeAreaPadding.minPadding');
    validateNumericInput(additionalPadding, 'useHeaderSafeAreaPadding.additionalPadding');
  }, [minPadding, additionalPadding]);

  return useMemo(() => {
    return Math.max(insets.top, minPadding) + additionalPadding;
  }, [insets.top, minPadding, additionalPadding]);
};
