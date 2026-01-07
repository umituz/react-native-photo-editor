/**
 * Border Radius Tokens
 * Single Responsibility: Define border radius scale
 */

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

export type BorderRadius = typeof borderRadius;
