import { BASE_TOKENS } from './BaseTokens';
import { getColorPalette, withAlpha, type ThemeMode, type ColorPalette } from './ColorPalette';
import { applyCustomColors, type CustomThemeColors } from './CustomColors';
import { type DesignTokens, type ResponsiveTypography } from '../types/ThemeTypes';

/**
 * Create complete design tokens for a specific theme mode
 * 
 * ✅ Responsive by default
 * ✅ SINGLE SOURCE OF TRUTH
 *
 * @param mode - Theme mode ('light' or 'dark')
 * @param customColors - Optional custom colors to override default colors
 * @param multiplier - Device-based spacing multiplier
 * @param getFontSize - Function to get responsive font size
 * @returns Complete responsive design tokens object
 */
export const createDesignTokens = (
  mode: ThemeMode,
  customColors?: CustomThemeColors,
  multiplier: number = 1,
  getFontSize: (size: number) => number = (s) => s,
): DesignTokens => {
  const baseColors = getColorPalette(mode);
  const colors = applyCustomColors(baseColors, customColors);

  // Responsive Spacing
  const spacing = Object.keys(BASE_TOKENS.spacing).reduce((acc, key) => {
    const value = BASE_TOKENS.spacing[key as keyof typeof BASE_TOKENS.spacing];
    acc[key as keyof typeof BASE_TOKENS.spacing] = typeof value === 'number' ? value * multiplier : value;
    return acc;
  }, {} as any);

  // Responsive Typography
  const typography = Object.keys(BASE_TOKENS.typography).reduce((acc, key) => {
    const style = BASE_TOKENS.typography[key as keyof typeof BASE_TOKENS.typography];
    if (typeof style === 'object' && style.fontSize) {
      acc[key as keyof typeof BASE_TOKENS.typography] = {
        ...(style as any),
        responsiveFontSize: getFontSize(style.fontSize as number),
      };
    } else {
      acc[key as keyof typeof BASE_TOKENS.typography] = style as any;
    }
    return acc;
  }, {} as any) as ResponsiveTypography;

  // Responsive Borders
  const borderRadius = Object.keys(BASE_TOKENS.borders.radius).reduce((acc, key) => {
    const value = BASE_TOKENS.borders.radius[key as keyof typeof BASE_TOKENS.borders.radius];
    acc[key as keyof typeof BASE_TOKENS.borders.radius] = value === 0 || key === 'full' ? value : Math.round(value * multiplier);
    return acc;
  }, {} as any);

  return {
    colors,
    spacing,
    typography,
    iconSizes: Object.keys(BASE_TOKENS.iconSizes).reduce((acc, key) => {
      acc[key as keyof typeof BASE_TOKENS.iconSizes] = BASE_TOKENS.iconSizes[key as keyof typeof BASE_TOKENS.iconSizes] * multiplier;
      return acc;
    }, {} as any),
    opacity: BASE_TOKENS.opacity,
    avatarSizes: Object.keys(BASE_TOKENS.avatarSizes).reduce((acc, key) => {
      acc[key as keyof typeof BASE_TOKENS.avatarSizes] = BASE_TOKENS.avatarSizes[key as keyof typeof BASE_TOKENS.avatarSizes] * multiplier;
      return acc;
    }, {} as any),
    radius: borderRadius,
    borderRadius: borderRadius,
    borders: {
      ...BASE_TOKENS.borders,
      radius: borderRadius,
      card: {
        ...BASE_TOKENS.borders.card,
        borderColor: colors.border,
      },
      input: {
        ...BASE_TOKENS.borders.input,
        borderColor: colors.border,
      },
    },
    spacingMultiplier: multiplier,
    baseSpacing: BASE_TOKENS.spacing,
    baseTypography: BASE_TOKENS.typography,
    baseBorderRadius: BASE_TOKENS.borders.radius,
  };
};

export { withAlpha };
export type { ThemeMode, ColorPalette };

