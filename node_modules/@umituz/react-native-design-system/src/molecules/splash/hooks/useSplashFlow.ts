/**
 * Splash Flow Hook
 * Manages splash screen initialization state
 */

import { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

export interface UseSplashFlowOptions {
  duration?: number;
}

export interface UseSplashFlowResult {
  isInitialized: boolean;
}

export const useSplashFlow = (options: UseSplashFlowOptions = {}): UseSplashFlowResult => {
  const { duration = 1500 } = options;
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
      DeviceEventEmitter.emit('splash-ready');
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return { isInitialized };
};
