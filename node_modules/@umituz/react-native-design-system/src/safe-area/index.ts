/**
 * Safe Area Module
 * Configurable safe area provider and hooks for React Native apps
 */

export { SafeAreaProvider, useSafeAreaConfig } from './components/SafeAreaProvider';
export type { SafeAreaProviderProps, SafeAreaConfig } from './components/SafeAreaProvider';

export { useSafeAreaInsets } from './hooks/useSafeAreaInsets';
export { useStatusBarSafeAreaPadding } from './hooks/useStatusBarSafeAreaPadding';
export type { StatusBarPaddingOptions } from './hooks/useStatusBarSafeAreaPadding';

export { useHeaderSafeAreaPadding } from './hooks/useHeaderSafeAreaPadding';
export type { HeaderPaddingOptions } from './hooks/useHeaderSafeAreaPadding';

export { useContentSafeAreaPadding } from './hooks/useContentSafeAreaPadding';
export type { ContentPaddingOptions, ContentPaddingResult } from './hooks/useContentSafeAreaPadding';

export { SAFE_AREA_DEFAULTS, PLATFORM_BEHAVIORS, DEFAULT_CONFIG } from './constants';
export { useStableOptions, clearPerformanceCaches } from './utils/optimization';
export { validateNumericInput, throttledWarn, clearValidationCache } from './utils/validation';

// Re-export from react-native-safe-area-context for convenience
export { initialWindowMetrics, SafeAreaView } from 'react-native-safe-area-context';
export type { Edge } from 'react-native-safe-area-context';
