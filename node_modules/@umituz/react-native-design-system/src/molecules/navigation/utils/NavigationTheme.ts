import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';

/**
 * Create a navigation theme based on design tokens and mode
 */
export const createNavigationTheme = (colors: any, mode: 'light' | 'dark'): Theme => {
    const baseTheme = mode === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

    return {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: colors.primary,
            background: colors.backgroundPrimary,
            card: colors.surface,
            text: colors.textPrimary,
            border: colors.border,
            notification: colors.error,
        },
    };
};
