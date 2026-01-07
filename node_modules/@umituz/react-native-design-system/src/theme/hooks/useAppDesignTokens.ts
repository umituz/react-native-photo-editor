import { useMemo } from 'react';
import { useDesignSystemTheme } from '../infrastructure/globalThemeStore';
import { createDesignTokens } from '../core/TokenFactory';
import { useResponsive } from '../../responsive/useResponsive';
import { type DesignTokens } from '../types/ThemeTypes';

/**
 * Hook to access current design tokens (colors, spacing, typography, etc.)
 * 
 * ✅ Responsive by default - Scales based on device type
 * ✅ Theme-aware - Automatically updates on light/dark mode changes
 * ✅ Dynamic - Supports custom color overrides
 * 
 * @returns {DesignTokens} The current responsive design tokens
 * 
 * @example
 * ```tsx
 * const tokens = useAppDesignTokens();
 * return (
 *   <View style={{ 
 *     padding: tokens.spacing.md, 
 *     backgroundColor: tokens.colors.backgroundPrimary 
 *   }} />
 * );
 * ```
 */
export const useAppDesignTokens = (): DesignTokens => {
    const { themeMode, customColors } = useDesignSystemTheme();
    const { spacingMultiplier, getFontSize } = useResponsive();

    return useMemo(
        () => createDesignTokens(themeMode, customColors, spacingMultiplier, getFontSize),
        [themeMode, customColors, spacingMultiplier, getFontSize]
    );
};
