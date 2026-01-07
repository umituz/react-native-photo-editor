import React, { useEffect, useState, ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from '../../../safe-area';
import { useThemeStore } from '../stores/themeStore';
import { useDesignSystemTheme } from '../globalThemeStore';
import type { CustomThemeColors } from '../../core/CustomColors';
import { SplashScreen } from '../../../molecules/splash';
import type { SplashScreenProps } from '../../../molecules/splash/types';
import { SafeBottomSheetModalProvider } from '../../../molecules/bottom-sheet';

declare const __DEV__: boolean;

interface DesignSystemProviderProps {
  /** App content */
  children: ReactNode;
  /** Custom theme colors to override defaults */
  customColors?: CustomThemeColors;
  /** Show loading indicator while initializing (default: true) */
  showLoadingIndicator?: boolean;
  /** Splash screen configuration (used when showLoadingIndicator is true) */
  splashConfig?: Pick<SplashScreenProps, 'appName' | 'tagline' | 'icon' | 'colors' | 'gradientColors'>;
  /** Custom loading component (overrides splash screen) */
  loadingComponent?: ReactNode;
  /** Callback when initialization completes */
  onInitialized?: () => void;
  /** Callback when initialization fails */
  onError?: (error: unknown) => void;
}

/**
 * DesignSystemProvider
 * 
 * Initializes theme store and applies custom colors.
 * Wrap your app with this provider to enable design system features.
 * 
 * Features:
 * - Auto-initializes theme from storage
 * - Supports custom color overrides
 * - Optional loading state
 * - Error handling
 * - GestureHandlerRootView integration
 * - BottomSheetModalProvider integration
 * 
 * Usage:
 * ```tsx
 * import { DesignSystemProvider } from '@umituz/react-native-design-system';
 * 
 * export default function App() {
 *   return (
 *     <DesignSystemProvider
 *       customColors={{ primary: '#FF6B6B' }}
 *       showLoadingIndicator
 *     >
 *       <YourApp />
 *     </DesignSystemProvider>
 *   );
 * }
 * ```
 */
export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  customColors,
  showLoadingIndicator = true,
  splashConfig,
  loadingComponent,
  onInitialized,
  onError,
}: DesignSystemProviderProps) => {
  // ALL HOOKS MUST BE AT THE TOP (Rules of Hooks)
  const [isInitialized, setIsInitialized] = useState(false);
  const [minDisplayTimeMet, setMinDisplayTimeMet] = useState(false);
  const initialize = useThemeStore((state) => state.initialize);
  const setCustomColors = useDesignSystemTheme((state) => state.setCustomColors);

  useEffect(() => {
    if (__DEV__) console.log('[DesignSystemProvider] Initializing...');

    // Apply custom colors if provided
    if (customColors) {
      if (__DEV__) console.log('[DesignSystemProvider] Applying custom colors');
      setCustomColors(customColors);
    }

    // Start minimum display timer (1.5 seconds)
    const MIN_SPLASH_DISPLAY_TIME = 1500;
    const displayTimer = setTimeout(() => {
      if (__DEV__) console.log('[DesignSystemProvider] Minimum display time met (1.5s)');
      setMinDisplayTimeMet(true);
    }, MIN_SPLASH_DISPLAY_TIME);

    // Initialize theme store
    initialize()
      .then(() => {
        if (__DEV__) console.log('[DesignSystemProvider] Initialized successfully - setting isInitialized to true');
        setIsInitialized(true);
        if (__DEV__) console.log('[DesignSystemProvider] State updated - calling onInitialized callback');
        onInitialized?.();
      })
      .catch((error) => {
        if (__DEV__) console.error('[DesignSystemProvider] Initialization failed:', error);
        if (__DEV__) console.log('[DesignSystemProvider] Error occurred - setting isInitialized to true anyway');
        setIsInitialized(true); // Still render app even on error
        onError?.(error);
      });

    return () => clearTimeout(displayTimer);
  }, [initialize, customColors, setCustomColors, onInitialized, onError]);

  // ALL HOOKS ABOVE - NOW SAFE TO USE OTHER LOGIC

  if (__DEV__) {
    console.log('[DesignSystemProvider] Component render:', {
      isInitialized,
      minDisplayTimeMet,
      showLoadingIndicator,
      hasSplashConfig: !!splashConfig,
      splashConfigKeys: splashConfig ? Object.keys(splashConfig) : [],
    });
  }

  const renderContent = () => {
    const shouldShowSplash = showLoadingIndicator && (!isInitialized || !minDisplayTimeMet);

    if (__DEV__) {
      console.log('[DesignSystemProvider] renderContent:', {
        showLoadingIndicator,
        isInitialized,
        minDisplayTimeMet,
        shouldShowSplash,
        hasSplashConfig: !!splashConfig,
        hasLoadingComponent: !!loadingComponent,
      });
    }

    // Show loading indicator if requested and not yet ready (both conditions must be met)
    if (shouldShowSplash) {
      if (__DEV__) console.log('[DesignSystemProvider] Showing loading state');

      if (loadingComponent) {
        if (__DEV__) console.log('[DesignSystemProvider] Rendering custom loading component');
        return <>{loadingComponent}</>;
      }

      // Use SplashScreen if config provided, otherwise fallback to ActivityIndicator
      if (splashConfig) {
        if (__DEV__) console.log('[DesignSystemProvider] Rendering SplashScreen with config:', splashConfig);
        return <SplashScreen {...splashConfig} visible={shouldShowSplash} />;
      }

      if (__DEV__) console.log('[DesignSystemProvider] Rendering fallback ActivityIndicator');
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (__DEV__) console.log('[DesignSystemProvider] Rendering children (app initialized)');
    return <>{children}</>;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <SafeBottomSheetModalProvider>
          {renderContent()}
        </SafeBottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
