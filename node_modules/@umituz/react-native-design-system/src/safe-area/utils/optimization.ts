/**
 * Performance optimization utilities for safe area hooks
 */

import { useMemo, useRef } from 'react';
import { clearValidationCache } from './validation';

/**
 * Memoize options object to prevent unnecessary re-renders
 * Uses deep comparison for better stability
 */
export const useStableOptions = <T extends Record<string, any>>(options: T): T => {
  const prevOptionsRef = useRef<T | undefined>(undefined);

  return useMemo(() => {
    if (!prevOptionsRef.current) {
      prevOptionsRef.current = options;
      return options;
    }

    // Check if keys match first
    const prevKeys = Object.keys(prevOptionsRef.current);
    const currentKeys = Object.keys(options);

    if (prevKeys.length !== currentKeys.length) {
      prevOptionsRef.current = options;
      return options;
    }

    // Check values
    const hasChanged = prevKeys.some(key => prevOptionsRef.current![key] !== options[key]);

    if (hasChanged) {
      prevOptionsRef.current = options;
    }

    return prevOptionsRef.current;
  }, [options]);
};

/**
 * Cleanup function to clear all performance caches
 * Call this in useEffect cleanup if needed
 */
export const clearPerformanceCaches = (): void => {
  clearValidationCache();
};