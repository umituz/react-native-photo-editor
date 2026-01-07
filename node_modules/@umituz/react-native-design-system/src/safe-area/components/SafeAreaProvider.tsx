/**
 * SafeAreaProvider Component
 * Enhanced wrapper around react-native-safe-area-context with configurable defaults
 */

import React, { createContext, useContext } from 'react';
import {
  SafeAreaProvider as NativeSafeAreaProvider,
} from 'react-native-safe-area-context';
import type { SafeAreaProviderProps as NativeSafeAreaProviderProps } from 'react-native-safe-area-context';
import { DEFAULT_CONFIG } from '../constants';

export interface SafeAreaConfig {
  minHeaderPadding: number;
  minContentPadding: number;
  minStatusBarPadding: number;
  additionalPadding: number;
  iosStatusBarUsesSafeArea: boolean;
}

export interface SafeAreaProviderProps extends NativeSafeAreaProviderProps {
  children?: React.ReactNode;
  config?: SafeAreaConfig;
}

const SafeAreaConfigContext = createContext<SafeAreaConfig>(DEFAULT_CONFIG);

export const useSafeAreaConfig = (): SafeAreaConfig => {
  return useContext(SafeAreaConfigContext);
};

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({
  children,
  config,
  ...nativeProps
}) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  return (
    <SafeAreaConfigContext.Provider value={mergedConfig}>
      <NativeSafeAreaProvider {...nativeProps}>
        {children}
      </NativeSafeAreaProvider>
    </SafeAreaConfigContext.Provider>
  );
};
