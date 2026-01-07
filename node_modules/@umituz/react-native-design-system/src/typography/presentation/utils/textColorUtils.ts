/**
 * Text Color Utilities
 * 
 * Helper functions for resolving text colors from design tokens.
 * These utilities are used by components like AtomicText to map color variants
 * to actual color values from theme.
 * 
 * @fileoverview Provides color resolution utilities for Material Design 3
 * @author Ümit UZ <umit@umituz.com>
 * @since 1.0.0
 * @version 1.2.0
 * 
 * @example
 * ```typescript
 * import { getTextColor } from '@umituz/react-native-design-system-typography';
 * import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
 * 
 * const MyComponent = () => {
 *   const tokens = useAppDesignTokens();
 *   const textColor = getTextColor('textPrimary', tokens);
 *   return <Text style={{ color: textColor }}>Hello</Text>;
 * };
 * ```
 */

import type { ColorVariant } from '../../domain/entities/TypographyTypes';
import type { DesignTokens } from '../../../theme';

// Cache for color variant validation to improve performance
const COLOR_VARIANT_SET = new Set<string>([
  'textPrimary',
  'textSecondary',
  'textTertiary',
  'textDisabled',
  'textInverse',
  'onSurface',
  'onBackground',
  'onPrimary',
  'onSecondary',
  'onSuccess',
  'onError',
  'onWarning',
  'onInfo',
  'success',
  'error',
  'warning',
  'info',
  'primary',
  'secondary',
  'tertiary',
  'disabled',
  'inverse',
  'surfaceVariant',
]);

/**
 * Color mapper interface for dependency injection
 */
interface ColorMapper {
  getColor(color: ColorVariant, tokens: DesignTokens): string;
}

/**
 * Material Design 3 color mapper implementation
 */
class MaterialColorMapper implements ColorMapper {
  getColor(color: ColorVariant, tokens: DesignTokens): string {
    switch (color) {
      // General text colors (Material Design 3)
      case 'textPrimary':
        return tokens.colors.textPrimary;
      case 'textSecondary':
        return tokens.colors.textSecondary;
      case 'textTertiary':
        return tokens.colors.textTertiary;
      case 'textDisabled':
        return tokens.colors.textDisabled;
      case 'textInverse':
        return tokens.colors.textInverse;

      // Text on surfaces (Material Design 3)
      case 'onSurface':
        return tokens.colors.onSurface;
      case 'onBackground':
        return tokens.colors.onBackground;

      // Text on colored backgrounds (Material Design 3)
      case 'onPrimary':
        return tokens.colors.onPrimary;
      case 'onSecondary':
        return tokens.colors.onSecondary;
      case 'onSuccess':
        return tokens.colors.onSuccess;
      case 'onError':
        return tokens.colors.onError;
      case 'onWarning':
        return tokens.colors.onWarning;
      case 'onInfo':
        return tokens.colors.onInfo;

      // Semantic colors (can be used as text)
      case 'success':
        return tokens.colors.success;
      case 'error':
        return tokens.colors.error;
      case 'warning':
        return tokens.colors.warning;
      case 'info':
        return tokens.colors.info;

      // Brand colors (can be used as text color)
      case 'primary':
        return tokens.colors.primary;
      case 'secondary':
        return tokens.colors.secondary;
      case 'tertiary':
        return tokens.colors.textTertiary;
      case 'disabled':
        return tokens.colors.textDisabled;
      case 'inverse':
        return tokens.colors.textInverse;
      case 'surfaceVariant':
        return tokens.colors.surfaceVariant;

      default:
        return tokens.colors.textPrimary;
    }
  }
}

// Singleton instance for performance
const colorMapper = new MaterialColorMapper();

// Cache for resolved colors to improve performance
const colorCache = new Map<string, string>();

/**
 * Clear the color cache
 * Useful for testing or theme changes
 */
export function clearColorCache(): void {
  colorCache.clear();
}

/**
 * Get text color from design tokens based on color variant
 * 
 * @param color - Color variant or custom color string
 * @param tokens - Design tokens containing color values
 * @returns Resolved color string
 * 
 * @example
 * ```tsx
 * const tokens = useAppDesignTokens();
 * const textColor = getTextColor('textPrimary', tokens);
 * ```
 */
export function getTextColor(
  color: ColorVariant | string | undefined,
  tokens: DesignTokens,
): string {
  // Validate tokens parameter
  if (!tokens || !tokens.colors) {
    throw new Error('Invalid design tokens: tokens and tokens.colors are required');
  }

  if (!color) {
    return tokens.colors.textPrimary;
  }

  // If it's a custom color string (not a variant), return as-is
  if (typeof color === 'string' && !isColorVariant(color)) {
    return color;
  }

  // Create cache key - use hash instead of JSON.stringify to prevent memory leaks
  const cacheKey = `${color}_${Object.keys(tokens.colors).length}_${tokens.colors.textPrimary}`;

  // Check cache first
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey)!;
  }

  // Resolve color and cache it
  const resolvedColor = colorMapper.getColor(color as ColorVariant, tokens);
  colorCache.set(cacheKey, resolvedColor);

  return resolvedColor;
}

/**
 * Check if a string is a valid ColorVariant
 * Uses Set for O(1) lookup performance
 * 
 * @param value - String to check
 * @returns True if value is a ColorVariant
 */
function isColorVariant(value: string): value is ColorVariant {
  return COLOR_VARIANT_SET.has(value);
}

