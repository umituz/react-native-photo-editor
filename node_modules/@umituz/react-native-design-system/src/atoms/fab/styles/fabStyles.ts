/**
 * FAB (Floating Action Button) Styles
 *
 * Material Design 3 compliant FAB sizing and styling
 * Used by AtomicFab component
 */

import type { ViewStyle } from 'react-native';
import type { FabSizeConfig, FabVariantConfig } from '../types';

/**
 * FAB size configurations based on Material Design 3
 * - sm: Small FAB (40x40)
 * - md: Regular FAB (56x56) - Default
 * - lg: Large FAB (72x72)
 */
export const FAB_SIZES: Record<'sm' | 'md' | 'lg', FabSizeConfig> = {
  sm: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  md: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  lg: {
    width: 72,
    height: 72,
    borderRadius: 20,
  },
} as const;

/**
 * Get FAB variant configurations based on design tokens
 * @param tokens - Design tokens from theme
 * @returns Variant configurations for primary, secondary, and surface
 */
export function getFabVariants(tokens: {
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
    onSecondary: string;
    surface: string;
    onSurface: string;
  };
}): Record<'primary' | 'secondary' | 'surface', FabVariantConfig> {
  return {
    primary: {
      backgroundColor: tokens.colors.primary,
      iconColor: tokens.colors.onPrimary,
    },
    secondary: {
      backgroundColor: tokens.colors.secondary,
      iconColor: tokens.colors.onSecondary,
    },
    surface: {
      backgroundColor: tokens.colors.surface,
      iconColor: tokens.colors.onSurface,
    },
  };
}

/**
 * Get icon size based on FAB size
 * @param size - FAB size variant
 * @returns Icon size in pixels
 */
export function getFabIconSize(size: 'sm' | 'md' | 'lg'): number {
  switch (size) {
    case 'sm':
      return 20;
    case 'md':
      return 24;
    case 'lg':
      return 28;
    default:
      return 24;
  }
}

/**
 * Get FAB border style for depth (no shadows per CLAUDE.md)
 * @param tokens - Design tokens from theme
 * @returns Border style object
 */
export function getFabBorder(tokens: {
  colors: {
    border: string;
  };
}): ViewStyle {
  return {
    borderWidth: 1,
    borderColor: tokens.colors.border,
  };
}
