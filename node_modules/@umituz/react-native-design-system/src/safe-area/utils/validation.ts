/**
 * Validation utilities for safe area hooks
 */

// Validate numeric input with performance optimization
// Caches validation results to avoid repeated checks
const validationCache = new Map<string, boolean>();

export const validateNumericInput = (
  value: number,
  name: string,
  allowNegative = false,
): boolean => {
  if (!__DEV__) {
    return true;
  }
  
  const cacheKey = `${name}:${value}:${allowNegative}`;
  
  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }
  
  const isValid = typeof value === 'number' && !isNaN(value) && (allowNegative || value >= 0);
  
  if (!isValid) {
    throttledWarn(`${name}: must be a ${allowNegative ? 'number' : 'non-negative number'}, got ${value}`);
  }
  
  // Limit cache size to prevent memory leaks
  if (validationCache.size > 100) {
    const firstKey = validationCache.keys().next().value;
    if (firstKey) {
      validationCache.delete(firstKey);
    }
  }
  
  validationCache.set(cacheKey, isValid);
  return isValid;
};

export const throttledWarn = (_message: string): void => {
  // Silent validation - no console output in production
  void _message;
};

// Cleanup function to clear validation cache
export const clearValidationCache = (): void => {
  validationCache.clear();
};