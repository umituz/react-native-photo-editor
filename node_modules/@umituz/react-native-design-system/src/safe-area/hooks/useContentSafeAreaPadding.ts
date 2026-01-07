/**
 * useContentSafeAreaPadding Hook
 * Calculate safe area padding for content components
 */

import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSafeAreaConfig } from '../components/SafeAreaProvider';
import { useStableOptions } from '../utils/optimization';
import { validateNumericInput } from '../utils/validation';

export interface ContentPaddingOptions {
  minBottomPadding?: number;
  additionalPadding?: number;
}

export interface ContentPaddingResult {
  paddingBottom: number;
}

export const useContentSafeAreaPadding = (
  options: ContentPaddingOptions = {},
): ContentPaddingResult => {
  const insets = useSafeAreaInsets();
  const config = useSafeAreaConfig();
  const stableOptions = useStableOptions(options);
  const minBottomPadding = stableOptions.minBottomPadding ?? config.minContentPadding;
  const additionalPadding = stableOptions.additionalPadding ?? config.additionalPadding;

  // Validate inputs once
  useMemo(() => {
    validateNumericInput(minBottomPadding, 'useContentSafeAreaPadding.minBottomPadding');
    validateNumericInput(additionalPadding, 'useContentSafeAreaPadding.additionalPadding');
  }, [minBottomPadding, additionalPadding]);

  const paddingBottom = useMemo(() => {
    return Math.max(insets.bottom, minBottomPadding) + additionalPadding;
  }, [insets.bottom, minBottomPadding, additionalPadding]);

  return useMemo(() => ({ paddingBottom }), [paddingBottom]);
};
