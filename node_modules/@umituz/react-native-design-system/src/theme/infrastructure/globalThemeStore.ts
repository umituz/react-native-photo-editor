/**
 * Global Theme Store for Design System
 *
 * Minimal Zustand store for theme state management.
 * Apps can sync their theme state with this global store.
 *
 * WHY THIS EXISTS:
 * - ScreenLayout needs to know current theme mode
 * - Without prop drilling or Context API
 * - Single source of truth for design system components
 * - Apps control theme, design system reacts
 *
 * USAGE IN APP:
 * ```typescript
 * import { useDesignSystemTheme } from '@umituz/react-native-design-system-theme';
 * import { useTheme } from '@domains/theme';
 *
 * // Sync app theme with design system
 * const { themeMode } = useTheme();
 * const { setThemeMode } = useDesignSystemTheme();
 *
 * useEffect(() => {
 *   setThemeMode(themeMode);
 * }, [themeMode]);
 * ```
 */

import { createStore } from '@umituz/react-native-storage';
import type { ThemeMode } from '../core/ColorPalette';
import type { CustomThemeColors } from '../core/CustomColors';

interface GlobalThemeState {
  /** Current theme mode */
  themeMode: ThemeMode;
  /** Custom theme colors override */
  customColors?: CustomThemeColors;
}

interface GlobalThemeActions {
  /** Update theme mode (called by app when theme changes) */
  setThemeMode: (mode: ThemeMode) => void;
  /** Set custom theme colors (called by app when custom colors change) */
  setCustomColors: (colors?: CustomThemeColors) => void;
}

/**
 * Global theme store for design system components
 *
 * This is a MINIMAL store - app has the real theme logic.
 * Design system just mirrors the current theme for its components.
 */
export const useDesignSystemTheme = createStore<GlobalThemeState, GlobalThemeActions>({
  name: 'design-system-theme',
  initialState: {
    themeMode: 'dark',
    customColors: undefined,
  },
  persist: false,
  actions: (set, get) => ({
    setThemeMode: (mode: ThemeMode) => {
      // Only update if mode actually changed to prevent unnecessary re-renders
      const currentMode = get().themeMode;
      if (currentMode !== mode) {
        set({ themeMode: mode });
      }
    },
    setCustomColors: (colors?: CustomThemeColors) => {
      set({ customColors: colors });
    },
  }),
});

// Re-export ThemeMode for backward compatibility
export type { ThemeMode };

