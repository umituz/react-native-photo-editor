/**
 * Theme Store - Zustand State Management
 *
 * CRITICAL: NO Context Provider pattern - uses Zustand for global state
 *
 * Architecture:
 * - Zustand for state management (NOT Context API)
 * - AsyncStorage for persistence via ThemeStorage
 * - Automatic initialization on app launch
 * - Syncs with design system global theme store
 */

import { createStore } from '@umituz/react-native-storage';
import { lightTheme, darkTheme, type Theme } from '../../core/themes';
import { ThemeStorage } from '../storage/ThemeStorage';
import { useDesignSystemTheme } from '../globalThemeStore';
import type { ThemeMode } from '../../core/ColorPalette';

interface ThemeState {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  isInitialized: boolean;
}

interface ThemeActions {
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  initialize: () => Promise<void>;
}

/**
 * Theme Store - Global state management for theme
 *
 * Usage:
 * ```typescript
 * import { useTheme } from '@umituz/react-native-design-system';
 *
 * const MyComponent = () => {
 *   const { theme, themeMode, setThemeMode, toggleTheme } = useTheme();
 *   // ...
 * };
 * ```
 * 
 * NOTE: Make sure to wrap your app with DesignSystemProvider for auto-initialization
 */
export const useTheme = createStore<ThemeState, ThemeActions>({
  name: 'theme-store',
  initialState: {
    theme: darkTheme,
    themeMode: 'dark',
    isDark: true,
    isInitialized: false,
  },
  persist: false,
  actions: (set, get) => ({
    initialize: async () => {
      try {
        const savedMode = await ThemeStorage.getThemeMode();
        if (savedMode) {
          const theme = savedMode === 'light' ? lightTheme : darkTheme;
          set({
            themeMode: savedMode,
            theme,
            isDark: savedMode === 'dark',
            isInitialized: true,
          });

          // Sync with design system global theme
          useDesignSystemTheme.getState().setThemeMode(savedMode);
        } else {
          // No saved mode - use default 'dark' and sync to design system store
          set({ isInitialized: true });
          // Ensure design system store is synced even if no saved mode exists
          useDesignSystemTheme.getState().setThemeMode('dark');
        }
      } catch {
        // Silent failure - still mark as initialized to prevent blocking
        set({ isInitialized: true });
        // Ensure design system store is synced even on error
        useDesignSystemTheme.getState().setThemeMode('dark');
      }
    },

    setThemeMode: async (mode: ThemeMode) => {
      try {
        const theme = mode === 'light' ? lightTheme : darkTheme;

        set({
          themeMode: mode,
          theme,
          isDark: mode === 'dark',
        });

        await ThemeStorage.setThemeMode(mode);

        // Sync with design system global theme
        useDesignSystemTheme.getState().setThemeMode(mode);
      } catch {
        // Silent failure
      }
    },

    toggleTheme: async () => {
      const { themeMode, setThemeMode } = get();
      const newMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
      await setThemeMode(newMode);
    },
  }),
});

// Export internal store for DesignSystemProvider
export const useThemeStore = useTheme;



