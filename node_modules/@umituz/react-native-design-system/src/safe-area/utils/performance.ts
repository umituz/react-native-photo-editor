/**
 * Performance utilities for safe area hooks
 * @deprecated This file is deprecated. Use individual utility modules instead.
 * - useStableOptions and clearPerformanceCaches are now in './optimization'
 * - validateNumericInput and throttledWarn are now in './validation'
 */

// Re-export for backward compatibility
export { useStableOptions, clearPerformanceCaches } from './optimization';
export { validateNumericInput, throttledWarn, clearValidationCache } from './validation';