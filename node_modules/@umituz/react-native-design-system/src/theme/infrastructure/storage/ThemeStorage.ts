/**
 * Theme Storage
 * Persists theme preference using AsyncStorage
 *
 * CRITICAL: This is a standalone storage utility for theme package.
 * Apps should use this for theme persistence.
 */

import { storageRepository, unwrap } from '@umituz/react-native-storage';
import type { ThemeMode } from '../../core/ColorPalette';
import { DESIGN_CONSTANTS } from '../../core/constants/DesignConstants';

const STORAGE_KEY = `${DESIGN_CONSTANTS.STORAGE_NAMESPACE}/mode`;

export class ThemeStorage {
  /**
   * Get stored theme mode
   */
  static async getThemeMode(): Promise<ThemeMode | null> {
    try {
      const result = await storageRepository.getString(STORAGE_KEY, '');
      const value = unwrap(result, '');
      
      if (!value) {
        return null;
      }

      // Validate theme mode value
      if (value === 'light' || value === 'dark') {
        return value as ThemeMode;
      }

      return null;
    } catch {
      // Return null instead of throwing to prevent app crashes
      return null;
    }
  }

  /**
   * Save theme mode
   */
  static async setThemeMode(mode: ThemeMode): Promise<void> {
    try {
      // Validate input
      if (!mode || (mode !== 'light' && mode !== 'dark')) {
        throw new Error(`Invalid theme mode: ${mode}`);
      }

      await storageRepository.setString(STORAGE_KEY, mode);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      // Re-throw validation errors but swallow storage errors to prevent app crashes
      if (errorMessage.includes('Invalid theme mode')) {
        throw error;
      }
    }
  }

  /**
   * Clear stored theme mode
   */
  static async clearThemeMode(): Promise<void> {
    try {
      await storageRepository.removeItem(STORAGE_KEY);
    } catch {
      // Don't throw - clearing storage is not critical
    }
  }
}











